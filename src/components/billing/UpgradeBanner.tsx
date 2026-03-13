'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { motion as m } from '@/tokens'

type UpgradeBannerProps = {
  onUpgradeClick: () => void
}

export function UpgradeBanner({ onUpgradeClick }: UpgradeBannerProps) {
  return (
    <motion.div
      className="w-full bg-tempo-card border border-tempo-border rounded-[var(--radius-card)] p-6 flex flex-col gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: m.spring.primary.stiffness,
        damping: m.spring.primary.damping,
      }}
    >
      <p className="font-[family-name:var(--font-body)] text-[15px] text-tempo-primary">
        Remove watermark + render in 1080p
      </p>
      <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
        Upgrade to Pro for 15 videos/month at full resolution.
      </p>
      <Button variant="outline" className="self-start" onClick={onUpgradeClick}>
        Upgrade to Pro
      </Button>
    </motion.div>
  )
}
