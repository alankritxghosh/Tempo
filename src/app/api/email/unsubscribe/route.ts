import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { updateProfile } from '@/lib/supabase/typed-update'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return new NextResponse('Missing token', { status: 400 })
  }

  let userId: string
  let email: string
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split(':')
    if (parts.length < 2) throw new Error('Invalid token format')
    userId = parts[0]
    email = parts.slice(1).join(':')
  } catch {
    return new NextResponse('Invalid token', { status: 400 })
  }

  const supabase = createServiceClient()

  const { data } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('id', userId)
    .single()

  const profile = data as { id: string; email: string } | null

  if (!profile || profile.email !== email) {
    return new NextResponse('Invalid unsubscribe link', { status: 400 })
  }

  await updateProfile(supabase, userId, { hook_email_opted_in: false })

  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><title>Unsubscribed</title></head>
<body style="margin:0;padding:48px;background:#0A0A0A;font-family:Inter,Helvetica,Arial,sans-serif;color:#FFFFFF;text-align:center;">
  <h1 style="font-size:24px;font-weight:700;">Unsubscribed</h1>
  <p style="font-size:15px;color:#8E8E93;">You won't receive weekly hook emails from Tempo anymore.</p>
</body>
</html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }
  )
}
