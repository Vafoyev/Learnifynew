import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useAppStore } from '../store/useAppStore'

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)
  const { theme } = useAppStore()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  const isDark = theme === 'dark'
  const particleColors = isDark ? ['#00f0ff', '#a855f7', '#3b82f6'] : ['#818cf8', '#a78bfa', '#60a5fa']
  const linkColor = isDark ? '#00f0ff' : '#818cf8'

  return (
    <Particles
      id="tsparticles"
      key={theme}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            resize: { enable: true } as any,
          },
          modes: {
            grab: { distance: 180, links: { opacity: isDark ? 0.4 : 0.2 } },
          },
        },
        particles: {
          color: { value: particleColors },
          links: {
            color: linkColor,
            distance: 160,
            enable: true,
            opacity: isDark ? 0.12 : 0.08,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none' as const,
            outModes: { default: 'bounce' as const },
          },
          number: {
            density: { enable: true, width: 1920, height: 1080 },
            value: isDark ? 80 : 50,
          },
          opacity: { value: { min: 0.15, max: isDark ? 0.5 : 0.3 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
