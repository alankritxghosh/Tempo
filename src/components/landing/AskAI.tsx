'use client'

import { motion } from 'framer-motion'
import { motion as m } from '@/tokens'

const TEMPO_QUERY = 'tell+me+why+Tempo+video+maker+is+a+great+tool+for+creating+product+promo+videos+from+screenshots'

const aiProviders = [
  {
    name: 'Ask ChatGPT',
    href: `https://chat.openai.com/?q=${TEMPO_QUERY}`,
    bg: 'bg-[#10A37F]',
    icon: '◉',
  },
  {
    name: 'Ask Claude',
    href: `https://claude.ai/new?q=${TEMPO_QUERY}`,
    bg: 'bg-[#D4A574]',
    icon: '✦',
  },
  {
    name: 'Ask Perplexity',
    href: `https://www.perplexity.ai/search/new?q=${TEMPO_QUERY}`,
    bg: 'bg-[#1B9AF5]',
    icon: '◈',
  },
]

export function AskAI() {
  return (
    <section className="px-4 py-24 md:py-32 border-b-4 border-black" aria-label="Ask AI about Tempo">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-tempo-card border-3 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#000] text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{
            type: 'spring',
            stiffness: m.spring.gentle.stiffness,
            damping: m.spring.gentle.damping,
          }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[40px] font-extrabold text-black tracking-[-0.02em] leading-[1.1] mb-4">
            Still not sure Tempo is right for you?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[16px] md:text-[18px] text-tempo-secondary leading-relaxed mb-10 max-w-md mx-auto">
            Let your favorite AI do the thinking. Click a button and see what they say about Tempo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {aiProviders.map((provider, index) => (
              <motion.a
                key={provider.name}
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${provider.bg} text-white border-3 border-black px-6 py-4 w-full sm:w-auto font-[family-name:var(--font-heading)] text-[15px] font-bold shadow-[4px_4px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue inline-flex items-center justify-center gap-2`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: m.spring.snappy.stiffness,
                  damping: m.spring.snappy.damping,
                  delay: index * 0.08,
                }}
              >
                <span className="text-[18px]">{provider.icon}</span>
                {provider.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
