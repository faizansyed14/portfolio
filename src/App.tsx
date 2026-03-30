import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { GridOverlay } from '@/components/background/GridOverlay'
import { OrbGlow } from '@/components/background/OrbGlow'
import { BeamEffect } from '@/components/background/BeamEffect'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'
import { Achievements } from '@/sections/Achievements'
import { GlobalSpotlight } from '@/components/ui/GlobalSpotlight'
import { Contact } from '@/sections/Contact'

function App() {
  return (
    <main className="relative min-h-screen">
      {/* Global Cursor Following Spotlight */}
      <GlobalSpotlight />
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Background Effects */}
      <GridOverlay />
      <OrbGlow />
      <BeamEffect />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default App
