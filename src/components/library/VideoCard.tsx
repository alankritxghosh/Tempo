'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import type { Video } from '@/types'

type VideoCardProps = {
  video: Video
  onDelete: (id: string) => void
}

export function VideoCard({ video, onDelete }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <motion.div
      className={`
        bg-tempo-card border rounded-[var(--radius-card)] overflow-hidden
        ${confirmDelete ? 'border-l-[3px] border-l-tempo-error border-tempo-border' : 'border-tempo-border'}
      `}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { videoRef.current?.pause(); videoRef.current && (videoRef.current.currentTime = 0) }}
      layout
      transition={{
        type: 'spring',
        stiffness: m.spring.primary.stiffness,
        damping: m.spring.primary.damping,
      }}
    >
      <div className="relative aspect-video bg-tempo-panel">
        {video.video_url ? (
          <video
            ref={videoRef}
            src={video.video_url}
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-[family-name:var(--font-body)] text-[13px] text-tempo-disabled">
              {video.status === 'rendering' ? 'Rendering...' : 'Failed'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="font-[family-name:var(--font-display)] text-[16px] font-bold text-tempo-primary truncate mb-1">
          {video.hook_text}
        </p>
        <p className="font-[family-name:var(--font-body)] text-[13px] text-tempo-tertiary">
          {new Date(video.created_at).toLocaleDateString('en-US')}
        </p>

        {confirmDelete ? (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onDelete(video.id)}
              className="font-[family-name:var(--font-body)] text-[13px] text-tempo-error hover:underline cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent rounded"
            >
              Confirm delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="font-[family-name:var(--font-body)] text-[13px] text-tempo-secondary hover:underline cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="font-[family-name:var(--font-body)] text-[13px] text-tempo-disabled hover:text-tempo-secondary mt-3 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent rounded"
            aria-label={`Delete video: ${video.hook_text}`}
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  )
}
