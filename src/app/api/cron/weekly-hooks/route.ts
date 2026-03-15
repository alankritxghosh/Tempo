import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getResendClient } from '@/lib/resend/client'
import { weeklyHooksEmail } from '@/lib/resend/templates'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { HooksResponseSchema } from '@/types'
import { retryGeminiGeneration } from '@/lib/gemini/retry'

const CRON_SECRET = process.env.CRON_SECRET

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const WEEKLY_HOOK_PROMPT = `You are a viral video copywriter. Generate exactly 3 short, punchy video hooks (opening lines) for a weekly email digest.

Rules:
- Each hook MUST be 3-7 words.
- Use different frameworks: curiosity gap, bold claim, problem-agitate.
- trend_confidence range: 0.6-0.95.
- These hooks should be broadly applicable to SaaS/tech products.

Return ONLY valid JSON:
{
  "hooks": [
    { "text": "3-7 word hook", "framework": "curiosity gap", "trend_confidence": 0.85 },
    { "text": "3-7 word hook", "framework": "bold claim", "trend_confidence": 0.78 },
    { "text": "3-7 word hook", "framework": "problem-agitate", "trend_confidence": 0.90 }
  ]
}`

async function generateWeeklyHooks() {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.9,
    },
  })

  const result = await retryGeminiGeneration(model, WEEKLY_HOOK_PROMPT, HooksResponseSchema)
  return [...result.hooks.slice(0, 3)]
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const resend = getResendClient()

  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('hook_email_opted_in', true)

  const subscribers = data as { id: string; email: string }[] | null

  if (fetchError || !subscribers?.length) {
    return NextResponse.json({
      sent: 0,
      error: fetchError?.message || 'No subscribers',
    })
  }

  let hooks
  try {
    hooks = await generateWeeklyHooks()
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Hook generation failed' }, { status: 500 })
  }

  const template = weeklyHooksEmail(hooks)

  let sent = 0
  const errors: string[] = []

  for (const subscriber of subscribers) {
    const unsubToken = Buffer.from(`${subscriber.id}:${subscriber.email}`).toString('base64url')
    const personalizedHtml = template.html.replace('__UNSUB_TOKEN__', unsubToken)

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Tempo <hooks@tempo.app>',
        to: subscriber.email,
        subject: template.subject,
        html: personalizedHtml,
      })
      sent++
    } catch (err) {
      errors.push(`${subscriber.email}: ${err instanceof Error ? err.message : 'unknown'}`)
    }
  }

  return NextResponse.json({ sent, total: subscribers.length, errors: errors.length > 0 ? errors : undefined })
}
