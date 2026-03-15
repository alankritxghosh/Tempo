'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const stats = [
  {
    value: '60s',
    title: 'Render time',
    description: 'Your video renders in under 90 seconds. Grab a coffee, come back to a finished promo.',
    bg: 'bg-tempo-pink',
  },
  {
    value: '0',
    title: 'Editing required',
    description: 'No timeline. No keyframes. No After Effects. Just upload, pick, and ship.',
    bg: 'bg-tempo-yellow',
  },
  {
    value: '✦',
    title: 'Apple-quality output',
    description: 'Smooth motion design, cinematic reveals, and scroll-stopping hooks. Built in.',
    bg: 'bg-tempo-blue',
  },
]

export function SpeedStats() {
  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" aria-label="Speed and stats">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">Why Tempo</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            60 seconds. Zero editing.
          </h2>
          <AccentRule />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`${stat.bg} border-3 border-black p-6 shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{
                type: 'spring',
                stiffness: m.spring.primary.stiffness,
                damping: m.spring.primary.damping,
                delay: index * 0.1,
              }}
            >
              <span className="font-[family-name:var(--font-display)] text-[48px] font-extrabold text-black leading-none mb-4 block">
                {stat.value}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-black tracking-[-0.01em] leading-[1.2] mb-3">
                {stat.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-black leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center px-8 py-4 bg-tempo-yellow text-black border-3 border-black font-[family-name:var(--font-heading)] text-[17px] font-bold shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
          >
            Get Tempo
          </Link>
        </div>
      </div>
    </section>
  )
}
