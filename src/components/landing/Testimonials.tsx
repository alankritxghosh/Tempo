'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AccentRule } from '@/components/ui/AccentRule'

const testimonials = [
  {
    quote: 'I made a Product Hunt launch video in literally 60 seconds. My designer friend thought I hired someone.',
    name: 'Aarav M.',
    title: 'Indie Hacker',
    bg: 'bg-tempo-pink',
  },
  {
    quote: 'Tempo replaced a $500 Fiverr gig for me. The output looks like an Apple keynote demo. Unreal.',
    name: 'Sarah K.',
    title: 'Startup Founder',
    bg: 'bg-tempo-blue',
  },
  {
    quote: 'I ship 3 products a month. Tempo is the only tool that keeps up. Upload, pick, download. Done.',
    name: 'Raj P.',
    title: 'Serial Builder',
    bg: 'bg-tempo-green',
  },
  {
    quote: 'The AI hooks are genuinely good. I used one as my actual tweet copy and it got 2k impressions.',
    name: 'Mika T.',
    title: 'Content Creator',
    bg: 'bg-tempo-lavender',
  },
]

export function Testimonials() {
  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" aria-label="Testimonials">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel className="mb-4">What makers say</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
            Love letters to Tempo
          </h2>
          <AccentRule />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.blockquote
              key={t.name}
              className={`${t.bg} border-3 border-black p-6 shadow-[5px_5px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#000]`}
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
              <span className="font-[family-name:var(--font-display)] text-[48px] leading-none text-black block mb-2">
                &ldquo;
              </span>
              <p className="font-[family-name:var(--font-body)] text-[16px] text-black leading-relaxed mb-6">
                {t.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black border-3 border-black flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-[16px] font-extrabold text-white">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="font-[family-name:var(--font-heading)] text-[15px] font-bold text-black not-italic block">
                    {t.name}
                  </cite>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-tempo-secondary tracking-[0.04em]">
                    {t.title}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
