import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/service'
import { isRazorpayConfigured } from '@/lib/razorpay/client'

export async function POST(request: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json({ error: 'Billing not configured' }, { status: 503 })
  }

  const signature = request.headers.get('x-razorpay-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 401 })

  const body = await request.text()

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Billing not configured' }, { status: 503 })
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  const expectedBuf = Buffer.from(expected, 'hex')
  const signatureBuf = Buffer.from(signature, 'hex')

  if (expectedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(expectedBuf, signatureBuf)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: Record<string, unknown>
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const timestamp = event?.event_timestamp as number | undefined
  if (timestamp && Date.now() / 1000 - timestamp > 300) {
    return NextResponse.json({ error: 'Replay rejected' }, { status: 401 })
  }

  const supabase = createServiceClient()

  const eventId = event?.event_id as string | undefined
  if (eventId) {
    const { data: existing } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .single()

    if (existing) {
      return NextResponse.json({ status: 'already_processed' })
    }

    await supabase.from('webhook_events').insert({
      event_id: eventId,
      payload: event,
    } as never)
  }

  const eventType = event?.event as string | undefined
  const payload = event?.payload as Record<string, unknown> | undefined

  switch (eventType) {
    case 'payment.captured': {
      const payment = (payload?.payment as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
      const userId = (payment?.notes as Record<string, string>)?.user_id
      if (userId) {
        await supabase
          .from('profiles')
          .update({ tier: 'pro' } as never)
          .eq('id', userId)
      }
      break
    }
    case 'subscription.activated': {
      const subscription = (payload?.subscription as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
      const userId = (subscription?.notes as Record<string, string>)?.user_id
      const subscriptionId = subscription?.id as string | undefined
      if (userId) {
        await supabase
          .from('profiles')
          .update({
            tier: 'pro',
            subscription_id: subscriptionId,
            subscription_status: 'active',
          } as never)
          .eq('id', userId)
      }
      break
    }
    case 'subscription.cancelled':
    case 'subscription.halted': {
      const subscription = (payload?.subscription as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
      const subscriptionId = subscription?.id as string | undefined
      if (subscriptionId) {
        await supabase
          .from('profiles')
          .update({
            tier: 'free',
            subscription_status: eventType === 'subscription.cancelled' ? 'cancelled' : 'halted',
          } as never)
          .eq('subscription_id', subscriptionId)
      }
      break
    }
  }

  return NextResponse.json({ status: 'ok' })
}
