'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import { ProgressBar } from '@/components/render/ProgressBar'
import { DirectorBrief } from '@/components/render/DirectorBrief'
import { UpgradeBanner } from '@/components/billing/UpgradeBanner'
import { UpgradeModal } from '@/components/billing/UpgradeModal'
import { useSession } from '@/hooks/useSession'
import { useRenderStatus } from '@/hooks/useRenderStatus'
import { motion as m } from '@/tokens'
import type { DirectorBrief as DirectorBriefType } from '@/types'

export default function RenderPage() {
  const router = useRouter()
  const { user } = useSession()
  const [brief, setBrief] = useState<DirectorBriefType | null>(null)
  const [rendering, setRendering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const [videoId, setVideoId] = useState<string | null>(null)
  const hasNavigated = useRef(false)

  const renderStatus = useRenderStatus(jobId, videoId)

  useEffect(() => {
    const briefRaw = sessionStorage.getItem('tempo_brief')
    if (!briefRaw) {
      router.push('/style')
      return
    }
    try {
      setBrief(JSON.parse(briefRaw))
    } catch {
      router.push('/style')
    }
  }, [router])

  useEffect(() => {
    if (hasNavigated.current) return

    if (renderStatus.status === 'complete' && renderStatus.video_url) {
      hasNavigated.current = true
      sessionStorage.setItem('tempo_video_url', renderStatus.video_url)
      router.push('/preview')
    }

    if (renderStatus.status === 'failed') {
      setError('Render failed. Please try again.')
      setRendering(false)
      setJobId(null)
      setVideoId(null)
    }
  }, [renderStatus, router])

  const progress = rendering
    ? renderStatus.progress || 0
    : 0

  const startRender = async () => {
    setRendering(true)
    setError(null)
    hasNavigated.current = false

    try {
      const screenshotsRaw = sessionStorage.getItem('tempo_screenshots')
      const styleMode = sessionStorage.getItem('tempo_style_mode')

      if (!screenshotsRaw || !styleMode || !brief) {
        router.push('/upload')
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
          screenshot_urls: screenshots,
          style_mode: styleMode,
          brief,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Render failed')
      }

      const data = await response.json()

      sessionStorage.setItem('tempo_video_id', data.video_id)
      setJobId(data.job_id)
      setVideoId(data.video_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setRendering(false)
    }
  }

  const isPro = user?.user_metadata?.plan === 'pro'

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
          <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] mb-4">
            Render
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-4">
            Review your brief and start rendering
          </p>
          <AccentRule className="mb-12" />
        </motion.div>

        <div className="flex flex-col gap-8">
          <div>
            <SectionLabel className="mb-4">Director&apos;s brief</SectionLabel>
            <DirectorBrief brief={brief} />
          </div>

          {rendering && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionLabel className="mb-4">Progress</SectionLabel>
              <ProgressBar progress={progress} />
            </motion.div>
          )}

          {error && (
            <div className="border-l-[4px] border-l-tempo-pink pl-4 py-2">
              <p className="font-[family-name:var(--font-body)] text-[15px] text-black">
                {error}
              </p>
              <button
                onClick={startRender}
                className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-black hover:underline mt-1 cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}

          {!rendering && !error && (
            <Button onClick={startRender} className="w-full">
              Start rendering
            </Button>
          )}

          {!isPro && !rendering && (
            <UpgradeBanner onUpgradeClick={() => setShowUpgrade(true)} />
          )}
        </div>
      </div>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgraded={() => setToast({ message: 'Upgraded to Pro!', type: 'success' })}
        onError={(msg) => setToast({ message: msg, type: 'error' })}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={!!toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  )
}
