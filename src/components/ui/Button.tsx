'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

type ButtonVariant = 'primary' | 'ghost' | 'outline'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-tempo-accent text-white hover:brightness-110',
  ghost: 'bg-transparent text-tempo-secondary hover:text-tempo-primary',
  outline: 'bg-transparent border border-tempo-border text-tempo-primary hover:border-tempo-border-hover',
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3
        font-[family-name:var(--font-body)] text-[15px] font-medium
        rounded-[var(--radius-button)] cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tempo-accent
        ${variantStyles[variant]}
        ${className}
      `}
      whileTap={disabled ? {} : { scale: m.micro.press }}
      whileHover={disabled ? {} : { scale: m.micro.select }}
      transition={{
        type: 'spring',
        stiffness: m.spring.snappy.stiffness,
        damping: m.spring.snappy.damping,
        mass: m.spring.snappy.mass,
      }}
    >
      {children}
    </motion.button>
  )
}
