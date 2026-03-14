type SkeletonProps = {
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ width, height, className = '' }: SkeletonProps) {
  return (
    <div
      className={`border-2 border-black ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #F0EEEA 25%, #E8E6E2 50%, #F0EEEA 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  )
}
