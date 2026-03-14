'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { motion as m } from '@/tokens'

export function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center py-24"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: m.spring.gentle.stiffness,
        damping: m.spring.gentle.damping,
        mass: m.spring.gentle.mass,
      }}
    >
      <div className="grid grid-cols-3 gap-3 mb-8 opacity-30">
        <Skeleton width="80px" height="60px" />
        <Skeleton width="80px" height="60px" />
        <Skeleton width="80px" height="60px" />
      </div>
      <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-black mb-2">
        No videos yet
      </h3>
      <p className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary mb-6">
        Create your first video to see it here
      </p>
      <Link href="/upload">
        <Button>Create a video</Button>
      </Link>
    </motion.div>
  )
}
