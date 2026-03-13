import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateSignedUrl } from '@/lib/r2/client'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const videoId = request.nextUrl.searchParams.get('video_id')
  if (!videoId || !UUID_REGEX.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video_id' }, { status: 400 })
  }

  const { data: video } = await supabase
    .from('videos')
    .select('video_url')
    .eq('id', videoId)
    .eq('user_id', user.id)
    .single()

  if (!video || !video.video_url) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()

  const tier = profile?.tier || 'free'
  const expirySeconds = tier === 'pro' ? 30 * 24 * 60 * 60 : 72 * 60 * 60

  try {
    const signedUrl = await generateSignedUrl(video.video_url, expirySeconds)
    return NextResponse.json({ signed_url: signedUrl })
  } catch {
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 })
  }
}
