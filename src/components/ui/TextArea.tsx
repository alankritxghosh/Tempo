'use client'

import { useState } from 'react'

type TextAreaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  rows?: number
  className?: string
}

export function TextArea({
  value,
  onChange,
  placeholder,
  maxLength = 300,
  rows = 4,
  className = '',
}: TextAreaProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`
          w-full bg-tempo-panel text-tempo-primary
          font-[family-name:var(--font-body)] text-[16px]
          rounded-[var(--radius-card)] p-4 resize-none
          border placeholder:text-tempo-disabled
          focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent
          ${focused ? 'border-tempo-accent' : 'border-tempo-border'}
        `}
      />
      <span className="absolute bottom-3 right-4 font-[family-name:var(--font-mono)] text-[13px] text-tempo-tertiary">
        {value.length}/{maxLength}
      </span>
    </div>
  )
}
