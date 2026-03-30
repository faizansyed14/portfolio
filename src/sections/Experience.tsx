import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { GlassCard } from '@/components/ui/GlassCard'
import { experiences } from '@/data/experience'

function TimelineLine() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
      <motion.div
        className="w-full bg-gradient-to-b from-accent-1 via-accent-2 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isInView ? 1 : 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: 'top', height: '100%' }}
      />
    </div>
  )
}

function TimelineNode({ index }: { index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-void border-2 border-accent-1 z-10"
      initial={{ scale: 0 }}
      animate={{ scale: isInView ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-accent-1"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 section-padding relative">
      <CutLine className="mb-16" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionReveal>
          <span className="text-xs font-mono text-text-low uppercase tracking-widest mb-4 block">
            Career
          </span>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-high mb-16">
            Where I&apos;ve <span className="gradient-text">Built</span>
          </h2>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          <TimelineLine />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <TimelineNode index={index} />

                <motion.div
                  className={`md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'
                  } pl-8 md:pl-0`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {/* Period Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-mono text-accent-1 bg-accent-1/10 rounded-full mb-3">
                    {index === 0 ? 'PRESENT' : exp.period.split('–')[0].trim()}
                  </span>

                  {/* Company & Role */}
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-text-high mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-accent-1 font-medium mb-2">{exp.role}</p>
                  <p className="text-text-low text-sm font-mono mb-4">
                    {exp.period} · {exp.location}
                  </p>

                  {/* Summary */}
                  <p className="text-text-mid mb-6 leading-relaxed">{exp.summary}</p>

                  {/* Projects */}
                  <div className="space-y-3">
                    {exp.projects.map((project, pIndex) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + index * 0.2 + pIndex * 0.08,
                        }}
                      >
                        <GlassCard
                          className={`p-4 ${index % 2 === 1 ? 'md:text-left' : ''}`}
                          hoverEffect={false}
                        >
                          <h4 className="font-heading font-medium text-text-high mb-1">
                            {project.name}
                          </h4>
                          <p className="text-text-mid text-sm">{project.description}</p>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
