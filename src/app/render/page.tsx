'use client'

import { useState, useEffect } from 'react'
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
import { motion as m } from '@/tokens'

export default function RenderPage() {
  const router = useRouter()
  const { user } = useSession()
  const [brief, setBrief] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [rendering, setRendering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)

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

  const startRender = async () => {
    setRendering(true)
    setError(null)
    setProgress(0)

    try {
      const hookRaw = sessionStorage.getItem('tempo_selected_hook')
      const screenshotsRaw = sessionStorage.getItem('tempo_screenshots')
      const styleMode = sessionStorage.getItem('tempo_style_mode')
      const description = sessionStorage.getItem('tempo_description')

      if (!hookRaw || !screenshotsRaw || !styleMode || !brief || !description) {
        router.push('/upload')
        return
      }

      let hook: { text: string }
      let screenshots: string[]
      try {
        hook = JSON.parse(hookRaw)
        screenshots = JSON.parse(screenshotsRaw)
      } catch {
        router.push('/upload')
        return
      }

      const progressInterval = setInterval(() => {
        setProgress(p => Math.min(p + Math.random() * 8, 90))
      }, 2000)

      const response = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook_text: hook.text,
          description,
          screenshot_urls: screenshots,
          style_mode: styleMode,
          brief,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Render failed')
      }

      const data = await response.json()
      setProgress(100)

      sessionStorage.setItem('tempo_video_id', data.video_id)
      sessionStorage.setItem('tempo_video_url', data.video_url)

      setTimeout(() => router.push('/preview'), 500)
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
