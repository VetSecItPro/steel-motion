'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = () => {
  useEffect(() => {
    // FIX-217: Skip smooth scroll on mobile/touch devices
    // PERF: Lenis causes performance issues on mobile
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
    if (isMobile) return

    const lenis = new Lenis()
    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}

export default SmoothScroll
