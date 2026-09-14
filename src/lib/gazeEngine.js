const FRAME_COUNT = 50
const IDLE_MS = 9000
const LERP_RATE = 16
const FRAME_URL = (i) =>
  `/frames/sloth-${String(i).padStart(2, "0")}.webp`

async function loadFrame(index, onEach) {
  const img = new Image()
  img.decoding = "async"
  img.src = FRAME_URL(index)
  await img.decode()
  onEach?.(index)
  return img
}

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n))
}

export function mountGazeEngine({ canvas, wrap, onProgress, onReady }) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
  })

  let frames = []
  let ready = false
  let current = (FRAME_COUNT - 1) * 0.55
  let target = current
  let lastPtr = performance.now()
  let idling = false
  let idlePhase = 0
  let lastDrawn = -1
  let raf = 0
  let prev = performance.now()
  let destroyed = false

  const pointer = { x: 0.55, y: 0.45 }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const r = wrap.getBoundingClientRect()
    const w = Math.max(1, Math.round(r.width * dpr))
    const h = Math.max(1, Math.round(r.height * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      lastDrawn = -1
    }
  }

  function draw(index) {
    const img = frames[index]
    if (!img || !ctx) return

    const cw = canvas.width
    const ch = canvas.height
    const ir = img.width / img.height
    const isWide = wrap.getBoundingClientRect().width > 840

    // Desktop: sloth sits on the left, studio backdrop bleeds under the copy.
    // Keep the head fully in frame — the source stills have studio paper above it.
    const zoom = isWide ? 1.2 : 1.12
    const dh = ch * zoom
    const dw = dh * ir
    const dx = isWide ? cw * 0.005 : (cw - dw) / 2
    const dy = ch - dh + ch * (isWide ? 0.02 : 0.03)

    ctx.fillStyle = "#9eb4ba"
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)

    // Stretch the studio paper to both edges so the type sits on a continuous sweep.
    if (dx > 0) {
      ctx.drawImage(img, 0, 0, 1, img.height, 0, dy, dx + 1, dh)
    }
    const remain = cw - (dx + dw)
    if (remain > 0) {
      ctx.drawImage(
        img,
        img.width - 2,
        0,
        1,
        img.height,
        dx + dw - 1,
        dy,
        remain + 2,
        dh,
      )
    }
    if (dy > 0) {
      ctx.fillStyle = "#7f9aa3"
      ctx.fillRect(0, 0, cw, dy + 1)
    }
  }

  function onPointer(e) {
    pointer.x = clamp(e.clientX / window.innerWidth, 0, 1)
    pointer.y = clamp(e.clientY / window.innerHeight, 0, 1)
    target = pointer.x * (FRAME_COUNT - 1)
    lastPtr = performance.now()
    idling = false
  }

  function tick(now) {
    if (destroyed) return
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.05, (now - prev) / 1000)
    prev = now
    if (!ready) return

    if (!reduced) {
      if (now - lastPtr > IDLE_MS) {
        if (!idling) {
          idling = true
          const n = clamp((current / (FRAME_COUNT - 1)) * 2 - 1, -1, 1)
          idlePhase = Math.asin(n)
        }
        idlePhase += dt * 0.42
        target = (Math.sin(idlePhase) * 0.5 + 0.5) * (FRAME_COUNT - 1)
      }
      const k = 1 - Math.exp(-dt * LERP_RATE)
      current += (target - current) * k
    }

    const idx = clamp(Math.round(current), 0, FRAME_COUNT - 1)
    if (idx !== lastDrawn) {
      lastDrawn = idx
      draw(idx)
    }
  }

  const ro = new ResizeObserver(() => {
    resize()
    if (ready && lastDrawn >= 0) draw(lastDrawn)
  })
  ro.observe(wrap)
  resize()

  window.addEventListener("pointermove", onPointer, { passive: true })
  window.addEventListener("pointerdown", onPointer, { passive: true })

  let loaded = 0
  const jobs = Array.from({ length: FRAME_COUNT }, (_, i) =>
    loadFrame(i, () => {
      loaded += 1
      onProgress?.(loaded, FRAME_COUNT)
    }),
  )

  Promise.all(jobs).then((imgs) => {
    if (destroyed) return
    frames = imgs
    ready = true
    draw(clamp(Math.round(current), 0, FRAME_COUNT - 1))
    onReady?.()
  })

  raf = requestAnimationFrame(tick)

  return {
    destroy() {
      destroyed = true
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerdown", onPointer)
      ro.disconnect()
    },
  }
}

export { FRAME_COUNT }
