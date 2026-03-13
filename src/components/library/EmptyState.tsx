import { Skeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
      </div>
      <p className="font-[family-name:var(--font-body)] text-[16px] text-tempo-secondary">
        Your first video will appear here.
      </p>
      <Link href="/upload">
        <Button>Create a video</Button>
      </Link>
    </div>
  )
}
