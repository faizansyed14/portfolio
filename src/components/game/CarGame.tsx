import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Car, Orbit, Zap, Magnet, ChevronUp, ChevronDown, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'

// Section definitions for Warp Travel
const gameSections = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Exp' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function CarGame() {
  const [isActive, setIsActive] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [isFlashActive, setIsFlashActive] = useState(false)
  const carRef = useRef<HTMLDivElement>(null)
  
  // Physics state
  const state = useRef({
    x: window.innerWidth / 2,
    y: 100,
    rotation: 0,
    speed: 0,
    vx: 0,
    vy: 0,
    isNitro: false
  })

  // Input & Visual state
  const keys = useRef<{ [key: string]: boolean }>({})
  const requestRef = useRef<number>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Constants
  const ACCEL = 0.5
  const NITRO_ACCEL = 1.2
  const FRICTION = 0.96
  const MAX_SPEED = 14
  const NITRO_SPEED = 24
  const TURN_SPEED = 4.5
  const DEADZONE_H = 0.3 // 30% top/bottom deadzone

  // Detect Touch
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Listen for toggle event
  useEffect(() => {
    const handleToggle = () => setIsActive(prev => {
      if (!prev) {
        state.current = {
          x: window.innerWidth / 2,
          y: window.scrollY + window.innerHeight / 2,
          rotation: 0,
          speed: 0,
          vx: 0,
          vy: 0,
          isNitro: false
        }
      }
      return !prev;
    })
    window.addEventListener('toggle-game-mode', handleToggle)
    return () => window.removeEventListener('toggle-game-mode', handleToggle)
  }, [])

  // ⚡ Warp Function
  const warpTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      setIsFlashActive(true)
      const rect = el.getBoundingClientRect()
      const targetY = rect.top + window.scrollY + 100
      state.current.y = targetY
      state.current.speed = 0
      window.scrollTo({ top: targetY - window.innerHeight / 2, behavior: 'auto' })
      setTimeout(() => {
        setIsWarping(false)
        setIsFlashActive(false)
      }, 100) 
    }
  }

  useEffect(() => {
    if (isActive) document.documentElement.style.scrollBehavior = 'auto'
    else document.documentElement.style.scrollBehavior = ''

    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => { 
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
      keys.current[e.key.toLowerCase()] = true 
    }
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const update = () => {
      if (!isActive || isWarping) {
        requestRef.current = requestAnimationFrame(update)
        return
      }

      const s = state.current
      const isNitro = !!keys.current['shift']
      s.isNitro = isNitro

      // 1. Inputs & Acceleration
      const currentAccel = isNitro ? NITRO_ACCEL : ACCEL
      const currentMaxSpeed = isNitro ? NITRO_SPEED : MAX_SPEED

      if (keys.current['w'] || keys.current['arrowup']) {
        s.speed += currentAccel
      } else if (keys.current['s'] || keys.current['arrowdown']) {
        s.speed -= currentAccel / 2
      }

      // 2. Turning
      const turnFactor = Math.abs(s.speed) > 1 ? (s.speed > 0 ? 1 : -1) : (s.speed / 2.5)
      if (keys.current['a'] || keys.current['arrowleft']) s.rotation -= TURN_SPEED * turnFactor
      if (keys.current['d'] || keys.current['arrowright']) s.rotation += TURN_SPEED * turnFactor

      // 3. Apply Physics
      s.speed *= FRICTION
      if (Math.abs(s.speed) < 0.1) s.speed = 0
      if (s.speed > currentMaxSpeed) s.speed = currentMaxSpeed
      if (s.speed < -MAX_SPEED / 2) s.speed = -MAX_SPEED / 2

      const angleRad = (s.rotation - 90) * (Math.PI / 180)
      s.vx = Math.cos(angleRad) * s.speed
      s.vy = Math.sin(angleRad) * s.speed
      s.x += s.vx
      s.y += s.vy

      // 4. World Wrapping / Bounds
      if (s.x < -40) s.x = window.innerWidth + 20
      if (s.x > window.innerWidth + 40) s.x = -20
      
      const docHeight = document.documentElement.scrollHeight
      const currentH = window.innerHeight
      if (s.y < 50) s.y = 50
      if (s.y > docHeight - 50) s.y = docHeight - 50

      // 5. 🎥 Camera
      const screenY = s.y - window.scrollY
      const topThreshold = currentH * DEADZONE_H
      const bottomThreshold = currentH * (1 - DEADZONE_H)
      
      if (screenY < topThreshold && window.scrollY > 0) {
          const gap = topThreshold - screenY
          window.scrollBy(0, -gap * 0.12 - Math.abs(s.vy))
      } else if (screenY > bottomThreshold && window.scrollY < docHeight - currentH) {
          const gap = screenY - bottomThreshold
          window.scrollBy(0, gap * 0.12 + Math.abs(s.vy))
      }

      // 6. 🌀 Teleport Tunnel Collision
      const tunnelRect = { x: window.innerWidth - 180, y: currentH / 2 - 150, width: 100, height: 100 }
      const carScreenX = s.x
      const carScreenY = s.y - window.scrollY

      if (
        carScreenX > tunnelRect.x && carScreenX < tunnelRect.x + tunnelRect.width &&
        carScreenY > tunnelRect.y && carScreenY < tunnelRect.y + tunnelRect.height
      ) {
         if (!isWarping) setIsWarping(true)
      }

      // 7. Render Car 2D
      if (carRef.current) {
        carRef.current.style.transform = `translate(${s.x}px, ${s.y - window.scrollY}px) rotate(${s.rotation}deg)`
      }

      requestRef.current = requestAnimationFrame(update)
    }

    requestRef.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isActive, isWarping])

  if (!isActive) return null

  // 🕹️ Helper to handle mobile arrow pressure
  const updateKey = (key: string, pressed: boolean) => {
    keys.current[key] = pressed
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none">
      
      {/* 🌀 TELEPORT TUNNEL */}
      <div className="absolute right-12 top-1/2 -translate-y-48 w-32 h-32 flex items-center justify-center pointer-events-none z-[115]">
        <div className="relative w-full h-full">
           <motion.div
             animate={{ borderColor: ['var(--accent-1)', 'rgba(255,255,255,0.8)', 'var(--accent-1)'], boxShadow: ['0 0 30px var(--accent-glow)', '0 0 60px var(--accent-glow)', '0 0 30px var(--accent-glow)'] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 border-4 border-b-0 rounded-t-full opacity-60"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <Magnet className="w-10 h-10 text-accent-1 animate-bounce" />
              <div className="text-[10px] font-mono font-bold text-accent-1 whitespace-nowrap bg-bg-void/80 px-3 py-1.5 rounded-full border border-accent-1/20 shadow-lg">
                 TELEPORT TUNNEL
              </div>
           </div>
        </div>
      </div>

      {/* 🏎️ CAR SPRITE */}
      <div ref={carRef} className="absolute w-12 h-16 -ml-6 -mt-8 flex items-center justify-center pointer-events-none z-[111]" style={{ transform: 'translate(-100px, -100px)' }}>
        <div className="relative w-full h-full">
           <div className="absolute inset-x-2 bottom-1 h-3 bg-black/40 blur-md rounded-full" />
           <motion.div 
             className={`${state.current.isNitro ? 'bg-white shadow-[0_0_30px_#fff]' : 'bg-accent-1'} w-full h-full rounded-lg border-2 border-white/20 shadow-lg relative overflow-hidden transition-colors duration-300`}
             animate={{ scale: state.current.isNitro ? [1, 1.15, 1] : [1, 1.02, 1] }}
             transition={{ duration: 0.15, repeat: Infinity }}
           >
              <div className="absolute top-2 inset-x-2 h-4 bg-bg-void/40 rounded-sm" />
              <div className="absolute top-0 left-1 w-2 h-1 bg-yellow-200 blur-[2px]" />
              <div className="absolute top-0 right-1 w-2 h-1 bg-yellow-200 blur-[2px]" />
           </motion.div>
           {state.current.isNitro && (
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div key={i} className="w-2 h-10 bg-gradient-to-t from-transparent via-cyan-400 to-white rounded-full blur-sm" animate={{ y: [0, 15], opacity: [0.8, 0] }} transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.03 }} />
                ))}
             </div>
           )}
        </div>
      </div>

      {/* 🚀 NITRO LINES */}
      {state.current.isNitro && state.current.speed > 10 && (
         <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(25)].map((_, i) => (
               <motion.div key={i} initial={{ opacity: 0, y: -200 }} animate={{ opacity: [0, 0.6, 0], y: window.innerHeight + 200 }} transition={{ duration: 0.3, repeat: Infinity, delay: Math.random() * 0.3 }} className="absolute w-px h-64 bg-accent-1" style={{ left: `${Math.random() * 100}%` }} />
            ))}
         </div>
      )}

      {/* 🕹️ MOBILE ARROW CONTROLS (Small & Minimal) */}
      <div className="absolute inset-x-0 bottom-10 z-[160] px-10 flex items-end justify-between pointer-events-none md:hidden">
         {/* D-PAD (L/R/U/D Arrows) */}
         <div className="grid grid-cols-3 gap-2 pointer-events-auto">
            <div />
            <MobileButton icon={<ChevronUp />} onPress={(p) => updateKey('w', p)} />
            <div />
            <MobileButton icon={<ChevronLeft />} onPress={(p) => updateKey('a', p)} />
            <MobileButton icon={<ChevronDown />} onPress={(p) => updateKey('s', p)} />
            <MobileButton icon={<ChevronRightIcon />} onPress={(p) => updateKey('d', p)} />
         </div>

         {/* NITRO ICON */}
         <button 
           className={`w-16 h-16 rounded-3xl border-2 border-accent-1/40 flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all ${keys.current['shift'] ? 'bg-accent-1' : 'bg-white/5'}`}
           onTouchStart={() => updateKey('shift', true)}
           onTouchEnd={() => updateKey('shift', false)}
         >
            <Zap className={`w-8 h-8 ${keys.current['shift'] ? 'text-bg-void' : 'text-accent-1'}`} />
         </button>
      </div>

      {/* 🔮 WARP MENU */}
      <AnimatePresence>
        {isWarping && (
          <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(15px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} className="absolute inset-0 bg-bg-void/40 pointer-events-auto z-[200] flex items-center justify-center p-4">
             <motion.div 
               initial={{ scale: 0.8, y: 50 }} 
               animate={{ scale: 1, y: 0 }} 
               className="bg-bg-card border-2 border-accent-1/40 p-8 rounded-[40px] shadow-[0_0_100px_var(--accent-glow)] max-w-xl w-full text-text-high"
             >
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="bg-accent-1 p-3 rounded-2xl shadow-lg shadow-accent-1/20"><Orbit className="w-8 h-8 text-bg-void animate-spin" /></div>
                      <h3 className="text-3xl font-display font-black tracking-tighter uppercase italic text-text-high">Fast Travel</h3>
                   </div>
                   <button onClick={() => setIsWarping(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-colors border border-white/5"><X className="w-6 h-6 text-text-low"/></button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
                   {gameSections.map((sec) => (
                     <button key={sec.id} onClick={() => warpTo(sec.id)} className="group relative flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:border-accent-1 hover:bg-accent-1/10 transition-all text-left overflow-hidden bg-bg-elevated/50">
                       <div className="relative z-10 w-full"><span className="text-[10px] font-mono text-accent-1/60 uppercase block mb-1">Sector_{sec.id}</span><span className="text-xl font-display font-bold group-hover:text-accent-1 truncate block text-text-high transition-colors">{sec.label}</span></div>
                       <ChevronRightIcon className="w-5 h-5 text-accent-1 group-hover:translate-x-1 transition-all" />
                     </button>
                   ))}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💥 WARP FLASH */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-white z-[300]" 
          />
        )}
      </AnimatePresence>

      {/* 🕹️ HUD */}
      <div className={`absolute left-1/2 -translate-x-1/2 bg-bg-elevated/95 backdrop-blur-xl border border-accent-1/20 p-2 flex items-center gap-6 shadow-2xl pointer-events-auto z-[150] ${isTouchDevice ? 'top-4 rounded-xl px-4 py-2' : 'bottom-10 rounded-full px-6 py-3'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-1/10 text-accent-1"><Car className={`${isTouchDevice ? 'w-4 h-4' : 'w-6 h-6'}`} /></div>
          <div className="flex flex-col">
            <span className={`font-display font-black italic uppercase leading-none tracking-tighter text-white ${isTouchDevice ? 'text-sm' : 'text-xl'}`}>Pro Drive</span>
          </div>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex items-center gap-2">
           <span className={`font-mono font-black text-white italic ${isTouchDevice ? 'text-xl' : 'text-2xl'}`}>{Math.floor(Math.abs(state.current.speed) * 8)}</span>
           <span className="text-[10px] uppercase text-accent-1 font-black">km/h</span>
        </div>
        <button onClick={() => setIsActive(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white"><X className="w-5 h-5" /></button>
      </div>
    </div>
  )
}

function MobileButton({ icon, onPress }: { icon: React.ReactNode, onPress: (p: boolean) => void }) {
  const [isPressed, setIsPressed] = useState(false)
  
  const handlePress = (pressed: boolean) => {
    setIsPressed(pressed)
    onPress(pressed)
  }

  return (
    <button
      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-white/10 backdrop-blur-md border border-white/10 ${isPressed ? 'bg-accent-1 text-bg-void scale-90' : 'text-accent-1'}`}
      onTouchStart={() => handlePress(true)}
      onTouchEnd={() => handlePress(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {icon}
    </button>
  )
}
