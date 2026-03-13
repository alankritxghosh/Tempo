'use client'

import { useState, useEffect, useRef } from 'react'
import { AccentRule } from '@/components/ui/AccentRule'
import type { DirectorBrief as DirectorBriefType } from '@/types'

type DirectorBriefProps = {
  brief: DirectorBriefType | null
}

function formatBriefText(brief: DirectorBriefType): string {
  return brief.scenes.map((s, i) => {
    const sceneLabel = `Scene ${i + 1} — ${s.scene_type.replace('_', ' ')}`
    const duration = `${s.duration_seconds}s`
    const elements = s.elements
      .map(e => {
        if (e.type === 'ScreenPush') return `  ScreenPush → screenshot #${(e.screenshot_index ?? 0) + 1}`
        return `  ${e.type} → "${e.text || ''}"`
      })
      .join('\n')
    const narration = s.narration ? `  ↳ ${s.narration}` : ''
    return `${sceneLabel} (${duration})\n${elements}${narration ? '\n' + narration : ''}`
  }).join('\n\n')
}

export function DirectorBrief({ brief }: DirectorBriefProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const fullText = brief ? formatBriefText(brief) : ''
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!brief) return
    setVisibleChars(0)

    intervalRef.current = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= fullText.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return prev
        }
        return prev + 2
      })
    }, 12)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [brief, fullText.length])

  if (!brief) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col gap-2">
            <div
              className="h-3 rounded"
              style={{
                width: `${30 + i * 5}%`,
                animation: 'shimmer 1.5s infinite',
                background: 'linear-gradient(90deg, #111111 25%, #1A1A1A 50%, #111111 75%)',
                backgroundSize: '200% 100%',
              }}
            />
            <div
              className="h-3 rounded"
              style={{
                width: `${60 + i * 10}%`,
                animation: 'shimmer 1.5s infinite',
                background: 'linear-gradient(90deg, #111111 25%, #1A1A1A 50%, #111111 75%)',
                backgroundSize: '200% 100%',
                animationDelay: '0.2s',
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  const isComplete = visibleChars >= fullText.length

  return (
    <div className="flex flex-col gap-4">
      <pre className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary whitespace-pre-wrap leading-relaxed">
        {fullText.slice(0, visibleChars)}
        {!isComplete && (
          <span className="text-tempo-accent animate-pulse">|</span>
        )}
      </pre>
      {isComplete && (
        <div className="flex items-center gap-3">
          <AccentRule />
          <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-tertiary">
            {brief.total_duration_seconds}s total
          </span>
        </div>
      )}
    </div>
  )
}
