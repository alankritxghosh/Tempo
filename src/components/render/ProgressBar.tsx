'use client'

import { motion } from 'framer-motion'

type ProgressBarProps = {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black">
          Rendering video
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-secondary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-[8px] bg-white border-3 border-black">
        <motion.div
          className="h-full bg-tempo-pink"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
