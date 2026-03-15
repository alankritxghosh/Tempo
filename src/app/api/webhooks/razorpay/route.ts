import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServiceClient } from '@/lib/supabase/service'
import { isRazorpayConfigured } from '@/lib/razorpay/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import { updateProfile, updateProfileBySubscription } from '@/lib/supabase/typed-update'

const REPLAY_WINDOW_SECONDS = 300

async function handlePaymentCaptured(supabase: SupabaseClient, payload: Record<string, unknown>) {
  const payment = (payload?.payment as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
  const userId = (payment?.notes as Record<string, string>)?.user_id
  if (userId) {
    await updateProfile(supabase, userId, { tier: 'pro' })
  }
}

async function handleSubscriptionActivated(supabase: SupabaseClient, payload: Record<string, unknown>) {
  const subscription = (payload?.subscription as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
  const userId = (subscription?.notes as Record<string, string>)?.user_id
  const subscriptionId = subscription?.id as string | undefined
  if (userId) {
    await updateProfile(supabase, userId, {
      tier: 'pro',
      subscription_id: subscriptionId,
      subscription_status: 'active',
    })
  }
}

async function handleSubscriptionEnded(supabase: SupabaseClient, payload: Record<string, unknown>, eventType: string) {
  const subscription = (payload?.subscription as Record<string, unknown>)?.entity as Record<string, unknown> | undefined
  const subscriptionId = subscription?.id as string | undefined
  if (subscriptionId) {
    await updateProfileBySubscription(supabase, subscriptionId, {
      tier: 'free',
      subscription_status: eventType === 'subscription.cancelled' ? 'cancelled' : 'halted',
    })
  }
}

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
  if (timestamp && Date.now() / 1000 - timestamp > REPLAY_WINDOW_SECONDS) {
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

  if (payload) {
    switch (eventType) {
      case 'payment.captured':
        await handlePaymentCaptured(supabase, payload)
        break
      case 'subscription.activated':
        await handleSubscriptionActivated(supabase, payload)
        break
      case 'subscription.cancelled':
      case 'subscription.halted':
        await handleSubscriptionEnded(supabase, payload, eventType)
        break
    }
  }

  return NextResponse.json({ status: 'ok' })
}
