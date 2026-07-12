import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Experience } from './components/three/Experience'
import { Nav } from './components/ui/Nav'
import { Loader } from './components/ui/Loader'
import {
  Hero,
  Marquee,
  About,
  ExperienceSection,
  EducationSection,
  Skills,
  Work,
  Contact,
} from './components/ui/Sections'
import { installScrollTracking } from './lib/scrollStore'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useIsMobile } from './hooks/useIsMobile'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const reducedMotion = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => installScrollTracking(), [])
  useReveal()

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Loader />
      <Nav />

      <div className="webgl-stage" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 42 }}
          dpr={mobile ? [1, 1.5] : [1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Experience reducedMotion={reducedMotion} mobile={mobile} />
          </Suspense>
        </Canvas>
      </div>

      <main className="content">
        <Hero />
        <Marquee />
        <About />
        <ExperienceSection />
        <EducationSection />
        <Skills />
        <Work />
        <Contact />
      </main>
    </>
  )
}
