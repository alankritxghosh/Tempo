'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AccentRule } from '@/components/ui/AccentRule'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import { VideoCard } from '@/components/library/VideoCard'
import { EmptyState } from '@/components/library/EmptyState'
import { motion as m } from '@/tokens'
import type { Video } from '@/types'

type LibraryClientProps = {
  videos: Video[]
}

export function LibraryClient({ videos: initialVideos }: LibraryClientProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleDelete = async (videoId: string) => {
    try {
      const response = await fetch(`/api/videos/${videoId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      setVideos(videos.filter(v => v.id !== videoId))
      setToast({ message: 'Video deleted', type: 'success' })
    } catch {
      setToast({ message: 'Failed to delete video', type: 'error' })
    }
  }

  return (
    <div className="min-h-screen bg-tempo-page">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          className="flex items-start justify-between mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
            mass: m.spring.gentle.mass,
          }}
        >
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] mb-4">
              Library
            </h1>
            <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary">
              Your generated videos
            </p>
          </div>
          <Link href="/upload">
            <Button>New video</Button>
          </Link>
        </motion.div>

        <AccentRule className="mb-12" />

        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: m.spring.primary.stiffness,
                  damping: m.spring.primary.damping,
                  mass: m.spring.primary.mass,
                  delay: index * 0.05,
                }}
              >
                <VideoCard video={video} onDelete={() => handleDelete(video.id)} />
              </motion.div>
            ))}
          </div>
        )}
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
