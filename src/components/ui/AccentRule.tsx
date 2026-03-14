type AccentRuleProps = {
  className?: string
}

export function AccentRule({ className = '' }: AccentRuleProps) {
  return (
    <div
      className={`h-[4px] w-[40px] bg-black ${className}`}
    />
  )
}
