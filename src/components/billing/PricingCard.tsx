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
    <div className="bg-tempo-card border border-tempo-border rounded-[var(--radius-card)] p-6 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-tempo-accent" />
      <div className="flex items-center gap-2 mb-3">
        <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-tempo-tertiary tracking-[0.08em] uppercase">
          Pro
        </span>
        <Badge className="bg-tempo-accent/10 text-tempo-accent">Most Popular</Badge>
      </div>
      <span className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary mb-1">
        ₹999
      </span>
      <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mb-6">
        /month
      </span>
      <ul className="flex flex-col gap-2 flex-1 mb-6">
        {PRO_FEATURES.map(f => (
          <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
            {f}
          </li>
        ))}
      </ul>
      {comingSoon ? (
        <span className="w-full text-center py-3 font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
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
