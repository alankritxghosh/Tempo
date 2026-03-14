'use client'

import { Skeleton } from '@/components/ui/Skeleton'

type DirectorBriefProps = {
  brief: string | null
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
    <div className="p-6 bg-tempo-card border-3 border-black" style={{ boxShadow: 'var(--shadow-md)' }}>
      <p className="font-[family-name:var(--font-body)] text-[15px] text-black leading-relaxed whitespace-pre-wrap">
        {brief}
      </p>
    </div>
  )
}
