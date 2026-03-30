import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-300',
        hoverEffect && 'hover:border-border-glow hover:-translate-y-1',
        className
      )}
      whileHover={hoverEffect ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
