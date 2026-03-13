'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { motion as m } from '@/tokens'
import { useEffect } from 'react'

type ToastProps = {
  message: string
  type?: 'info' | 'error' | 'success'
  visible: boolean
  onDismiss: () => void
  duration?: number
}

const borderColors = {
  info: 'border-l-tempo-accent',
  error: 'border-l-tempo-error',
  success: 'border-l-tempo-success',
}

export function Toast({
  message,
  type = 'info',
  visible,
  onDismiss,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          aria-live="assertive"
          className={`
            fixed bottom-6 right-6 z-50
            bg-tempo-card border border-tempo-border border-l-[3px] ${borderColors[type]}
            rounded-[var(--radius-card)] px-6 py-4 max-w-sm
            font-[family-name:var(--font-body)] text-[15px] text-tempo-primary
          `}
          style={{ boxShadow: 'var(--shadow-elevated)' }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: m.spring.snappy.stiffness,
            damping: m.spring.snappy.damping,
            mass: m.spring.snappy.mass,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
