'use client'

export function LandingVideo() {
  return (
    <div className="relative w-full aspect-video rounded-[var(--radius-card)] overflow-hidden bg-tempo-card border border-tempo-border">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-disabled">
          Demo video coming soon
        </p>
      </div>
    </div>
  )
}
