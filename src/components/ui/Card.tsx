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
        relative rounded-[var(--radius-card)] p-6 cursor-pointer
        transition-[background-color,border-color] duration-[60ms]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tempo-accent
        ${selected
          ? 'bg-tempo-accent-dark border border-tempo-border-accent'
          : 'bg-tempo-card border border-tempo-border hover:bg-[#161616] hover:border-tempo-border-hover'
        }
        ${deselected ? 'opacity-45' : ''}
        ${className}
      `}
      style={deselected ? { transition: 'opacity 200ms ease-out' } : undefined}
      layout
      transition={{
        type: 'spring',
        stiffness: m.spring.primary.stiffness,
        damping: m.spring.primary.damping,
        mass: m.spring.primary.mass,
      }}
    >
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-tempo-accent rounded-l-[var(--radius-card)]" />
      )}
      {children}
    </motion.div>
  )
}
