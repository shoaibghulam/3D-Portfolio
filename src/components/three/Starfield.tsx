import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function makeStars(count: number, innerRadius: number, outerRadius: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Random point in a spherical shell so stars never spawn inside the scene.
    const r = innerRadius + Math.random() * (outerRadius - innerRadius)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

function StarLayer({
  count,
  inner,
  outer,
  size,
  color,
  speed,
  reducedMotion,
}: {
  count: number
  inner: number
  outer: number
  size: number
  color: string
  speed: number
  reducedMotion: boolean
}) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => makeStars(count, inner, outer), [count, inner, outer])

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y += delta * speed
      ref.current.rotation.x += delta * speed * 0.35
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function Starfield({ reducedMotion, mobile }: { reducedMotion: boolean; mobile: boolean }) {
  const scale = mobile ? 0.45 : 1
  return (
    <group>
      <StarLayer
        count={Math.round(1800 * scale)}
        inner={18}
        outer={42}
        size={0.06}
        color="#a5b4fc"
        speed={0.008}
        reducedMotion={reducedMotion}
      />
      <StarLayer
        count={Math.round(900 * scale)}
        inner={14}
        outer={30}
        size={0.09}
        color="#67e8f9"
        speed={-0.012}
        reducedMotion={reducedMotion}
      />
    </group>
  )
}
