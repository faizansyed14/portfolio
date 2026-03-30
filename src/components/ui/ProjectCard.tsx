import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const background = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(0, 212, 255, 0.08), transparent 50%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative glass-card rounded-xl p-6 overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-60" />
          </div>
        )}

        {/* Category badge */}
        <span className="inline-block px-2 py-1 text-xs font-mono text-text-low bg-bg-elevated rounded mb-4">
          {project.categoryLabel}
        </span>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl text-text-high mb-2 flex items-center gap-2">
          {project.title}
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ArrowUpRight className="w-5 h-5 text-accent-1" />
          </motion.span>
        </h3>

        {/* Impact */}
        <p className="text-text-mid text-sm mb-4 line-clamp-2">{project.impact}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-text-low px-2 py-0.5 border border-border rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stat */}
        {project.stat && (
          <div className="pt-4 border-t border-border">
            <span className="text-accent-1 font-heading font-semibold text-lg">
              {project.stat}
            </span>
            {project.statLabel && (
              <span className="text-text-low text-sm ml-2">{project.statLabel}</span>
            )}
          </div>
        )}
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? 'inset 0 0 0 1px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.1)'
            : 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
