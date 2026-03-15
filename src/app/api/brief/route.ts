import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateBrief } from '@/lib/gemini/brief'
import { createRateLimit } from '@/lib/rate-limit'

const RequestSchema = z.object({
  hook_text: z.string().min(1),
  description: z.string().min(10).max(300),
  screenshot_urls: z.array(z.string().url()).min(2).max(4),
  style_mode: z.enum(['dark', 'light']),
})

const checkRateLimit = createRateLimit(5, 60 * 60 * 1000)

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  if (!checkRateLimit(user.id)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 5 brief generations per hour.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = RequestSchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    const brief = await generateBrief(body.hook_text, body.description, body.screenshot_urls, body.style_mode)
    return NextResponse.json({ brief })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Brief generation failed' },
      { status: 500 }
    )
  }
}
