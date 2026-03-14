'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

export function LandingHero() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-tempo-pink border-b-4 border-black"
      aria-label="Hero"
    >
      <motion.h1
        className="font-[family-name:var(--font-display)] text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-extrabold text-black tracking-[-0.03em] leading-[1.0] mb-6"
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

      <motion.p
        className="font-[family-name:var(--font-body)] text-[18px] text-black max-w-md mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          delay: 0.1,
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
        <Link
          href="/auth"
          className="inline-flex items-center justify-center px-8 py-4
            bg-tempo-yellow text-black border-3 border-black
            font-[family-name:var(--font-heading)] text-[17px] font-bold
            shadow-[5px_5px_0_0_#000]
            transition-all duration-100 ease-linear
            hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]
            active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
            focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
        >
          Start creating
        </Link>
      </motion.div>
    </section>
  )
}
