import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'
import { updateVideo } from '@/lib/supabase/typed-update'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function getDbVideoStatus(supabase: SupabaseClient, videoId: string) {
  const { data } = await supabase
    .from('videos')
    .select('status, video_url')
    .eq('id', videoId)
    .single()
  return data as { status: string; video_url: string | null } | null
}

async function syncRenderCompletion(
  supabase: SupabaseClient,
  videoId: string,
  userId: string,
  data: { video_url: string; thumbnail_url?: string; render_time_seconds?: number }
) {
  const { data: currentVideo } = await supabase
    .from('videos')
    .select('status')
    .eq('id', videoId)
    .single()

  if (currentVideo && (currentVideo as { status: string }).status !== 'complete') {
    await updateVideo(supabase, videoId, {
      status: 'complete',
      video_url: data.video_url,
      thumbnail_url: data.thumbnail_url,
      render_time_seconds: data.render_time_seconds,
    })

    await supabase.rpc('increment_videos_generated', { user_uuid: userId })
  }
}

async function syncRenderFailure(supabase: SupabaseClient, videoId: string) {
  await updateVideo(supabase, videoId, { status: 'failed' })
}

function dbStatusResponse(dbVideo: { status: string; video_url: string | null } | null) {
  if (dbVideo?.status === 'complete' && dbVideo?.video_url) {
    return NextResponse.json({ status: 'complete', progress: 100, video_url: dbVideo.video_url })
  }
  if (dbVideo?.status === 'failed') {
    return NextResponse.json({ status: 'failed', progress: 0 })
  }
  return NextResponse.json({ status: 'pending', progress: 0 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const jobId = request.nextUrl.searchParams.get('job_id')
  const videoId = request.nextUrl.searchParams.get('video_id')

  if (!jobId || !UUID_REGEX.test(jobId)) {
    return NextResponse.json({ error: 'Invalid job_id' }, { status: 400 })
  }
  if (!videoId || !UUID_REGEX.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video_id' }, { status: 400 })
  }

  const { data: video } = await supabase
    .from('videos')
    .select('id')
    .eq('id', videoId)
    .eq('user_id', user.id)
    .single()

  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  try {
    const renderServerUrl = process.env.REMOTION_RENDER_SERVER_URL
    if (!renderServerUrl) {
      return dbStatusResponse(await getDbVideoStatus(supabase, videoId))
    }

    const response = await fetch(`${renderServerUrl}/status/${jobId}`, {
      headers: { 'x-render-secret': process.env.REMOTION_RENDER_SERVER_SECRET || '' },
    })

    if (!response.ok) {
      return dbStatusResponse(await getDbVideoStatus(supabase, videoId))
    }

    const data = await response.json()

    if (data.status === 'complete' && data.video_url) {
      await syncRenderCompletion(supabase, videoId, user.id, data)
    }

    if (data.status === 'failed') {
      await syncRenderFailure(supabase, videoId)
    }

    return NextResponse.json({
      ...data,
      progress: data.progress_percent ?? data.progress ?? 0,
    })
  } catch (err) {
    console.error('[render-status] Unexpected error:', err)
    return NextResponse.json({ status: 'pending', progress: 0 })
  }
}
