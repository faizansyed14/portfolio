import { motion } from 'framer-motion'

export function BeamEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.4) 50%, transparent 100%)`,
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
        }}
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
