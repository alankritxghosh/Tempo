import { Navbar } from '@/components/landing/Navbar'
import { LandingHero } from '@/components/landing/LandingHero'
import { BeforeAfter } from '@/components/landing/BeforeAfter'
import { SocialProof } from '@/components/landing/SocialProof'
import { SpeedStats } from '@/components/landing/SpeedStats'
import { UseCaseTabs } from '@/components/landing/UseCaseTabs'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PricingSection } from '@/components/billing/PricingSection'
import { Testimonials } from '@/components/landing/Testimonials'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { AskAI } from '@/components/landing/AskAI'
import { Footer } from '@/components/landing/Footer'
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

      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <LandingHero />

        {/* 2. Marquee */}
        <div className="bg-tempo-yellow border-b-4 border-black py-3 overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-black mx-8">
                ★ Screenshots to videos in 60 seconds
              </span>
            ))}
          </div>
        </div>

        {/* 3. Before/After Showcase */}
        <BeforeAfter />

        {/* 4. Social Proof Strip */}
        <SocialProof />

        {/* 5. Speed/Stats */}
        <SpeedStats />

        {/* 6. Use Case Tabs */}
        <UseCaseTabs />

        {/* 7. Feature Grid */}
        <FeatureGrid />

        {/* 8. How It Works */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* 9. Pricing */}
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

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. Final CTA */}
        <FinalCTA />

        {/* 12. Ask AI */}
        <AskAI />
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  )
}
