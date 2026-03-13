import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { deleteR2Object } from '@/lib/r2/client'

const DeleteSchema = z.object({
  video_id: z.string().uuid(),
})

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let body
  try {
    body = DeleteSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', body.video_id)
    .eq('user_id', user.id)
    .single()

  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  if (video.video_url) {
    try {
      await deleteR2Object(video.video_url)
    } catch {
      // R2 deletion is best-effort; proceed with DB deletion
    }
  }

  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', body.video_id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }

  return NextResponse.json({ status: 'deleted' })
}
