import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export function SectionReveal({ children, className, delay = 0, id }: SectionRevealProps) {
  const [isCarInside, setIsCarInside] = useState(false)

  useEffect(() => {
    const handleCar = (e: any) => {
      if (id && e.detail.id === id) setIsCarInside(true)
      else setIsCarInside(false)
    }
    window.addEventListener('car-enter-section', handleCar)
    return () => window.removeEventListener('car-enter-section', handleCar)
  }, [id])

  return (
    <motion.div
      id={id}
      className={`${className} relative transition-all duration-500 ${isCarInside ? 'car-impact' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      animate={isCarInside ? { scale: 1.01 } : { scale: 1 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* 🚀 Interactive Glow Ring */}
      <AnimatePresence>
        {isCarInside && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute -inset-4 border-2 border-accent-1/20 rounded-[2rem] pointer-events-none z-[-1] shadow-[0_0_40px_rgba(0,212,255,0.1)]"
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  )
}
