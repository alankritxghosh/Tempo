'use client'

import { Button } from '@/components/ui/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-tempo-page flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary mb-4">
          Something went wrong
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-8">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
