'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motion as m } from '@/tokens'
import { Badge } from '@/components/ui/Badge'
import type { Video } from '@/types'

type VideoCardProps = {
  video: Video
  onDelete: () => void
}

export function VideoCard({ video, onDelete }: VideoCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div
      className="bg-tempo-card border-3 border-black overflow-hidden transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <div className="aspect-video bg-black relative">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.hook_text || 'Video thumbnail'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-disabled">
              No thumbnail
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black truncate">
          {video.hook_text || 'Untitled video'}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-secondary">
            {new Date(video.created_at).toLocaleDateString()}
          </span>
          <Badge className={video.style_mode === 'dark' ? 'bg-black text-white' : 'bg-white'}>
            {video.style_mode || 'dark'}
          </Badge>
        </div>

        <div className="flex gap-2 mt-2">
          {video.video_url && (
            <a
              href={video.video_url}
              download
              className="flex-1 text-center py-2 border-3 border-black bg-tempo-page
                font-[family-name:var(--font-heading)] text-[13px] font-bold text-black
                shadow-[3px_3px_0_0_#000]
                transition-all duration-100 ease-linear
                hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_0_#000]
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Download
            </a>
          )}
          <button
            onClick={() => setConfirmDelete(true)}
            className="py-2 px-3 border-3 border-black bg-tempo-page
              font-[family-name:var(--font-heading)] text-[13px] font-bold text-black cursor-pointer
              shadow-[3px_3px_0_0_#000]
              transition-all duration-100 ease-linear
              hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_0_#000]
              active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            ✕
          </button>
        </div>

        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              className="border-l-[4px] border-l-tempo-pink pl-3 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: 'spring',
                stiffness: m.spring.snappy.stiffness,
                damping: m.spring.snappy.damping,
              }}
            >
              <p className="font-[family-name:var(--font-body)] text-[14px] text-black mb-2">
                Delete this video?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onDelete}
                  className="py-1 px-3 bg-tempo-pink border-2 border-black
                    font-[family-name:var(--font-heading)] text-[12px] font-bold text-black cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="py-1 px-3 bg-tempo-page border-2 border-black
                    font-[family-name:var(--font-heading)] text-[12px] font-bold text-black cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
