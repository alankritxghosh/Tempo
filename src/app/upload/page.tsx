'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'
import { TextArea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import { DropZone } from '@/components/upload/DropZone'
import { ScreenshotGrid } from '@/components/upload/ScreenshotGrid'
import { motion as m } from '@/tokens'

const TEMPO_SESSION_KEYS = [
  'tempo_hooks', 'tempo_description', 'tempo_screenshots',
  'tempo_selected_hook', 'tempo_brief', 'tempo_style_mode',
  'tempo_video_id', 'tempo_video_url',
]

export default function UploadPage() {
  const router = useRouter()
  const supabase = createClient()
  const [files, setFiles] = useState<File[]>([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    TEMPO_SESSION_KEYS.forEach(key => sessionStorage.removeItem(key))
  }, [])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null)

  const handleFilesSelected = (newFiles: File[]) => {
    const combined = [...files, ...newFiles].slice(0, 4)
    setFiles(combined)
  }

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (files.length < 2) {
      setToast({ message: 'Upload at least 2 screenshots', type: 'error' })
      return
    }
    if (description.length < 10) {
      setToast({ message: 'Description must be at least 10 characters', type: 'error' })
      return
    }

    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      const screenshotUrls: string[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
        const uploadData = await uploadRes.json()

        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed')

        screenshotUrls.push(uploadData.url)
      }

      const response = await fetch('/api/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, screenshot_urls: screenshotUrls }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to generate hooks')
      }

      const data = await response.json()

      sessionStorage.setItem('tempo_hooks', JSON.stringify(data.hooks))
      sessionStorage.setItem('tempo_description', description)
      sessionStorage.setItem('tempo_screenshots', JSON.stringify(screenshotUrls))

      router.push('/hooks')
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
            Create a video
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-4">
            Upload screenshots and describe your product
          </p>
          <AccentRule className="mb-12" />
        </motion.div>

        <div className="flex flex-col gap-12">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.05,
            }}
          >
            <SectionLabel>Screenshots</SectionLabel>
            {files.length < 4 && (
              <DropZone onFilesSelected={handleFilesSelected} disabled={loading} />
            )}
            <ScreenshotGrid files={files} onRemove={handleRemoveFile} />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.1,
            }}
          >
            <SectionLabel>Description</SectionLabel>
            <TextArea
              value={description}
              onChange={setDescription}
              placeholder="Describe your product in 1-2 sentences..."
              maxLength={300}
              rows={4}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.15,
            }}
          >
            <Button
              onClick={handleGenerate}
              disabled={loading || files.length < 2 || description.length < 10}
              className="w-full"
            >
              {loading ? 'Generating hooks...' : 'Generate hooks'}
            </Button>
          </motion.div>
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
