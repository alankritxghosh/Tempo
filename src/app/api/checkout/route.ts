import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { getRazorpay, isRazorpayConfigured } from '@/lib/razorpay/client'

const PLAN_AMOUNT = 99900 // ₹999 in paise

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: 'billing_not_configured', message: 'Billing is not set up yet. Pro upgrades coming soon.' },
      { status: 503 }
    )
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, subscription_id, subscription_status')
    .eq('id', user.id)
    .single()

  if (profile?.tier === 'pro' && profile?.subscription_status === 'active') {
    return NextResponse.json({ error: 'Already on Pro plan' }, { status: 400 })
  }

  const razorpay = getRazorpay()

  try {
    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNT,
      currency: 'INR',
      receipt: `tempo_${user.id}_${Date.now()}`,
      notes: {
        user_id: user.id,
        email: user.email || '',
        plan: 'pro',
      },
    })

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create order' },
      { status: 500 }
    )
  }
}
