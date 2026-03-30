import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { SkillChip } from '@/components/ui/SkillChip'
import { Marquee } from '@/components/ui/Marquee'
import { skillCategories, marqueeSkills } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 section-padding relative">
      <CutLine className="mb-16" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal>
          <span className="text-xs font-mono text-text-low uppercase tracking-widest mb-4 block">
            Toolkit
          </span>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-high mb-12">
            What I <span className="gradient-text">Work With</span>
          </h2>
        </SectionReveal>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <SectionReveal key={category.id} delay={0.2 + index * 0.1}>
              <motion.div
                className="glass-card rounded-xl p-6 h-full"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h3 className="font-heading font-semibold text-lg text-text-high mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillChip
                      key={skill}
                      skill={skill}
                      index={skillIndex + index * 10}
                    />
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Marquee */}
        <SectionReveal delay={0.6}>
          <div className="py-6 border-y border-border">
            <Marquee items={marqueeSkills} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
