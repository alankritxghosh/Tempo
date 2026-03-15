'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const screenshots = [
  { id: 1, label: 'Dashboard.png', color: 'bg-tempo-blue' },
  { id: 2, label: 'Features.png', color: 'bg-tempo-green' },
  { id: 3, label: 'Pricing.png', color: 'bg-tempo-lavender' },
]

export function BeforeAfter() {
  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" aria-label="Before and after">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">The transformation</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            Screenshots in, video out
          </h2>
          <AccentRule />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-center">
          <motion.div
            className="bg-tempo-page border-3 border-black p-6 shadow-[5px_5px_0_0_#000]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-64px' }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
            }}
          >
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] uppercase text-tempo-secondary mb-4 block">
              Your screenshots
            </span>
            <div className="grid grid-cols-3 gap-3">
              {screenshots.map((s) => (
                <div
                  key={s.id}
                  className={`${s.color} border-3 border-black aspect-[9/16] flex items-end p-2`}
                >
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-black font-semibold truncate">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mt-4">
              Drop 2–4 product screenshots
            </p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center px-4 md:px-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-64px' }}
            transition={{
              type: 'spring',
              stiffness: m.spring.snappy.stiffness,
              damping: m.spring.snappy.damping,
              delay: 0.15,
            }}
          >
            <div className="bg-tempo-yellow border-3 border-black w-16 h-16 flex items-center justify-center shadow-[3px_3px_0_0_#000] rotate-90 md:rotate-0">
              <span className="font-[family-name:var(--font-display)] text-[28px] font-extrabold text-black">
                →
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-black border-3 border-black p-6 shadow-[5px_5px_0_0_#000] relative overflow-hidden"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-64px' }}
            transition={{
              type: 'spring',
              stiffness: m.spring.primary.stiffness,
              damping: m.spring.primary.damping,
              delay: 0.1,
            }}
          >
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] uppercase text-tempo-yellow mb-4 block">
              Your promo video
            </span>
            <div className="aspect-video bg-tempo-secondary border-3 border-tempo-tertiary flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 border-3 border-tempo-yellow flex items-center justify-center">
                  <span className="text-tempo-yellow text-[24px]">▶</span>
                </div>
                <span className="font-[family-name:var(--font-heading)] text-[14px] text-white font-bold">
                  Apple-style promo
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-1 flex-1 bg-tempo-yellow" />
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-tempo-yellow">
                0:22
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
