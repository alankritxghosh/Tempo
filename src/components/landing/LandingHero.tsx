'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { AccentRule } from '@/components/ui/AccentRule'

export function LandingHero() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
      aria-label="Hero"
    >
      <motion.h1
        className="font-[family-name:var(--font-display)] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-extrabold text-tempo-primary tracking-[-0.03em] leading-[1.0] mb-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          mass: m.spring.gentle.mass,
        }}
      >
        Ship at the speed
        <br />
        of Tempo.
      </motion.h1>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          delay: 0.1,
        }}
      >
        <AccentRule />
      </motion.div>

      <motion.p
        className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary max-w-md mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          delay: 0.15,
        }}
      >
        Turn screenshots into Apple-style product videos in 60 seconds. No editing skills required.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          delay: 0.2,
        }}
      >
        <motion.div
          whileTap={{ scale: m.micro.press }}
          whileHover={{ scale: m.micro.select }}
          transition={{
            type: 'spring',
            stiffness: m.spring.snappy.stiffness,
            damping: m.spring.snappy.damping,
            mass: m.spring.snappy.mass,
          }}
        >
          <Link
            href="/auth"
            className="inline-flex items-center justify-center px-8 py-4
              bg-tempo-accent text-white rounded-[var(--radius-button)]
              font-[family-name:var(--font-body)] text-[15px] font-medium
              focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
          >
            Start creating
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
