'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDevice } from '@/lib/contexts/DeviceContext'

const Spotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { isDesktop } = useDevice()

  useEffect(() => {
    if (!isDesktop) return

    // PERF: Independent mouse tracking — FIX-203 (acceptable, components render independently)
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDesktop])

  if (!isDesktop) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  )
}

export default Spotlight
