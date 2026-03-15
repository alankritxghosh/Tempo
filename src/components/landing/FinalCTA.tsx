'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

export function FinalCTA() {
  return (
    <section className="bg-tempo-yellow border-b-4 border-black px-4 py-24 md:py-32" aria-label="Get started">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-[family-name:var(--font-display)] text-[40px] md:text-[72px] font-extrabold text-black tracking-[-0.03em] leading-[1.0] mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
          }}
        >
          Ready to ship?
        </motion.h2>

        <motion.p
          className="font-[family-name:var(--font-body)] text-[18px] md:text-[20px] text-black leading-relaxed mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
            delay: 0.1,
          }}
        >
          Turn screenshots into videos. No editing. No designers. Just Tempo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
            delay: 0.2,
          }}
        >
          <Link
            href="/auth"
            className="inline-flex items-center justify-center px-10 py-5 bg-black text-white border-3 border-black font-[family-name:var(--font-heading)] text-[20px] font-bold shadow-[5px_5px_0_0_rgba(0,0,0,0.3)] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
          >
            Get Tempo — it&apos;s free
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
