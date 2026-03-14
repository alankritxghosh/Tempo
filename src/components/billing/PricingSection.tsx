'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { ProPricingCard } from './PricingCard'
import { Toast } from '@/components/ui/Toast'

export function PricingSection() {
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Free */}
        <div className="bg-tempo-card border-3 border-black p-6 flex flex-col shadow-[5px_5px_0_0_#000]">
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-tempo-secondary tracking-[0.08em] uppercase mb-3">
            Free
          </span>
          <span className="font-[family-name:var(--font-display)] text-[32px] font-extrabold text-black mb-1">
            ₹0
          </span>
          <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mb-6">
            forever
          </span>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {['1 video/month', '480p resolution', 'Tempo watermark'].map(f => (
              <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-black">
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/auth"
            className="w-full text-center py-3 border-3 border-black font-[family-name:var(--font-heading)] text-[15px] font-bold text-black bg-tempo-page shadow-[3px_3px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Get started
          </Link>
        </div>

        {/* Pro */}
        <ProPricingCard
          onSuccess={() => setToast({ message: 'Welcome to Pro!', type: 'success' })}
          onError={(msg) => setToast({ message: msg, type: 'error' })}
        />

        {/* Enterprise */}
        <div className="bg-tempo-card border-3 border-black p-6 flex flex-col shadow-[5px_5px_0_0_#000]">
          <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-tempo-secondary tracking-[0.08em] uppercase mb-3">
            Enterprise
          </span>
          <span className="font-[family-name:var(--font-display)] text-[32px] font-extrabold text-black mb-1">
            Custom
          </span>
          <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mb-6">
            talk to us
          </span>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {['Unlimited videos', '4K resolution', 'Custom branding', 'API access'].map(f => (
              <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-black">
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="mailto:hello@tempo.video"
            className="w-full text-center py-3 border-3 border-black font-[family-name:var(--font-heading)] text-[15px] font-bold text-black bg-tempo-page shadow-[3px_3px_0_0_#000] transition-all duration-100 ease-linear hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Contact sales
          </Link>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={!!toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  )
}
