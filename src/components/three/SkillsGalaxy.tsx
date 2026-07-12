import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'
import { galaxySkills } from '../../data/profile'

const RINGS = [
  { radius: 3.4, tilt: 0.42, speed: 0.1, color: '#e6e9f5', size: 0.3 },
  { radius: 4.5, tilt: -0.3, speed: -0.07, color: '#a78bfa', size: 0.26 },
  { radius: 5.6, tilt: 0.18, speed: 0.05, color: '#67e8f9', size: 0.23 },
]

function Ring({
  words,
  radius,
  tilt,
  speed,
  color,
  size,
  reducedMotion,
}: {
  words: string[]
  radius: number
  tilt: number
  speed: number
  color: string
  size: number
  reducedMotion: boolean
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * speed
  })

  return (
    <group rotation={[tilt, 0, tilt * 0.5]}>
      <group ref={ref}>
        {words.map((word, i) => {
          const angle = (i / words.length) * Math.PI * 2
          return (
            <Text
              key={word}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              fontSize={size}
              color={color}
              anchorX="center"
              anchorY="middle"
              fillOpacity={0.7}
            >
              {word}
            </Text>
          )
        })}
        {/* orbit guide */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.004, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.14} />
        </mesh>
      </group>
    </group>
  )
}

/**
 * Skill words orbiting the core in three tilted rings.
 * Collapsed into the core except around the Skills section, where it unfolds.
 */
export function SkillsGalaxy({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const third = Math.ceil(galaxySkills.length / 3)
  const ringWords = [
    galaxySkills.slice(0, third),
    galaxySkills.slice(third, third * 2),
    galaxySkills.slice(third * 2),
  ]

  const scale = useRef(0.001)

  useFrame((_, delta) => {
    if (!group.current) return
    const proximity = Math.max(0, 1 - Math.abs(scrollStore.page - 4) * 1.1)
    const target = 0.001 + proximity
    scale.current = THREE.MathUtils.damp(scale.current, target, 1 / 0.35, delta)
    group.current.scale.setScalar(scale.current)
    group.current.visible = scale.current > 0.04
  })

  return (
    <group ref={group} scale={0.001}>
      {RINGS.map((ring, i) => (
        <Ring key={ring.radius} words={ringWords[i]} reducedMotion={reducedMotion} {...ring} />
      ))}
    </group>
  )
}
