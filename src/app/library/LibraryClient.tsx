'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { VideoCard } from '@/components/library/VideoCard'
import { EmptyState } from '@/components/library/EmptyState'
import { motion as m } from '@/tokens'
import type { Video } from '@/types'

type LibraryClientProps = {
  videos: Video[]
}

export function LibraryClient({ videos: initialVideos }: LibraryClientProps) {
  const router = useRouter()
  const [videos, setVideos] = useState(initialVideos)

  const handleDelete = async (id: string) => {
    const response = await fetch('/api/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video_id: id }),
    })

    if (response.ok) {
      setVideos(videos.filter(v => v.id !== id))
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-tempo-page">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-bold text-tempo-primary tracking-[-0.02em] leading-[1.05] mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
            mass: m.spring.gentle.mass,
          }}
        >
          Library
        </motion.h1>

        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: m.spring.primary.stiffness,
                  damping: m.spring.primary.damping,
                  delay: index * 0.05,
                }}
              >
                <VideoCard video={video} onDelete={handleDelete} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
