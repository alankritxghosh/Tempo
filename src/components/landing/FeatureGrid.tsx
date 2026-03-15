'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const features = [
  {
    icon: '✦',
    title: 'AI-generated hooks',
    description: 'Tempo writes 4 scroll-stopping headlines. You pick the one that hits.',
    bg: 'bg-tempo-pink',
  },
  {
    icon: '◐',
    title: 'Dark & light mode',
    description: 'Choose your vibe. Every video renders in dark or light to match your brand.',
    bg: 'bg-tempo-blue',
  },
  {
    icon: '▸',
    title: 'Apple-style animations',
    description: 'Cinematic reveals, smooth transitions, and motion design — all automatic.',
    bg: 'bg-tempo-green',
  },
  {
    icon: '↓',
    title: 'Download & share',
    description: 'Get your MP4 instantly. Post to X, Product Hunt, LinkedIn, or anywhere.',
    bg: 'bg-tempo-lavender',
  },
]

export function FeatureGrid() {
  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" id="features" aria-label="Features">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">Features</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            Everything you need
          </h2>
          <AccentRule />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${feature.bg} border-3 border-black p-6 shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{
                type: 'spring',
                stiffness: m.spring.primary.stiffness,
                damping: m.spring.primary.damping,
                delay: index * 0.08,
              }}
            >
              <span className="font-[family-name:var(--font-display)] text-[36px] leading-none mb-4 block">
                {feature.icon}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-black tracking-[-0.01em] leading-[1.2] mb-3">
                {feature.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-black leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
