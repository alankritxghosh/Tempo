import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateHooks } from '@/lib/gemini/hooks'
import { createRateLimit } from '@/lib/rate-limit'

const RequestSchema = z.object({
  description: z.string().min(10).max(300),
  screenshot_urls: z.array(z.string().url()).min(2).max(4),
})

const checkRateLimit = createRateLimit(10, 60 * 60 * 1000)

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  if (!checkRateLimit(user.id)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 10 hook generations per hour.' },
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
    const hooks = await generateHooks(body.description, body.screenshot_urls)
    return NextResponse.json({ hooks })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Hook generation failed' },
      { status: 500 }
    )
  }
}
