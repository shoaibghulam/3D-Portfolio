import { useMemo, useRef, useState } from 'react'
import type { ComponentRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

/** Evenly distributed points on a sphere (fibonacci lattice) — the "neurons". */
function useNodePositions(count: number, radius: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * r * radius
      positions[i * 3 + 1] = y * radius
      positions[i * 3 + 2] = Math.sin(theta) * r * radius
    }
    return positions
  }, [count, radius])
}

export function NeuralCore({ reducedMotion, mobile }: { reducedMotion: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null)
  const outer = useRef<THREE.Mesh>(null)
  const nodes = useRef<THREE.Points>(null)
  const heart = useRef<ComponentRef<typeof MeshDistortMaterial>>(null)
  const scale = useRef(1)
  const [hovered, setHovered] = useState(false)
  const nodePositions = useNodePositions(mobile ? 90 : 160, 2.05)

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const page = scrollStore.page

    if (!reducedMotion) {
      group.current.rotation.y += delta * (hovered ? 0.28 : 0.09)
      group.current.rotation.z = Math.sin(t * 0.12) * 0.06
      if (outer.current) {
        outer.current.rotation.x += delta * 0.05
        outer.current.rotation.y -= delta * 0.07
      }
      if (nodes.current) nodes.current.rotation.y -= delta * 0.04
    }

    // Breathe on the hero, tighten while the skill galaxy owns the stage,
    // then come back as the beacon behind the contact section.
    const skillsProximity = Math.max(0, 1 - Math.abs(page - 4) * 1.4)
    const contactProximity = Math.max(0, 1 - Math.abs(page - 6) * 1.2)
    const breathe = reducedMotion ? 0 : Math.sin(t * 0.8) * 0.02
    const target =
      (1 - skillsProximity * 0.45 + contactProximity * 0.12) * (hovered ? 1.05 : 1) + breathe
    scale.current = THREE.MathUtils.damp(scale.current, target, 1 / 0.4, delta)
    group.current.scale.setScalar(scale.current)

    // Calm the molten heart behind the contact copy so text stays readable.
    if (heart.current) {
      const base = hovered ? 1.15 : 0.75
      heart.current.emissiveIntensity = base * (1 - contactProximity * 0.7)
    }
  })

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* outer wireframe shell */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.35, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.32} />
      </mesh>

      {/* fine inner lattice */}
      <mesh rotation={[0.4, 0.8, 0]}>
        <icosahedronGeometry args={[2.05, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.07} />
      </mesh>

      {/* molten distorted heart */}
      <mesh>
        <sphereGeometry args={[1.25, mobile ? 32 : 64, mobile ? 32 : 64]} />
        <MeshDistortMaterial
          ref={heart}
          color="#12081f"
          emissive="#7c3aed"
          emissiveIntensity={0.75}
          roughness={0.15}
          metalness={0.85}
          distort={reducedMotion ? 0 : hovered ? 0.5 : 0.35}
          speed={reducedMotion ? 0 : 2.2}
        />
      </mesh>

      {/* neuron nodes on the shell */}
      <points ref={nodes}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#67e8f9"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {!mobile && (
        <Sparkles count={45} scale={7} size={2.2} speed={reducedMotion ? 0 : 0.35} color="#a78bfa" opacity={0.55} />
      )}
    </group>
  )
}
