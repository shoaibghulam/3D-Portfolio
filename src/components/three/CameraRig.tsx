import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'
import { scrollStore } from '../../lib/scrollStore'

type Keyframe = { pos: THREE.Vector3; look: THREE.Vector3 }

const kf = (px: number, py: number, pz: number, lx: number, ly: number, lz: number): Keyframe => ({
  pos: new THREE.Vector3(px, py, pz),
  look: new THREE.Vector3(lx, ly, lz),
})

/** One keyframe per section: hero, about, experience, education, skills, projects, contact. */
const KEYFRAMES: Keyframe[] = [
  kf(0, 0, 9.5, -1.7, 0.1, 0),
  kf(3.2, 1.6, 7.8, -2.5, -0.1, 0),
  kf(-3.4, 1.0, 8.0, 1.9, 0.2, 0),
  kf(0, 4.5, 8.0, 0, -0.5, 0),
  kf(0, 3.6, 8.6, 0, -0.3, 0),
  kf(-4.2, -1.4, 8.5, 1.8, 0.5, 0),
  kf(0, 1.2, 9.2, 0, 1.05, 0),
]

const smoothstep = (t: number) => t * t * (3 - 2 * t)

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const targetPos = useRef(new THREE.Vector3())
  const targetLook = useRef(new THREE.Vector3())
  const currentLook = useRef(new THREE.Vector3(-1.6, 0.1, 0))

  useFrame((state, delta) => {
    const page = scrollStore.page
    const i = Math.min(KEYFRAMES.length - 2, Math.floor(page))
    const t = smoothstep(page - i)

    targetPos.current.lerpVectors(KEYFRAMES[i].pos, KEYFRAMES[i + 1].pos, t)
    targetLook.current.lerpVectors(KEYFRAMES[i].look, KEYFRAMES[i + 1].look, t)

    if (!reducedMotion) {
      targetPos.current.x += state.pointer.x * 0.5
      targetPos.current.y += state.pointer.y * 0.35
    }

    const smoothing = reducedMotion ? 0.05 : 0.35
    easing.damp3(state.camera.position, targetPos.current, smoothing, delta)
    easing.damp3(currentLook.current, targetLook.current, smoothing, delta)
    state.camera.lookAt(currentLook.current)
  })

  return null
}
