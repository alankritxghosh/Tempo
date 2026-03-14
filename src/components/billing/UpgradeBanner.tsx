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
      className="w-full bg-tempo-yellow border-3 border-black p-6 flex flex-col gap-3 shadow-[5px_5px_0_0_#000]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: m.spring.primary.stiffness,
        damping: m.spring.primary.damping,
      }}
    >
      <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black">
        Remove watermark + render in 1080p
      </p>
      <p className="font-[family-name:var(--font-body)] text-[14px] text-black">
        Upgrade to Pro for 15 videos/month at full resolution.
      </p>
      <Button variant="outline" className="self-start" onClick={onUpgradeClick}>
        Upgrade to Pro
      </Button>
    </motion.div>
  )
}
