'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { HookCard } from '@/components/hooks/HookCard'
import { motion as m } from '@/tokens'
import type { Hook } from '@/types'

export default function HooksPage() {
  const router = useRouter()
  const [hooks, setHooks] = useState<Hook[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('tempo_hooks')
    if (stored) {
      try {
        setHooks(JSON.parse(stored))
      } catch {
        router.push('/upload')
        return
      }
    } else {
      router.push('/upload')
      return
    }
    setLoading(false)
  }, [router])

  const handleContinue = () => {
    if (selectedIndex === null) return
    sessionStorage.setItem('tempo_selected_hook', JSON.stringify(hooks[selectedIndex]))
    router.push('/style')
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
            Pick a hook
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-4">
            Choose the opening line for your video
          </p>
          <AccentRule className="mb-8" />
        </motion.div>

        <SectionLabel className="mb-4">Select a hook</SectionLabel>

        <div className="flex flex-col gap-4 mb-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height="88px" className="w-full" />
            ))
          ) : (
            hooks.map((hook, index) => (
              <motion.div
                key={index}
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
                <HookCard
                  hook={hook}
                  selected={selectedIndex === index}
                  deselected={selectedIndex !== null && selectedIndex !== index}
                  onClick={() => setSelectedIndex(index)}
                />
              </motion.div>
            ))
          )}
        </div>

        <Button
          onClick={handleContinue}
          disabled={selectedIndex === null}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
