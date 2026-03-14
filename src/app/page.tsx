import Link from 'next/link'
import { LandingVideo } from '@/components/LandingVideo'
import { LandingHero } from '@/components/landing/LandingHero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PricingSection } from '@/components/billing/PricingSection'
import { AccentRule } from '@/components/ui/AccentRule'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-tempo-page">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
          bg-tempo-yellow text-black px-4 py-2 border-3 border-black
          font-[family-name:var(--font-body)] text-[15px] focus:outline-3 focus:outline-offset-3 focus:outline-tempo-blue"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <LandingHero />

        {/* Marquee */}
        <div className="bg-tempo-yellow border-b-4 border-black py-3 overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-black mx-8">
                ★ Screenshots to videos in 60 seconds
              </span>
            ))}
          </div>
        </div>

        {/* Demo */}
        <section className="px-4 py-16 md:py-24 border-b-4 border-black" aria-label="Product demo">
          <div className="max-w-[960px] mx-auto">
            <LandingVideo />
          </div>
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* Pricing */}
        <section className="px-4 py-24 md:py-32 border-b-4 border-black" id="pricing" aria-label="Pricing">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-12 md:mb-16">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-extrabold text-black tracking-[-0.02em] leading-[1.05] text-center mb-4">
                Simple pricing
              </h2>
              <AccentRule />
            </div>
            <PricingSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-black px-4 py-8 bg-tempo-page" role="contentinfo">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-display)] text-[18px] font-extrabold text-black">
            Tempo
          </span>
          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            <Link
              href="/auth"
              className="font-[family-name:var(--font-body)] text-[14px] text-black hover:underline focus:outline-3 focus:outline-offset-3 focus:outline-tempo-blue"
            >
              Sign in
            </Link>
            <Link
              href="#pricing"
              className="font-[family-name:var(--font-body)] text-[14px] text-black hover:underline focus:outline-3 focus:outline-offset-3 focus:outline-tempo-blue"
            >
              Pricing
            </Link>
          </nav>
          <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-secondary">
            &copy; {new Date().getFullYear()} Tempo
          </span>
        </div>
      </footer>
    </div>
  )
}
