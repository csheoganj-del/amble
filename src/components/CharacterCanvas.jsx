import { useEffect, useRef, useState } from "react"
import { FRAME_COUNT, mountGazeEngine } from "../lib/gazeEngine"

export default function CharacterCanvas() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const engine = mountGazeEngine({
      canvas,
      wrap,
      onProgress: (n) => setLoaded(n),
      onReady: () => setReady(true),
    })

    return () => engine.destroy()
  }, [])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
      {!ready && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#9eb4ba]">
          <p className="font-display text-2xl italic text-ink">taking its time</p>
          <p className="mt-3 font-sans text-[11px] tracking-[0.28em] uppercase text-mute">
            {loaded} / {FRAME_COUNT}
          </p>
        </div>
      )}
    </div>
  )
}
