import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { triggerRender } from '@/lib/remotion/client'
import { DirectorBriefSchema } from '@/types'

const RequestSchema = z.object({
  brief: DirectorBriefSchema,
  screenshot_urls: z.array(z.string().url()).min(2).max(4),
  style_mode: z.enum(['dark', 'light']),
})

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let body
  try {
    body = RequestSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, videos_generated_this_month')
    .eq('id', user.id)
    .single()

  const tier = profile?.tier || 'free'
  const limit = tier === 'pro' ? 15 : 1
  const used = profile?.videos_generated_this_month || 0

  if (used >= limit) {
    return NextResponse.json({ error: 'Monthly video limit reached' }, { status: 429 })
  }

  const { data: video, error: insertError } = await supabase
    .from('videos')
    .insert({
      user_id: user.id,
      hook_text: body.brief.scenes[0]?.elements[0]?.text || 'Untitled',
      style_mode: body.style_mode,
      status: 'pending',
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: 'Failed to create video record' }, { status: 500 })
  }

  try {
    const jobId = await triggerRender({
      videoId: video.id,
      brief: body.brief,
      screenshotUrls: body.screenshot_urls,
      styleMode: body.style_mode,
      tier,
    })

    await supabase
      .from('videos')
      .update({ status: 'rendering' } as never)
      .eq('id', video.id)

    return NextResponse.json({ job_id: jobId, video_id: video.id })
  } catch {
    await supabase
      .from('videos')
      .update({ status: 'failed' } as never)
      .eq('id', video.id)

    return NextResponse.json(
      { error: 'Render trigger failed' },
      { status: 500 }
    )
  }
}
