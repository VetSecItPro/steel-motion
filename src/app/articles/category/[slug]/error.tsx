'use client'

import Link from 'next/link'

export default function CategoryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-sm-text-primary mb-3">Failed to load category</h2>
        <p className="text-sm-text-secondary mb-6">Something went wrong loading this category.</p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={reset} className="px-4 py-2 bg-sm-accent-primary text-white rounded-lg hover:bg-sm-accent-primary-hover transition-colors">Try Again</button>
          <Link href="/articles" className="px-4 py-2 border border-sm-border-default text-sm-text-primary rounded-lg hover:bg-sm-surface-secondary transition-colors">All Articles</Link>
        </div>
      </div>
    </div>
  )
}
