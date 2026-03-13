'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

type ProgressBarProps = {
  progress: number
  segments?: number
}

export function ProgressBar({ progress, segments = 3 }: ProgressBarProps) {
  return (
    <div className="flex gap-2 w-full" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Render progress">
      {Array.from({ length: segments }).map((_, i) => {
        const segmentProgress = Math.min(1, Math.max(0, (progress - i / segments) * segments))
        return (
          <div key={i} className="flex-1 h-1 bg-tempo-panel rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-tempo-accent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: segmentProgress }}
              style={{ transformOrigin: 'left' }}
              transition={{
                type: 'spring',
                stiffness: m.spring.primary.stiffness,
                damping: m.spring.primary.damping,
                mass: m.spring.primary.mass,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
