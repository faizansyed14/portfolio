import { motion } from 'framer-motion'
import { Trophy, Building2, TrendingUp, Sprout, Shield, Globe } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { GlassCard } from '@/components/ui/GlassCard'
import { achievements } from '@/data/achievements'

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Building2,
  TrendingUp,
  Sprout,
  Shield,
  Globe,
}

export function Achievements() {
  return (
    <section id="achievements" className="py-24 lg:py-32 section-padding relative">
      <CutLine className="mb-16" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal id="achievements">
          <span className="text-xs font-mono text-text-low uppercase tracking-widest mb-4 block">
            Impact
          </span>
        </SectionReveal>

        <SectionReveal id="achievements" delay={0.1}>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-high mb-12">
            Credibility in <span className="gradient-text">Numbers</span>
          </h2>
        </SectionReveal>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon]

            return (
              <SectionReveal id="achievements" key={achievement.id} delay={0.2 + index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <GlassCard className="h-full flex flex-col items-center text-center p-6">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-accent-1/10 flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-accent-1" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-lg text-text-high mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-text-mid text-sm">{achievement.description}</p>
                  </GlassCard>
                </motion.div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
