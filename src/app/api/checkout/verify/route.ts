import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { isRazorpayConfigured } from '@/lib/razorpay/client'
import { updateProfile } from '@/lib/supabase/typed-update'

const VerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})

export async function POST(request: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json({ error: 'Billing not configured' }, { status: 503 })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Billing not configured' }, { status: 503 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let body
  try {
    body = VerifySchema.parse(await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const generated = crypto
    .createHmac('sha256', secret)
    .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
    .digest('hex')

  const generatedBuf = Buffer.from(generated, 'hex')
  const signatureBuf = Buffer.from(body.razorpay_signature, 'hex')

  if (generatedBuf.length !== signatureBuf.length || !crypto.timingSafeEqual(generatedBuf, signatureBuf)) {
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
  }

  await updateProfile(supabase, user.id, { tier: 'pro', subscription_status: 'active' })

  return NextResponse.json({ status: 'verified', tier: 'pro' })
}
