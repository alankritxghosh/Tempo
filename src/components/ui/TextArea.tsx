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
          w-full bg-white text-black
          font-[family-name:var(--font-body)] text-[16px]
          p-4 resize-none
          border-3 border-black placeholder:text-tempo-disabled
          transition-all duration-100 ease-linear
          focus:outline-3 focus:outline-offset-2 focus:outline-tempo-blue
          ${focused ? 'shadow-[5px_5px_0_0_#000] translate-x-[-1px] translate-y-[-1px]' : 'shadow-[3px_3px_0_0_#000]'}
        `}
      />
      <span className="absolute bottom-3 right-4 font-[family-name:var(--font-mono)] text-[13px] text-tempo-tertiary">
        {value.length}/{maxLength}
      </span>
    </div>
  )
}
