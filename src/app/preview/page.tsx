'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import { UpgradeBanner } from '@/components/billing/UpgradeBanner'
import { UpgradeModal } from '@/components/billing/UpgradeModal'
import { useProfile } from '@/hooks/useProfile'
import { motion as m } from '@/tokens'

export default function PreviewPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' | 'success' } | null>(null)
  const { profile, refresh: refreshProfile } = useProfile()

  const isFree = !profile || profile.tier === 'free'

  useEffect(() => {
    const url = sessionStorage.getItem('tempo_video_url')
    const id = sessionStorage.getItem('tempo_video_id')
    if (!url || !id) {
      router.push('/upload')
      return
    }
    setVideoUrl(url)
    setVideoId(id)
  }, [router])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/download?video_id=${encodeURIComponent(videoId!)}`)
      if (response.ok) {
        const data = await response.json()
        const a = document.createElement('a')
        a.href = data.signed_url
        a.download = 'tempo-video.mp4'
        a.click()
        setDownloaded(true)
      } else {
        throw new Error('Failed to generate download link')
      }
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Download failed', type: 'error' })
    } finally {
      setDownloading(false)
    }
  }

  const [regenerating, setRegenerating] = useState(false)

  const handleRegenerate = async () => {
    const description = sessionStorage.getItem('tempo_description')
    const screenshotsRaw = sessionStorage.getItem('tempo_screenshots')

    if (!description || !screenshotsRaw) {
      router.push('/upload')
      return
    }

    setRegenerating(true)
    try {
      const screenshot_urls = JSON.parse(screenshotsRaw)
      const response = await fetch('/api/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, screenshot_urls }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to regenerate hooks')
      }

      const data = await response.json()
      sessionStorage.setItem('tempo_hooks', JSON.stringify(data.hooks))
      router.push('/hooks')
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Regeneration failed', type: 'error' })
    } finally {
      setRegenerating(false)
    }
  }

  const handleUpgraded = () => {
    refreshProfile()
    setToast({ message: 'Welcome to Pro! Your next video will be 1080p with no watermark.', type: 'success' })
  }

  if (!videoUrl) return null

  return (
    <div className="min-h-screen bg-tempo-page flex flex-col items-center justify-center px-4">
      <motion.div
        className="w-full max-w-[800px] flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          mass: m.spring.gentle.mass,
        }}
      >
        <div className="relative w-full">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-[var(--radius-card)] bg-tempo-card"
          />
          {isFree && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-black/50 backdrop-blur-sm text-white/70">
                Made with Tempo
              </Badge>
            </div>
          )}
        </div>

        <div className="flex gap-4 w-full">
          <Button onClick={handleDownload} disabled={downloading} className="flex-1">
            {downloading ? 'Preparing...' : 'Download'}
          </Button>
          <Button variant="ghost" onClick={handleRegenerate} disabled={regenerating}>
            {regenerating ? 'Regenerating...' : 'Regenerate hook'}
          </Button>
        </div>

        <AnimatePresence>
          {downloaded && isFree && (
            <UpgradeBanner onUpgradeClick={() => setUpgradeOpen(true)} />
          )}
        </AnimatePresence>
      </motion.div>

      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onUpgraded={handleUpgraded}
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
