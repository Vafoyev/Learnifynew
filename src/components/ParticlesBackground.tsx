import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
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
            grab: { distance: 180, links: { opacity: 0.3 } },
          },
        },
        particles: {
          color: { value: ['#818cf8', '#a78bfa', '#c4b5fd'] },
          links: {
            color: '#a5b4fc',
            distance: 160,
            enable: true,
            opacity: 0.12,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none' as const,
            outModes: { default: 'bounce' as const },
          },
          number: {
            density: { enable: true, width: 1920, height: 1080 },
            value: 50,
          },
          opacity: { value: { min: 0.1, max: 0.35 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 2.5 } },
        },
        detectRetina: true,
      }}
    />
  )
}
