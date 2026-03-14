'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

type DropZoneProps = {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function DropZone({ onFilesSelected, disabled = false }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (disabled) return

    const files = Array.from(e.dataTransfer.files).filter(f =>
      f.type.startsWith('image/')
    )
    if (files.length > 0) onFilesSelected(files)
  }, [onFilesSelected, disabled])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) onFilesSelected(files)
    e.target.value = ''
  }

  return (
    <motion.label
      className={`
        flex flex-col items-center justify-center gap-4
        px-6 py-12 cursor-pointer
        transition-all duration-100 ease-linear
        ${dragActive
          ? 'bg-tempo-yellow border-3 border-black border-solid'
          : 'bg-tempo-page border-3 border-black border-dashed'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-tempo-pink border-3 border-black">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black text-center">
        Drop screenshots here
      </p>
      <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
        or click to browse (PNG, JPG)
      </p>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
        disabled={disabled}
      />
    </motion.label>
  )
}
