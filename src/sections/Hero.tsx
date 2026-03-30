import { useEffect, useState } from 'react'
import { motion, useTime, useTransform, useScroll, useSpring } from 'framer-motion'
import { MapPin, ArrowDown, Linkedin, Github, Mail, Hexagon, Sparkles } from 'lucide-react'

const titles = ['AI Engineer', 'LLM Systems', 'RAG', 'Agentic AI']

export function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const [isGameActive, setIsGameActive] = useState(false)

  useEffect(() => {
    const handleGameMode = () => setIsGameActive(prev => !prev)
    window.addEventListener('toggle-game-mode', handleGameMode)
    return () => window.removeEventListener('toggle-game-mode', handleGameMode)
  }, [])

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 80)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentTitleIndex])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const fullName = "Syed Faizan Uddin"

  const { scrollYProgress } = useScroll()

  // Apply a physics spring to the scroll progress for ultra-smooth buttery motion
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 80,
    mass: 0.5
  })

  // 19 keyframes for continuous zigzag projectile arcs down the page
  const tVals = [0, 0.05, 0.12, 0.15, 0.22, 0.29, 0.32, 0.39, 0.46, 0.49, 0.56, 0.63, 0.66, 0.73, 0.80, 0.83, 0.90, 0.97, 1.0]

  // X goes back and forth: left -> right -> left ...
  const xVals = ["15vw", "40vw", "85vw", "85vw", "45vw", "5vw", "5vw", "45vw", "85vw", "85vw", "45vw", "5vw", "5vw", "45vw", "85vw", "85vw", "45vw", "5vw", "50vw"]

  // Y simulates arcs: UP (20/30vh) to DOWN (80vh corner)
  const yVals = ["45vh", "20vh", "80vh", "80vh", "30vh", "80vh", "80vh", "30vh", "80vh", "80vh", "30vh", "80vh", "80vh", "30vh", "80vh", "80vh", "30vh", "80vh", "50vh"]

  // Rotates dynamically based on slope: 45(up-right)->90(peak)->135(diving)->315(turned up-left)->etc
  const rVals = [45, 90, 135, 315, 270, 225, 45, 90, 135, 315, 270, 225, 45, 90, 135, 315, 270, 225, 0]

  // Scale dynamically changes: comes closer to camera (1.0) at the corners, farther away (0.5) at high peaks
  const sVals = [0.8, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 1.0, 1.5]

  // Opacity dynamically changes: transparent in the middle (0.15) to not block text, solid (1.0) in the corners
  const oVals = [1.0, 0.15, 1.0, 1.0, 0.15, 1.0, 1.0, 0.15, 1.0, 1.0, 0.15, 1.0, 1.0, 0.15, 1.0, 1.0, 0.15, 1.0, 0.8]

  const rocketX = useTransform(smoothProgress, tVals, xVals)
  const rocketY = useTransform(smoothProgress, tVals, yVals)
  const rocketRotate = useTransform(smoothProgress, tVals, rVals)
  const rocketScale = useTransform(smoothProgress, tVals, sVals)
  const rocketOpacity = useTransform(smoothProgress, tVals, oVals)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding pt-20 overflow-hidden bg-bg-void transition-colors duration-500"
    >
      {/* Global Animated Rocket attached to viewport */}
      {!isGameActive && (
        <motion.img
          src="/projects/rocket.png"
          alt="Rocket"
          className="fixed z-50 w-20 object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]"
          style={{
            x: rocketX,
            y: rocketY,
            rotate: rocketRotate,
            scale: rocketScale,
            opacity: rocketOpacity,
            top: 0,
            left: 0
          }}
        />
      )}

      {/* Background Video - Merging Area (Pushed Right) */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[40%] h-[70%] z-0 pointer-events-none hidden lg:flex items-center justify-end">
        <div className="relative w-full aspect-square overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100 dark:opacity-80"
          >
            <source src="/projects/bg-video2.mp4" type="video/mp4" />
          </video>
          {/* Targeted theme-aware gradients for visibility */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-void via-bg-void/40 to-transparent opacity-100" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-void via-transparent to-transparent opacity-100" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-void via-transparent to-transparent opacity-100" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg-void via-transparent to-transparent opacity-100" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column - Name and Intro */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 text-left"
          >
            {/* Location Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono text-text-mid bg-white/50 backdrop-blur-sm border border-border/50 rounded-full">
                <MapPin className="w-4 h-4 text-accent-1" />
                Abu Dhabi, UAE
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-text-mid text-lg mb-2 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-accent-1 opacity-50" />
              Hey, I&apos;m
            </motion.p>

            {/* Name - Exploding Char Animation */}
            <motion.div className="flex items-center gap-6 mb-8 flex-wrap" variants={itemVariants}>
              <div className="flex flex-wrap items-center gap-x-[0.2em]">
                {fullName.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="flex overflow-visible mr-4">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        className="font-display font-extrabold text-5xl md:text-6xl text-text-high inline-block relative"
                        initial={{
                          opacity: 0,
                          x: wordIndex % 2 === 0 ? -150 : 300,
                          y: wordIndex % 3 === 0 ? 200 : -150,
                          scale: 0.5,
                          rotate: Math.random() * 90 - 45
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                          color: ['#0f172a', '#0369a1', '#0f172a']
                        }}
                        whileHover={{ scale: 1.2, color: '#0369a1', zIndex: 10 }}
                        transition={{
                          color: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                          default: {
                            duration: 1.2,
                            delay: 0.5 + (wordIndex * 0.1) + (charIndex * 0.05),
                            type: 'spring',
                            stiffness: 100,
                            damping: 15
                          }
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>

              {/* Profile Image with Pulsing Glow */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-accent-1/20 rounded-2xl blur-xl"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="relative w-28 h-24 md:w-30 md:h-30 rounded-[2rem] overflow-visible border-2 border-accent-1/50 shadow-[0_0_30px_rgba(0,212,255,0.2)] bg-white/10 dark:bg-bg-card/50 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: [0, -10, 0]
                  }}
                  transition={{
                    delay: 1.5,
                    type: 'spring',
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {!isGameActive && (
                    <img
                      src="/projects/rocket-boy.png"
                      alt="Syed Faizan Uddin"
                      className="w-[140%] h-[140%] max-w-none object-contain absolute -top-[20%] -left-[20%] drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] pointer-events-none"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://ui-avatars.com/api/?name=Faizan&background=00d4ff&color=fff&size=200";
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Typewriter Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-2xl text-accent-1 font-mono font-bold tracking-wider">
                &gt; {displayText}
                <motion.span
                  className="inline-block w-1.5 h-[1.1em] bg-accent-1 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-text-mid text-lg max-w-sm mb-10 leading-relaxed border-l-2 border-accent-1/20 pl-4"
            >
              Architecting production-ready AI systems with cutting-edge LLM tech.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Experience
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-outline flex items-center gap-2 group border-accent-1/30"
              >
                Inquire Now
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <div className="h-px w-12 bg-border/50" />
              <div className="flex items-center gap-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/syed-faizan-uddin-563187225/' },
                  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/faizansyed14' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:syedfaizanuddin.dxb@gmail.com' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="text-text-low hover:text-accent-1 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Column - Technical Orbits (Animated) */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative pr-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {/* Orbits Container - Scaled Down */}
            <div className="relative w-[320px] h-[320px]">
              {/* Outer Pulsing Orbits */}
              {[1, 1.4, 1.8].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-accent-1/5"
                  initial={{ scale: scale * 0.8, opacity: 0 }}
                  animate={{
                    scale: [scale, scale * 1.05, scale],
                    opacity: 1
                  }}
                  transition={{
                    duration: 4,
                    delay: 0.6 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Central Glowing Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-accent-1/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-16 h-16 relative z-10"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Hexagon className="w-full h-full text-accent-1/20 stroke-[1.5] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]" />
                  </motion.div>
                </div>
              </div>

              {/* Orbital Tech Elements - Reduced Radii */}
              <OrbitalLink label="LLMs" speed={40} radius={100} offset={0} />
              <OrbitalLink label="RAG" speed={45} radius={140} offset={90} />
              <OrbitalLink label="LangChain" speed={35} radius={100} offset={180} />
              <OrbitalLink label="Docker" speed={50} radius={140} offset={270} />

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-1/5 rounded-full blur-[80px]" />
            </div>
          </motion.div>

          {/* Right Column - Visual Spacer */}
          <div className="hidden lg:block h-full" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-7 h-12 border-2 border-accent-1/20 rounded-full flex justify-center pt-2 backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 bg-accent-1 rounded-full"
              animate={{ opacity: [1, 0.2, 1], scaleY: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function OrbitalLink({ label, speed, radius, offset }: { label: string, speed: number, radius: number, offset: number }) {
  const time = useTime()

  // Create rotation movement
  const angle = useTransform(time, (t) => {
    return (t / speed + offset) % 360
  })

  // Calculate coordinates
  const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * radius)
  const y = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radius)

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style={{ x, y }}
    >
      <motion.div
        className="px-4 py-1.5 bg-white/80 backdrop-blur-md border border-accent-1/20 rounded-lg shadow-[0_5px_15px_-5px_rgba(0,212,255,0.3)] whitespace-nowrap"
        whileHover={{ scale: 1.1, borderColor: '#0369a1', zIndex: 50 }}
      >
        <span className="text-sm font-mono font-semibold text-text-high tracking-tight">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
