'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AccentRule } from '@/components/ui/AccentRule'
import { useRazorpayCheckout } from '@/hooks/useRazorpayCheckout'

type UpgradeModalProps = {
  open: boolean
  onClose: () => void
  onUpgraded?: () => void
  onError?: (message: string) => void
}

const PRO_FEATURES = [
  '15 videos per month',
  '1080p full resolution',
  'No watermark',
  'Priority rendering queue',
  '30-day download links',
]

export function UpgradeModal({ open, onClose, onUpgraded, onError }: UpgradeModalProps) {
  const [comingSoon, setComingSoon] = useState(false)

  const { initiateCheckout, loading } = useRazorpayCheckout({
    onSuccess: () => {
      onUpgraded?.()
      onClose()
    },
    onError: (msg) => onError?.(msg),
    onNotConfigured: () => setComingSoon(true),
  })

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <div>
          <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-tempo-tertiary tracking-[0.08em] uppercase">
            Upgrade
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary tracking-[-0.02em] leading-[1.1] mt-2">
            Go Pro
          </h2>
          <AccentRule className="mt-3" />
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-display)] text-[48px] font-bold text-tempo-primary">
            ₹999
          </span>
          <span className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
            /month
          </span>
        </div>

        <ul className="flex flex-col gap-3">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-tempo-accent flex-shrink-0" />
              <span className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {comingSoon ? (
          <div className="flex flex-col gap-2 pt-2">
            <p className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
              Pro upgrades are coming soon. We&apos;ll notify you when billing is live.
            </p>
            <Button variant="outline" onClick={onClose}>
              Got it
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 pt-2">
            <Button
              onClick={initiateCheckout}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Processing...' : 'Upgrade now'}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Not now
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
