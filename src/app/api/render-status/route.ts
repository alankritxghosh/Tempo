import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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
      return NextResponse.json({
        status: 'pending',
        progress: 0,
      })
    }

    const response = await fetch(`${renderServerUrl}/status/${jobId}`, {
      headers: {
        'x-render-secret': process.env.REMOTION_RENDER_SERVER_SECRET || '',
      },
    })

    if (!response.ok) {
      const { data: dbVideo } = await supabase
        .from('videos')
        .select('status, video_url')
        .eq('id', videoId)
        .single()
      if (dbVideo?.status === 'complete') {
        return NextResponse.json({ status: 'complete', video_url: dbVideo.video_url, progress_percent: 100 })
      }
      if (dbVideo?.status === 'failed') {
        return NextResponse.json({ status: 'failed', progress_percent: 0 })
      }
      return NextResponse.json({ status: 'pending', progress: 0 })
    }

    const data = await response.json()

    if (data.status === 'complete' && data.video_url) {
      const { data: currentVideo } = await supabase
        .from('videos')
        .select('status')
        .eq('id', videoId)
        .single()

      if (currentVideo && (currentVideo as { status: string }).status !== 'complete') {
        await supabase
          .from('videos')
          .update({
            status: 'complete',
            video_url: data.video_url,
            thumbnail_url: data.thumbnail_url,
            render_time_seconds: data.render_time_seconds,
          } as never)
          .eq('id', videoId)
          .eq('status', 'rendering')

        await supabase.rpc('increment_videos_generated', { user_uuid: user.id })
      }
    }

    if (data.status === 'failed') {
      await supabase
        .from('videos')
        .update({ status: 'failed' } as never)
        .eq('id', videoId)
        .neq('status', 'complete')
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ status: 'pending', progress: 0 })
  }
}
