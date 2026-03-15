'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-tempo-page border-b-3 border-black transition-shadow duration-100 ease-linear ${scrolled ? 'shadow-[0_3px_0_0_#000]' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-[22px] font-extrabold text-black tracking-[-0.02em] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
        >
          Tempo
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-body)] text-[15px] text-black hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/auth"
            className="inline-flex items-center justify-center px-5 py-2 bg-tempo-yellow text-black border-3 border-black font-[family-name:var(--font-heading)] text-[14px] font-bold shadow-[3px_3px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
          >
            Get Tempo
          </Link>
        </div>

        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] border-3 border-black bg-tempo-page focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`w-5 h-[3px] bg-black transition-transform duration-100 ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`w-5 h-[3px] bg-black transition-opacity duration-100 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[3px] bg-black transition-transform duration-100 ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-3 border-black bg-tempo-page px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-body)] text-[16px] text-black py-2 hover:underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/auth"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center px-5 py-3 bg-tempo-yellow text-black border-3 border-black font-[family-name:var(--font-heading)] text-[15px] font-bold shadow-[3px_3px_0_0_#000] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-tempo-blue"
          >
            Get Tempo
          </Link>
        </div>
      )}
    </nav>
  )
}
