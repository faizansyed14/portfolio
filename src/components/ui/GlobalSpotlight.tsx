import { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export function GlobalSpotlight() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const background = useMotionTemplate`radial-gradient(1200px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.05), transparent 80%)`

  if (!mounted) return null

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background }}
    />
  )
}
