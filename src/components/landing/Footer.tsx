import Link from 'next/link'

const YEAR = 2026

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-tempo-page" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-[24px] font-extrabold text-black tracking-[-0.02em] block mb-3 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              Tempo
            </Link>
            <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary leading-relaxed">
              Turn screenshots into Apple-style product videos in 60 seconds.
            </p>
          </div>

          <nav aria-label="Product links">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] uppercase text-black mb-4 block">
              Product
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#features"
                  className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Account links">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] uppercase text-black mb-4 block">
              Account
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/auth"
                  className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.08em] uppercase text-black mb-4 block">
              Get started
            </span>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center px-6 py-3 bg-tempo-yellow text-black border-3 border-black font-[family-name:var(--font-heading)] text-[15px] font-bold shadow-[3px_3px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              Get Tempo
            </Link>
          </div>
        </div>

        <div className="border-t-3 border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-tertiary">
            &copy; {YEAR} Tempo. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@tempo.video"
              className="font-[family-name:var(--font-mono)] text-[13px] text-tempo-tertiary hover:text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              hello@tempo.video
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
