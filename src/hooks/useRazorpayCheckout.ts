'use client'

import { useState, useCallback } from 'react'

type CheckoutCallbacks = {
  onSuccess?: () => void
  onError?: (message: string) => void
  onNotConfigured?: () => void
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void
      on: (event: string, handler: () => void) => void
    }
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(script)
  })
}

export function useRazorpayCheckout({ onSuccess, onError, onNotConfigured }: CheckoutCallbacks = {}) {
  const [loading, setLoading] = useState(false)

  const initiateCheckout = useCallback(async () => {
    setLoading(true)
    try {
      const orderRes = await fetch('/api/checkout', { method: 'POST' })

      if (orderRes.status === 503) {
        onNotConfigured?.()
        setLoading(false)
        return
      }

      if (!orderRes.ok) {
        const err = await orderRes.json()
        throw new Error(err.error || 'Failed to create order')
      }

      await loadRazorpayScript()

      const { order_id, amount, currency, key_id } = await orderRes.json()

      const options = {
        key: key_id,
        amount,
        currency,
        order_id,
        name: 'Tempo',
        description: 'Pro Plan — 15 videos/month, 1080p, no watermark',
        theme: { color: '#0A84FF' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })
            if (verifyRes.ok) {
              onSuccess?.()
            } else {
              const err = await verifyRes.json()
              onError?.(err.error || 'Verification failed')
            }
          } catch {
            onError?.('Payment verification failed')
          } finally {
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        onError?.('Payment failed. Please try again.')
        setLoading(false)
      })
      rzp.open()
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Checkout failed')
      setLoading(false)
    }
  }, [onSuccess, onError, onNotConfigured])

  return { initiateCheckout, loading }
}
