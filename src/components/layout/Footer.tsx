import { motion } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-padding">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left - Name & Title */}
          <div className="flex items-center gap-2 text-text-mid text-sm">
            <span className="font-heading font-semibold text-text-high">Syed Faizan Uddin</span>
            <span className="text-border">·</span>
            <span>AI Engineer</span>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-low hover:text-accent-1 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/faizansyed14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-low hover:text-accent-1 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:syedfaizanuddin.dxb@gmail.com"
              className="text-text-low hover:text-accent-1 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Right - Copyright */}
          <div className="text-text-low text-sm">
            © 2026
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
