type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        border-2 border-black
        font-[family-name:var(--font-mono)] text-[11px] font-semibold
        text-black bg-tempo-yellow
        shadow-[3px_3px_0_0_#000]
        ${className}
      `}
    >
      {children}
    </span>
  )
}
