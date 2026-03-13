type AccentRuleProps = {
  className?: string
}

export function AccentRule({ className = '' }: AccentRuleProps) {
  return (
    <div
      className={`h-[1px] w-[40px] bg-tempo-accent ${className}`}
    />
  )
}
