'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useDevice } from '@/lib/contexts/DeviceContext'

const CustomCursor = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 })
  const [isHovering, setIsHovering] = useState(false)
  const { isDesktop } = useDevice()

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    // FIX-202: Use event delegation instead of querying elements on mount
    // PERF: Event delegation prevents stale DOM snapshot issues
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.matches('a, button, [role="button"]') ||
        target.closest('a, button, [role="button"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isDesktop, cursorX, cursorY])

  if (!isDesktop) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white/20 pointer-events-none z-[9999]"
      style={{
        translateX: springX,
        translateY: springY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isHovering ? 0.5 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  )
}

export default CustomCursor
