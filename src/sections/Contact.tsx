import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Linkedin, Github, Mail, Copy, Check, ArrowUpRight } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CutLine } from '@/components/ui/CutLine'
import { GlassCard } from '@/components/ui/GlassCard'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@syedfaizan.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 lg:py-32 section-padding relative">
      <CutLine className="mb-16" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <SectionReveal>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-text-high mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Real</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-text-mid text-lg mb-12 max-w-xl mx-auto">
            Open to AI consulting, enterprise product development, and high-impact
            collaborations.
          </p>
        </SectionReveal>

        {/* Main CTA Card */}
        <SectionReveal delay={0.2}>
          <GlassCard className="p-8 md:p-12 mb-8">
            <p className="text-text-high text-xl md:text-2xl mb-8 leading-relaxed">
              Have an AI project that needs to actually ship?{' '}
              <span className="text-accent-1">Let&apos;s talk.</span>
            </p>

            {/* Email with copy button */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <a
                href="mailto:hello@syedfaizan.dev"
                className="text-accent-1 font-mono text-lg hover:underline"
              >
                hello@syedfaizan.dev
              </a>
              <button
                onClick={copyEmail}
                className="p-2 text-text-low hover:text-accent-1 transition-colors"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-text-high bg-bg-elevated border border-border rounded-lg hover:border-accent-1/50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-text-high bg-bg-elevated border border-border rounded-lg hover:border-accent-1/50 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@syedfaizan.dev"
                className="inline-flex items-center gap-2 px-4 py-2 text-text-high bg-bg-elevated border border-border rounded-lg hover:border-accent-1/50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </GlassCard>
        </SectionReveal>

        {/* Location & Availability */}
        <SectionReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-mid">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-1" />
              <span>Dubai / Abu Dhabi, UAE</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Available for freelance & consulting</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
