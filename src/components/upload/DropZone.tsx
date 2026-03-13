'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

type DropZoneProps = {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function DropZone({ onFilesSelected, disabled = false }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const validateFiles = (files: FileList): File[] => {
    const valid: File[] = []
    for (let i = 0; i < files.length && valid.length < 4; i++) {
      const file = files[i]
      if (!['image/png', 'image/jpeg'].includes(file.type)) continue
      if (file.size > 10 * 1024 * 1024) continue
      valid.push(file)
    }
    return valid
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (disabled) return
    const files = validateFiles(e.dataTransfer.files)
    if (files.length > 0) onFilesSelected(files)
  }, [disabled, onFilesSelected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files) return
    const files = validateFiles(e.target.files)
    if (files.length > 0) onFilesSelected(files)
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Upload area. Click or drag screenshots here."
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      className={`
        relative rounded-[var(--radius-card)] p-8 md:p-12 cursor-pointer
        border-2 border-dashed
        flex flex-col items-center justify-center gap-4
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tempo-accent
        ${dragActive
          ? 'border-tempo-accent bg-tempo-accent-dark/20'
          : 'border-tempo-border hover:border-tempo-border-hover'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: m.spring.gentle.stiffness,
        damping: m.spring.gentle.damping,
        mass: m.spring.gentle.mass,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload screenshots"
      />
      <div className="w-12 h-12 rounded-[var(--radius-card)] bg-tempo-panel flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-tempo-secondary">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-primary">
        Drop screenshots here
      </p>
      <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
        2-4 PNG or JPEG files, max 10MB each
      </p>
    </motion.div>
  )
}
