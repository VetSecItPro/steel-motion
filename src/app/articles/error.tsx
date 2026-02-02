'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ArticlesError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-sm-text-primary mb-3">
          Failed to load articles
        </h2>
        <p className="text-sm-text-secondary mb-6">
          We had trouble loading the blog. This might be a temporary issue.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} className="bg-sm-accent-primary hover:bg-sm-accent-primary/90 text-white">
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
