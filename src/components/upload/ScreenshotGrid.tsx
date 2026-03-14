'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { motion as m } from '@/tokens'

type ScreenshotGridProps = {
  files: File[]
  onRemove: (index: number) => void
}

export function ScreenshotGrid({ files, onRemove }: ScreenshotGridProps) {
  if (files.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {files.map((file, index) => (
          <motion.div
            key={file.name + index}
            className="relative aspect-video border-3 border-black overflow-hidden bg-tempo-page"
            style={{ boxShadow: 'var(--shadow-sm)' }}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.snappy.stiffness,
              damping: m.spring.snappy.damping,
              mass: m.spring.snappy.mass,
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-black text-white
                flex items-center justify-center cursor-pointer
                font-[family-name:var(--font-mono)] text-[13px] font-bold
                hover:bg-tempo-pink transition-colors duration-100"
              aria-label={`Remove screenshot ${index + 1}`}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
