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
        <div className="bg-tempo-card border border-tempo-border rounded-[var(--radius-card)] p-6 flex flex-col">
          <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-tempo-tertiary tracking-[0.08em] uppercase mb-3">
            Free
          </span>
          <span className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary mb-1">
            ₹0
          </span>
          <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mb-6">
            forever
          </span>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {['1 video/month', '480p resolution', 'Tempo watermark'].map(f => (
              <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/auth"
            className="w-full text-center py-3 border border-tempo-border rounded-[var(--radius-button)] font-[family-name:var(--font-body)] text-[15px] text-tempo-primary hover:border-tempo-border-hover"
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
        <div className="bg-tempo-card border border-tempo-border rounded-[var(--radius-card)] p-6 flex flex-col">
          <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-tempo-tertiary tracking-[0.08em] uppercase mb-3">
            Enterprise
          </span>
          <span className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary mb-1">
            Custom
          </span>
          <span className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary mb-6">
            talk to us
          </span>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {['Unlimited videos', '4K resolution', 'Custom branding', 'API access'].map(f => (
              <li key={f} className="font-[family-name:var(--font-body)] text-[15px] text-tempo-secondary">
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="mailto:hello@tempo.video"
            className="w-full text-center py-3 border border-tempo-border rounded-[var(--radius-button)] font-[family-name:var(--font-body)] text-[15px] text-tempo-primary hover:border-tempo-border-hover"
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
