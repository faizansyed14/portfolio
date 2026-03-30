import { motion } from 'framer-motion'

export function OrbGlow() {
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[0]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      aria-hidden="true"
    >
      <div
        className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  )
}
