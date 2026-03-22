'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useDevice } from '@/lib/contexts/DeviceContext'

const Spotlight = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { isDesktop } = useDevice()

  const background = useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(29, 78, 216, 0.15), transparent 80%)`

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDesktop, mouseX, mouseY])

  if (!isDesktop) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{ background }}
    />
  )
}

export default Spotlight
