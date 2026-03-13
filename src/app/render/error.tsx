'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function RenderError({
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
          Render failed
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary mb-8">
          {error.message || 'Something went wrong while building your video.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Link href="/upload">
            <Button variant="ghost">Start over</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
