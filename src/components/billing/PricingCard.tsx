'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useRazorpayCheckout } from '@/hooks/useRazorpayCheckout'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'

type PricingCardProps = {
  onSuccess?: () => void
  onError?: (msg: string) => void
}

const PRO_FEATURES = ['15 videos/month', '1080p resolution', 'No watermark', 'Priority rendering']

export function ProPricingCard({ onSuccess, onError }: PricingCardProps) {
  const { user } = useSession()
  const router = useRouter()
  const [comingSoon, setComingSoon] = useState(false)

  const { initiateCheckout, loading } = useRazorpayCheckout({
    onSuccess,
    onError,
    onNotConfigured: () => setComingSoon(true),
  })

  const handleClick = () => {
    if (!user) {
      router.push('/auth')
      return
    }
    initiateCheckout()
  }

  return (
    <div className="bg-tempo-pink border-3 border-black p-6 flex flex-col relative overflow-hidden shadow-[5px_5px_0_0_#000]">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-black tracking-[0.08em] uppercase">
          Pro
        </span>
        <Badge>Most Popular</Badge>
      </div>
      <span className="font-[family-name:var(--font-display)] text-[32px] font-extrabold text-black mb-1">
        ₹999
      </span>
      <span className="font-[family-name:var(--font-body)] text-[14px] text-black mb-6">
        /month
      </span>
      <ul className="flex flex-col gap-2 flex-1 mb-6">
        {PRO_FEATURES.map(f => (
          <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-black">
            {f}
          </li>
        ))}
      </ul>
      {comingSoon ? (
        <span className="w-full text-center py-3 font-[family-name:var(--font-body)] text-[14px] text-black">
          Pro upgrades coming soon
        </span>
      ) : (
        <Button onClick={handleClick} disabled={loading} className="w-full">
          {loading ? 'Processing...' : 'Upgrade to Pro'}
        </Button>
      )}
    </div>
  )
}
