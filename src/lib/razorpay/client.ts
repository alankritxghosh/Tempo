import Razorpay from 'razorpay'

let razorpayInstance: Razorpay | null = null

export function isRazorpayConfigured(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  return !!(keyId && keySecret && keyId !== 'placeholder' && keySecret !== 'placeholder')
}

export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  }
  return razorpayInstance
}
