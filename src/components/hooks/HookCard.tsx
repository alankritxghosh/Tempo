'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Hook } from '@/types'

type HookCardProps = {
  hook: Hook
  selected: boolean
  deselected: boolean
  onClick: () => void
}

export function HookCard({ hook, selected, deselected, onClick }: HookCardProps) {
  return (
    <Card selected={selected} deselected={deselected} onClick={onClick}>
      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-display)] text-[24px] font-bold text-tempo-primary tracking-[-0.01em] leading-[1.2]">
          &ldquo;{hook.text}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-tempo-tertiary tracking-[0.08em] uppercase">
            {hook.framework}
          </span>
          <Badge>
            {Math.round(hook.trend_confidence * 100)}% trend
          </Badge>
        </div>
      </div>
    </Card>
  )
}
