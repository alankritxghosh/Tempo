type SkeletonProps = {
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ width, height, className = '' }: SkeletonProps) {
  return (
    <div
      className={`rounded-[var(--radius-card)] ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #111111 25%, #1A1A1A 50%, #111111 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  )
}
