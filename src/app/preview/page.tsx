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
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const url = sessionStorage.getItem('tempo_video_url')
    if (!url) {
      router.push('/render')
      return
    }
    setVideoUrl(url)
  }, [router])

  const handleDownload = () => {
    if (!videoUrl) return
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = 'tempo-video.mp4'
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

        {videoUrl && (
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
                src={videoUrl}
                controls
                autoPlay
                className="w-full aspect-video bg-black"
              />
            </div>
          </motion.div>
        )}

        <div className="flex gap-4">
          <Button onClick={handleDownload} className="flex-1">
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
