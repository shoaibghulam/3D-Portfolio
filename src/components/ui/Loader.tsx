import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

export function Loader() {
  const { progress, active } = useProgress()
  const [done, setDone] = useState(false)

  // Fade out shortly after loading settles (also covers scenes with
  // nothing to track, where progress never reaches 100).
  useEffect(() => {
    if (!active) {
      const id = setTimeout(() => setDone(true), progress >= 100 ? 400 : 1600)
      return () => clearTimeout(id)
    }
  }, [active, progress])

  // Mount-only safety net: never trap the user on the loader.
  useEffect(() => {
    const failSafe = setTimeout(() => setDone(true), 7000)
    return () => clearTimeout(failSafe)
  }, [])

  return (
    <div className="loader" data-done={done} aria-hidden={done} role="status">
      <div className="loader-inner">
        <div>Initializing universe</div>
        <div
          className="loader-bar"
          role="progressbar"
          aria-label="Loading 3D scene"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${Math.max(12, progress)}%` }} />
        </div>
      </div>
    </div>
  )
}
