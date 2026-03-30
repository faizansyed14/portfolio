import { motion } from 'framer-motion'

interface CutLineProps {
  className?: string
}

export function CutLine({ className }: CutLineProps) {
  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-transparent via-accent-1 to-transparent ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )
}
