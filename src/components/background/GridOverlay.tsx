import { motion } from 'framer-motion'

export function GridOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.1 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-overlay" />
    </motion.div>
  )
}
