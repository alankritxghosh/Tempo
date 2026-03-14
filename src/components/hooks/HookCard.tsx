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
      <div className="flex flex-col gap-2">
        <p className="font-[family-name:var(--font-heading)] text-[18px] font-bold text-black leading-snug">
          {hook.text}
        </p>
        {hook.framework && (
          <Badge className={selected ? 'bg-white' : ''}>
            {hook.framework}
          </Badge>
        )}
      </div>
    </Card>
  )
}
