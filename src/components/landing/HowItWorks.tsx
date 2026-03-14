'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const steps = [
  {
    number: '01',
    title: 'Upload screenshots',
    description: 'Drop 2–4 screenshots of your product. Add a one-line description.',
    bg: 'bg-tempo-pink',
  },
  {
    number: '02',
    title: 'Pick a hook',
    description: 'AI generates 4 scroll-stopping hooks. Pick the one that hits.',
    bg: 'bg-tempo-yellow',
  },
  {
    number: '03',
    title: 'Render & download',
    description: 'Choose dark or light mode. Your video renders in under 90 seconds.',
    bg: 'bg-tempo-blue',
  },
]

export function HowItWorks() {
  return (
    <section className="border-b-4 border-black" aria-label="How it works">
      <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">How it works</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            Three steps to launch
          </h2>
          <AccentRule />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`${step.bg} border-3 border-black p-6 shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{
                type: 'spring',
                stiffness: m.spring.primary.stiffness,
                damping: m.spring.primary.damping,
                mass: m.spring.primary.mass,
                delay: index * 0.1,
              }}
            >
              <span className="font-[family-name:var(--font-mono)] text-[13px] text-black font-semibold mb-4 block">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-black tracking-[-0.01em] leading-[1.2] mb-3">
                {step.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-black leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
