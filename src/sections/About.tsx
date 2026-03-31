import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { GlassCard } from '@/components/ui/GlassCard'

const stats = [
  { value: 2, suffix: '+', label: 'Years', sublabel: 'in AI' },
  { value: 6, suffix: '+', label: 'Enterprise', sublabel: 'Products' },
  { value: 40, suffix: '%', label: 'Engagement', sublabel: 'Uplift' },
  { value: 92.53, suffix: '%', label: 'CNN Model', sublabel: 'Accuracy', decimals: 2 },
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 section-padding relative">
      <CutLine className="mb-16" />

      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <SectionReveal id="about">
          <span className="text-xs font-mono text-text-low uppercase tracking-widest mb-4 block">
            About
          </span>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Narrative */}
          <div>
            <SectionReveal id="about" delay={0.1}>
              <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-high mb-8">
                Building AI That{' '}
                <span className="gradient-text">Ships</span>
              </h2>
            </SectionReveal>

            <div className="space-y-6">
              <SectionReveal delay={0.2}>
                <p className="text-text-mid text-lg leading-relaxed">
                  Most AI projects die in notebooks. I build the ones that survive the
                  transition to production — systems that handle real data, real users,
                  and real business pressure.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <p className="text-text-mid leading-relaxed">
                  With a background spanning DevOps, cloud infrastructure, and applied
                  AI, I approach every project as both an engineer and a product thinker.
                  The goal isn&apos;t just a working model — it&apos;s a system your team
                  can trust.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <p className="text-text-mid leading-relaxed">
                  Currently at Alpha Data, I&apos;m shipping enterprise AI products across
                  the UAE — from intelligent document extraction to natural language
                  database interfaces. Every project is built to be secure, scalable, and
                  actually useful.
                </p>
              </SectionReveal>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <SectionReveal key={stat.label} delay={0.2 + index * 0.1}>
                <GlassCard className="h-full flex flex-col justify-center items-center text-center p-6">
                  <motion.div
                    className="font-display font-bold text-4xl md:text-5xl text-accent-1 mb-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </motion.div>
                  <span className="font-heading font-medium text-text-high">
                    {stat.label}
                  </span>
                  <span className="text-text-low text-sm">{stat.sublabel}</span>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
