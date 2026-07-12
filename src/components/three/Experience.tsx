import { Suspense } from 'react'
import { Grid, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { CameraRig } from './CameraRig'
import { NeuralCore } from './NeuralCore'
import { Starfield } from './Starfield'
import { SkillsGalaxy } from './SkillsGalaxy'
import { CodeShards } from './CodeShards'

export function Experience({
  reducedMotion,
  mobile,
}: {
  reducedMotion: boolean
  mobile: boolean
}) {
  return (
    <>
      <color attach="background" args={['#05060f']} />
      <fog attach="fog" args={['#05060f', 14, 42]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[6, 5, 6]} intensity={90} color="#8b5cf6" />
      <pointLight position={[-6, -4, 4]} intensity={60} color="#22d3ee" />

      <CameraRig reducedMotion={reducedMotion} />
      <Starfield reducedMotion={reducedMotion} mobile={mobile} />
      <NeuralCore reducedMotion={reducedMotion} mobile={mobile} />
      <Suspense fallback={null}>
        <SkillsGalaxy reducedMotion={reducedMotion} />
      </Suspense>
      <CodeShards reducedMotion={reducedMotion} mobile={mobile} />

      <Grid
        position={[0, -4.2, 0]}
        args={[60, 60]}
        cellSize={1.2}
        cellThickness={0.4}
        cellColor="#1c1f3a"
        sectionSize={6}
        sectionThickness={0.8}
        sectionColor="#3b2d6e"
        fadeDistance={34}
        fadeStrength={2}
        infiniteGrid
      />

      {!mobile && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.35} luminanceSmoothing={0.6} />
          <Vignette eskil={false} offset={0.22} darkness={0.85} />
        </EffectComposer>
      )}

      <Preload all />
    </>
  )
}
