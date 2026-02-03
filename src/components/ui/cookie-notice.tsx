'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieNotice() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-notice-dismissed')
    if (!stored) {
      setDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('cookie-notice-dismissed', 'true')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div role="dialog" aria-label="Cookie consent notice" className="fixed bottom-0 left-0 right-0 z-50 bg-sm-surface-elevated border-t border-sm-border-default p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-sm-text-secondary text-center sm:text-left">
          This site uses functional cookies to improve your experience.{' '}
          <Link href="/privacy" className="text-sm-accent-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 px-4 py-2 bg-sm-accent-primary text-white text-sm font-medium rounded-full hover:bg-sm-accent-primary/90 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
