'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

type CardProps = {
  children: React.ReactNode
  selected?: boolean
  deselected?: boolean
  onClick?: () => void
  className?: string
}

export function Card({
  children,
  selected = false,
  deselected = false,
  onClick,
  className = '',
}: CardProps) {
  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
      className={`
        relative p-6 cursor-pointer
        border-3 border-black
        transition-all duration-100 ease-linear
        focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue
        ${selected
          ? 'bg-tempo-yellow shadow-[5px_5px_0_0_#000]'
          : 'bg-tempo-card shadow-[5px_5px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]'
        }
        ${deselected ? 'opacity-45' : ''}
        ${className}
      `}
      layout
      transition={{
        type: 'spring',
        stiffness: m.spring.primary.stiffness,
        damping: m.spring.primary.damping,
        mass: m.spring.primary.mass,
      }}
    >
      {children}
    </motion.div>
  )
}
