import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  // Double the items for seamless loop
  const doubledItems = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubledItems.map((item, index) => (
          <span
            key={index}
            className="mx-4 text-text-low font-mono text-sm flex items-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-1/50 mr-4" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
