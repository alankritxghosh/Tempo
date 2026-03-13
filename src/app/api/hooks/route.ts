import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateHooks } from '@/lib/gemini/hooks'

const RequestSchema = z.object({
  description: z.string().min(10).max(300),
  screenshot_urls: z.array(z.string().url()).min(2).max(4),
})

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

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
