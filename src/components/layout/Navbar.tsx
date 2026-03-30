import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Car } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-bg-void/85 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="section-padding">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'
              }`}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
              className="font-display font-bold text-xl text-text-high flex items-center"
            >
              Faizan
              <span className="w-1.5 h-1.5 bg-accent-1 rounded-full ml-0.5" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative text-sm font-body transition-colors duration-300 ${activeSection === link.id
                    ? 'text-text-high'
                    : 'text-text-mid hover:text-text-high'
                    }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent-1 rounded-full"
                      layoutId="navIndicator"
                      style={{ translateX: '-50%' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <ThemeToggle />
              <button
                onClick={() => window.dispatchEvent(new Event('toggle-game-mode'))}
                className="p-2 text-text-low hover:text-accent-1 transition-colors group"
                aria-label="Enter Drive Mode"
                title="Enter Drive Mode"
              >
                <Car className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-outline text-sm flex items-center gap-2 group"
              >
                Hire Me
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                className="p-2 text-text-high"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-bg-void/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-0 right-0 section-padding"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="glass-card rounded-xl p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left py-3 text-lg font-body ${activeSection === link.id ? 'text-accent-1' : 'text-text-high'
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="w-full btn-primary mt-4 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                >
                  Hire Me
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    window.dispatchEvent(new Event('toggle-game-mode'));
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-outline mt-2 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.05 }}
                >
                  <Car className="w-4 h-4" />
                  Drive Mode
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
