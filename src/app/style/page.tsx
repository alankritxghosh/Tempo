'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Toast } from '@/components/ui/Toast'
import { motion as m } from '@/tokens'

export default function StylePage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<'dark' | 'light' | null>(null)
  const [loading, setLoading] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null)

  useEffect(() => {
    const hook = sessionStorage.getItem('tempo_selected_hook')
    if (!hook) {
      router.push('/hooks')
      return
    }
    const screenshots = sessionStorage.getItem('tempo_screenshots')
    if (screenshots) {
      try {
        const urls = JSON.parse(screenshots) as string[]
        if (urls.length > 0) setScreenshotUrl(urls[0])
      } catch {
        router.push('/upload')
      }
    }
  }, [router])

  const handleGenerate = async () => {
    if (!selectedMode) return
    setLoading(true)

    try {
      const hookRaw = sessionStorage.getItem('tempo_selected_hook')
      const description = sessionStorage.getItem('tempo_description')
      const screenshotsRaw = sessionStorage.getItem('tempo_screenshots')

      if (!hookRaw || !description || !screenshotsRaw) {
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

      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook_text: hook.text,
          description,
          screenshot_urls: screenshots,
          style_mode: selectedMode,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to generate brief')
      }

      const data = await response.json()
      sessionStorage.setItem('tempo_brief', JSON.stringify(data.brief))
      sessionStorage.setItem('tempo_style_mode', selectedMode)

      router.push('/render')
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Something went wrong', type: 'error' })
    } finally {
      setLoading(false)
    }
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
          <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] mb-4">
            Choose a style
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-8">
            Dark mode or light mode for your video
          </p>
        </motion.div>

        <SectionLabel className="mb-4">Style mode</SectionLabel>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0,
            }}
          >
            <Card
              selected={selectedMode === 'dark'}
              onClick={() => setSelectedMode('dark')}
              className="flex flex-col items-center gap-4 py-6"
            >
              <div className="relative w-full aspect-video bg-black border-3 border-black overflow-hidden">
                {screenshotUrl && (
                  <img
                    src={screenshotUrl}
                    alt="Dark mode preview"
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover opacity-80"
                  />
                )}
              </div>
              <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black">
                Dark
              </span>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.05,
            }}
          >
            <Card
              selected={selectedMode === 'light'}
              onClick={() => setSelectedMode('light')}
              className="flex flex-col items-center gap-4 py-6"
            >
              <div className="relative w-full aspect-video bg-white border-3 border-black overflow-hidden">
                {screenshotUrl && (
                  <img
                    src={screenshotUrl}
                    alt="Light mode preview"
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover opacity-80"
                  />
                )}
              </div>
              <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black">
                Light
              </span>
            </Card>
          </motion.div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!selectedMode || loading}
          className="w-full"
        >
          {loading ? 'Generating brief...' : 'Generate video'}
        </Button>
      </div>

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
