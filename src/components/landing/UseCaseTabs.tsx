'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const useCases = [
  {
    id: 'indie',
    tab: 'Indie Hackers',
    headline: 'Ship your launch video before lunch',
    description: 'You built the product. Now show it off. Tempo turns your app screenshots into a scroll-stopping promo — so you can get back to building.',
    accent: 'bg-tempo-pink',
  },
  {
    id: 'ph',
    tab: 'Product Hunters',
    headline: 'The Product Hunt video, done in 60 seconds',
    description: 'A polished launch video is the difference between top 5 and page 2. Tempo gives you Apple-quality motion design without the Apple-quality budget.',
    accent: 'bg-tempo-blue',
  },
  {
    id: 'founders',
    tab: 'Startup Founders',
    headline: 'Investor-ready demos on demand',
    description: 'Stop screen-recording buggy demos. Upload your best screens and get a promo video that makes your product look exactly how you imagined it.',
    accent: 'bg-tempo-green',
  },
  {
    id: 'creators',
    tab: 'Content Creators',
    headline: 'Content that stops the scroll',
    description: 'Need a quick video for X, LinkedIn, or your newsletter? Tempo generates motion-graphics content from screenshots in under a minute.',
    accent: 'bg-tempo-lavender',
  },
]

export function UseCaseTabs() {
  const [active, setActive] = useState(0)
  const current = useCases[active]

  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" aria-label="Use cases">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">Made for makers</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            Tempo is made for you
          </h2>
          <AccentRule />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {useCases.map((uc, index) => (
            <button
              key={uc.id}
              onClick={() => setActive(index)}
              className={`px-5 py-3 border-3 border-black font-[family-name:var(--font-heading)] text-[14px] font-bold text-black transition-all duration-100 ease-linear cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue ${active === index ? 'bg-tempo-yellow shadow-[5px_5px_0_0_#000] translate-x-[-2px] translate-y-[-2px]' : 'bg-tempo-card shadow-[3px_3px_0_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#000]'}`}
            >
              {uc.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={`${current.accent} border-3 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#000]`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              type: 'spring',
              stiffness: m.spring.snappy.stiffness,
              damping: m.spring.snappy.damping,
              mass: m.spring.snappy.mass,
            }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-[28px] md:text-[40px] font-extrabold text-black tracking-[-0.02em] leading-[1.1] mb-4">
              {current.headline}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[16px] md:text-[18px] text-black leading-relaxed mb-8 max-w-xl">
              {current.description}
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-8 py-4 bg-tempo-yellow text-black border-3 border-black font-[family-name:var(--font-heading)] text-[17px] font-bold shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              Get Tempo
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
