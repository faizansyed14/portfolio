import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const outerSpringConfig = { damping: 20, stiffness: 200 }
  const outerXSpring = useSpring(cursorX, outerSpringConfig)
  const outerYSpring = useSpring(cursorY, outerSpringConfig)

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Track hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea')
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover listeners after a short delay to ensure DOM is ready
    const timeout = setTimeout(addHoverListeners, 500)

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Inner dot - follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-1 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer ring - follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          border: '1px solid rgba(0, 212, 255, 0.5)',
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
