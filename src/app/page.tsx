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
          bg-tempo-accent text-white px-4 py-2 rounded-[var(--radius-button)]
          font-[family-name:var(--font-body)] text-[15px] focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <LandingHero />

        {/* Demo */}
        <section className="px-4 pb-16 md:pb-24" aria-label="Product demo">
          <div className="max-w-[960px] mx-auto">
            <LandingVideo />
          </div>
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* Pricing */}
        <section className="px-4 pb-24 md:pb-32" id="pricing" aria-label="Pricing">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-12 md:mb-16">
              <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[56px] font-bold text-tempo-primary tracking-[-0.02em] leading-[1.05] text-center mb-4">
                Simple pricing
              </h2>
              <AccentRule />
            </div>
            <PricingSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-tempo-border px-4 py-8" role="contentinfo">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-display)] text-[16px] font-bold text-tempo-primary">
            Tempo
          </span>
          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            <Link
              href="/auth"
              className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-tempo-primary focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent rounded"
            >
              Sign in
            </Link>
            <Link
              href="#pricing"
              className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-tempo-primary focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent rounded"
            >
              Pricing
            </Link>
          </nav>
          <span className="font-[family-name:var(--font-body)] text-[13px] text-tempo-tertiary">
            © {new Date().getFullYear()} Tempo
          </span>
        </div>
      </footer>
    </div>
  )
}
