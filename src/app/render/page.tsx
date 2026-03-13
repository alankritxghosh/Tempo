'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'
import { Button } from '@/components/ui/Button'
import { DirectorBrief } from '@/components/render/DirectorBrief'
import { ProgressBar } from '@/components/render/ProgressBar'
import { useRenderStatus } from '@/hooks/useRenderStatus'
import { motion as m } from '@/tokens'
import type { DirectorBrief as BriefType } from '@/types'

export default function RenderPage() {
  const router = useRouter()
  const [brief, setBrief] = useState<BriefType | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const renderTriggered = useRef(false)
  const renderStatus = useRenderStatus(jobId, videoId)

  useEffect(() => {
    if (renderTriggered.current) return
    renderTriggered.current = true

    let cancelled = false

    const storedBrief = sessionStorage.getItem('tempo_brief')
    if (!storedBrief) {
      router.push('/style')
      return
    }

    let parsedBrief: BriefType
    try {
      parsedBrief = JSON.parse(storedBrief)
    } catch {
      router.push('/style')
      return
    }
    setBrief(parsedBrief)

    const triggerRender = async () => {
      try {
        const screenshotsRaw = sessionStorage.getItem('tempo_screenshots')
        const styleMode = sessionStorage.getItem('tempo_style_mode')

        if (!screenshotsRaw || !styleMode) {
          router.push('/style')
          return
        }

        let screenshots: string[]
        try {
          screenshots = JSON.parse(screenshotsRaw)
        } catch {
          router.push('/upload')
          return
        }

        const response = await fetch('/api/render', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brief: parsedBrief,
            screenshot_urls: screenshots,
            style_mode: styleMode,
          }),
        })

        if (cancelled) return

        if (!response.ok) {
          const err = await response.json()
          setRenderError(err.error || 'Failed to start render')
          return
        }

        const data = await response.json()
        if (cancelled) return
        setJobId(data.job_id)
        setVideoId(data.video_id)
        sessionStorage.setItem('tempo_video_id', data.video_id)
      } catch (err) {
        if (cancelled) return
        setRenderError(err instanceof Error ? err.message : 'Failed to start render')
      }
    }

    triggerRender()

    return () => { cancelled = true }
  }, [router])

  useEffect(() => {
    if (renderStatus.status === 'complete' && renderStatus.video_url) {
      sessionStorage.setItem('tempo_video_url', renderStatus.video_url)
      router.push('/preview')
    }
  }, [renderStatus, router])

  const statusLabel = () => {
    if (renderError || renderStatus.status === 'failed') return 'Failed'
    if (renderStatus.status === 'rendering') return `Scene ${renderStatus.current_scene || 1} of 3`
    if (renderStatus.status === 'complete') return 'Complete'
    return 'Starting...'
  }

  return (
    <div className="min-h-screen bg-tempo-page">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
            mass: m.spring.gentle.mass,
          }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-bold text-tempo-primary tracking-[-0.02em] leading-[1.05] mb-4">
            {renderError || renderStatus.status === 'failed' ? 'Render failed' : 'Rendering'}
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-8">
            {renderError || renderStatus.status === 'failed'
              ? 'Something went wrong while building your video'
              : 'Building your video...'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <div>
            <SectionLabel className="mb-4">Director&apos;s brief</SectionLabel>
            <div className={`bg-tempo-card border rounded-[var(--radius-card)] p-6 ${
              renderError || renderStatus.status === 'failed'
                ? 'border-l-[3px] border-l-tempo-error border-t-tempo-border border-r-tempo-border border-b-tempo-border'
                : 'border-tempo-border'
            }`}>
              <DirectorBrief brief={brief} />
            </div>
          </div>

          {renderError && (
            <div className="border-l-[3px] border-l-tempo-error pl-4">
              <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
                {renderError}
              </p>
            </div>
          )}

          <div>
            <SectionLabel className="mb-4">Progress</SectionLabel>
            <ProgressBar progress={renderStatus.progress / 100} />
            <div className="flex items-center justify-between mt-3" role="status" aria-live="polite">
              <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
                {statusLabel()}
              </span>
              {renderStatus.render_time_seconds && (
                <div className="flex flex-col items-end gap-1">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-primary">
                    {renderStatus.render_time_seconds}s
                  </span>
                  <AccentRule />
                </div>
              )}
            </div>
          </div>

          {(renderError || renderStatus.status === 'failed') && (
            <div className="flex gap-4">
              <Button onClick={() => router.push('/style')} className="flex-1">
                Try again
              </Button>
              <Button variant="ghost" onClick={() => router.push('/hooks')}>
                Change hook
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
