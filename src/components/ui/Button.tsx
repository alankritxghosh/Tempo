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
  primary: 'bg-tempo-yellow text-black border-3 border-black font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
  ghost: 'bg-transparent text-black hover:underline',
  outline: 'bg-tempo-page text-black border-3 border-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
}

const shadowStyles: Record<ButtonVariant, string> = {
  primary: 'shadow-[5px_5px_0_0_#000]',
  ghost: '',
  outline: 'shadow-[3px_3px_0_0_#000]',
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
        font-[family-name:var(--font-heading)] text-[15px] font-bold
        cursor-pointer transition-all duration-100 ease-linear
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0_0_#000] disabled:active:translate-x-0 disabled:active:translate-y-0
        focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue
        ${variantStyles[variant]}
        ${shadowStyles[variant]}
        ${className}
      `}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
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
