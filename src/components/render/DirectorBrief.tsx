'use client'

import { Skeleton } from '@/components/ui/Skeleton'
import { Badge } from '@/components/ui/Badge'
import type { DirectorBrief as DirectorBriefType } from '@/types'

type DirectorBriefProps = {
  brief: DirectorBriefType | null
}

export function DirectorBrief({ brief }: DirectorBriefProps) {
  if (!brief) {
    return (
      <div className="flex flex-col gap-3 p-6 bg-tempo-card border-3 border-black" style={{ boxShadow: 'var(--shadow-md)' }}>
        <Skeleton width="80%" height="16px" />
        <Skeleton width="95%" height="16px" />
        <Skeleton width="60%" height="16px" />
        <div className="w-[2px] h-[16px] bg-tempo-pink animate-pulse inline-block" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6 bg-tempo-card border-3 border-black" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[12px] text-tempo-secondary tracking-[0.08em] uppercase">
          {brief.scenes.length} scenes &middot; {brief.total_duration_seconds}s
        </span>
        <Badge>{brief.style_mode}</Badge>
      </div>

      {brief.scenes.map((scene, i) => (
        <div key={i} className="border-l-[3px] border-l-black pl-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-tempo-secondary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-black">
              {scene.scene_type.replace('_', ' ')}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-tempo-secondary ml-auto">
              {scene.duration_seconds}s
            </span>
          </div>
          {scene.elements.map((el, j) => (
            <p key={j} className="font-[family-name:var(--font-body)] text-[13px] text-tempo-secondary leading-relaxed">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-tempo-disabled mr-1">
                {el.type}
              </span>
              {el.text && <span className="text-black">{el.text}</span>}
              {el.screenshot_index !== undefined && (
                <span className="text-black">screenshot #{el.screenshot_index}</span>
              )}
            </p>
          ))}
          {scene.narration && (
            <p className="font-[family-name:var(--font-body)] text-[12px] text-tempo-disabled italic mt-1">
              {scene.narration}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
