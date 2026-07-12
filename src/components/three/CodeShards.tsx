import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

type Shard = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  kind: 'octahedron' | 'tetrahedron' | 'torus'
}

/** Deterministic pseudo-random so the field is stable between renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeShards(count: number): Shard[] {
  const rand = mulberry32(20260712)
  const kinds: Shard['kind'][] = ['octahedron', 'tetrahedron', 'torus']
  const colors = ['#8b5cf6', '#22d3ee', '#a78bfa', '#67e8f9']
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.8
    const radius = 4.5 + rand() * 3.5
    return {
      position: [
        Math.cos(angle) * radius,
        (rand() - 0.5) * 5,
        Math.sin(angle) * radius * 0.7,
      ] as [number, number, number],
      rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as [number, number, number],
      scale: 0.25 + rand() * 0.5,
      color: colors[Math.floor(rand() * colors.length)],
      kind: kinds[Math.floor(rand() * kinds.length)],
    }
  })
}

/**
 * A loose asteroid field of wireframe geometry — ambient depth around the
 * Projects section, collapsed elsewhere.
 */
export function CodeShards({ reducedMotion, mobile }: { reducedMotion: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null)
  const scale = useRef(0.001)
  const shards = useMemo(() => makeShards(mobile ? 6 : 10), [mobile])

  useFrame((_, delta) => {
    if (!group.current) return
    const proximity = Math.max(0, 1 - Math.abs(scrollStore.page - 5) * 1.1)
    const target = 0.001 + proximity
    scale.current = THREE.MathUtils.damp(scale.current, target, 1 / 0.35, delta)
    group.current.scale.setScalar(scale.current)
    group.current.visible = scale.current > 0.04
    if (!reducedMotion) group.current.rotation.y += delta * 0.02
  })

  return (
    <group ref={group} scale={0.001}>
      {shards.map((shard, i) => (
        <Float
          key={i}
          speed={reducedMotion ? 0 : 1.4}
          rotationIntensity={reducedMotion ? 0 : 0.8}
          floatIntensity={reducedMotion ? 0 : 1.2}
        >
          <mesh position={shard.position} rotation={shard.rotation} scale={shard.scale}>
            {shard.kind === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {shard.kind === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
            {shard.kind === 'torus' && <torusGeometry args={[0.8, 0.25, 8, 24]} />}
            <meshBasicMaterial color={shard.color} wireframe transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
