'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import { motion as m } from '@/tokens'

export default function PreviewPage() {
  const router = useRouter()
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const videoId = sessionStorage.getItem('tempo_video_id')
    if (!videoId) {
      router.push('/render')
      return
    }

    async function fetchSignedUrl() {
      try {
        const res = await fetch(`/api/download?video_id=${videoId}`)
        if (!res.ok) throw new Error('Failed to load video')
        const data = await res.json()
        setSignedUrl(data.signed_url)
      } catch {
        setToast({ message: 'Could not load video. Try again.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchSignedUrl()
  }, [router])

  const handleDownload = () => {
    if (!signedUrl) return
    const link = document.createElement('a')
    link.href = signedUrl
    link.download = 'tempo-video.mp4'
    link.target = '_blank'
    link.click()
    setToast({ message: 'Download started', type: 'success' })
  }

  const handleNewVideo = () => {
    router.push('/upload')
  }

  return (
    <div className="min-h-screen bg-tempo-page">
      <div className="max-w-3xl mx-auto px-4 py-16">
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
            Preview
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-4">
            Your video is ready
          </p>
          <AccentRule className="mb-12" />
        </motion.div>

        {loading && (
          <div className="mb-8">
            <SectionLabel className="mb-4">Video</SectionLabel>
            <div className="border-3 border-black overflow-hidden aspect-video bg-black flex items-center justify-center" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <p className="font-[family-name:var(--font-mono)] text-[13px] text-white/50">Loading video...</p>
            </div>
          </div>
        )}

        {!loading && signedUrl && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.05,
            }}
          >
            <SectionLabel className="mb-4">Video</SectionLabel>
            <div className="border-3 border-black overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <video
                src={signedUrl}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              />
            </div>
          </motion.div>
        )}

        <div className="flex gap-4">
          <Button onClick={handleDownload} disabled={!signedUrl} className="flex-1">
            Download
          </Button>
          <Button variant="ghost" onClick={handleNewVideo}>
            Create another
          </Button>
        </div>
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
