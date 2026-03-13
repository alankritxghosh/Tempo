'use client'

import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import Image from 'next/image'

type ScreenshotGridProps = {
  files: File[]
  onRemove: (index: number) => void
}

export function ScreenshotGrid({ files, onRemove }: ScreenshotGridProps) {
  const objectUrls = useMemo(() => files.map(f => URL.createObjectURL(f)), [files])

  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [objectUrls])

  if (files.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <motion.div
          key={`${file.name}-${index}`}
          className="relative group rounded-[var(--radius-card)] overflow-hidden bg-tempo-card border border-tempo-border aspect-video"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: m.spring.primary.stiffness,
            damping: m.spring.primary.damping,
            mass: m.spring.primary.mass,
            delay: index * 0.08,
          }}
        >
          <Image
            src={objectUrls[index]}
            alt={`Screenshot ${index + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
          <motion.button
            onClick={(e) => { e.stopPropagation(); onRemove(index) }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center
              opacity-0 group-hover:opacity-100 cursor-pointer
              focus:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
            aria-label={`Remove screenshot ${index + 1}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.snappy.stiffness,
              damping: m.spring.snappy.damping,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
              <line x1="2" y1="2" x2="10" y2="10" strokeLinecap="round"/>
              <line x1="10" y1="2" x2="2" y2="10" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}
