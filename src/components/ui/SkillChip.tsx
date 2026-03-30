import { motion } from 'framer-motion'

interface SkillChipProps {
  skill: string
  index: number
}

export function SkillChip({ skill, index }: SkillChipProps) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1.5 text-sm font-mono text-text-mid bg-bg-elevated border border-border rounded-lg cursor-default transition-all duration-300 hover:border-accent-1/50 hover:text-text-high"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{ scale: 1.08 }}
    >
      {skill}
    </motion.span>
  )
}
