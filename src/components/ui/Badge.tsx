type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        rounded-[var(--radius-badge)]
        font-[family-name:var(--font-body)] text-[11px] font-medium
        text-tempo-secondary bg-tempo-panel
        ${className}
      `}
    >
      {children}
    </span>
  )
}
