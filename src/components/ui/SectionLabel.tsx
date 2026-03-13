type SectionLabelProps = {
  children: React.ReactNode
  uppercase?: boolean
  className?: string
}

export function SectionLabel({ children, uppercase = true, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`
        block font-[family-name:var(--font-body)] text-[11px] font-semibold
        tracking-[0.08em] text-tempo-tertiary leading-[1.2]
        ${uppercase ? 'uppercase' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
