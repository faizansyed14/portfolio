import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  const controls = useAnimationControls()
  const displayProjects = [...projects, ...projects, ...projects]

  useEffect(() => {
    // Standard initialization of the marquee
    controls.start({
      x: '-33.33%',
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
      },
    })
  }, [controls])

  return (
    <section id="projects" className="py-24 lg:py-32 section-padding relative overflow-hidden bg-bg-void/50 dark:bg-bg-void backdrop-blur-sm transition-colors duration-500">
      <CutLine className="mb-16" />

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="relative z-10">
            <SectionReveal id="projects">
              <span className="text-xs font-mono text-accent-1 uppercase tracking-widest mb-4 block">
                Portfolio Showcase
              </span>
            </SectionReveal>

            <SectionReveal id="projects" delay={0.1}>
              <h2 className="font-heading font-semibold text-3xl md:text-5xl lg:text-7xl text-text-high mb-6 leading-tight transition-colors">
                Things I&apos;ve <br />
                <span className="gradient-text italic font-bold">Shipped</span>
              </h2>
            </SectionReveal>
          </div>

          <div className="flex flex-col items-end gap-6 relative z-10">
            <SectionReveal delay={0.2}>
              <p className="text-text-mid text-lg max-w-sm mb-2 border-l-2 border-accent-1/20 dark:border-accent-1/10 pl-6 leading-relaxed transition-colors">
                From architectural design to production deployment—real-world AI systems built for scale.
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scroll - Draggable & Theme-Aware */}
      <div 
        className="relative w-full overflow-hidden py-10 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => {
           controls.start({
             x: '-33.33%',
             transition: { duration: 30, ease: 'linear', repeat: Infinity }
           })
        }}
      >
        {/* Dynamic theme-aware edges for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-void/100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-void/100 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={controls}
          initial={{ x: '-33.33%' }}
          drag="x"
          dragConstraints={{ left: -3000, right: 3000 }}
          onDragStart={() => controls.stop()}
          onDragEnd={() => {
            controls.start({
              x: '-33.33%',
              transition: { duration: 30, ease: 'linear', repeat: Infinity }
            })
          }}
        >
          {displayProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`} 
              className="w-[380px] md:w-[480px] shrink-0"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent-1/5 dark:bg-accent-1/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent-1/5 dark:bg-accent-1/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}
