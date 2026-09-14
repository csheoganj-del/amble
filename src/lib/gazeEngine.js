const FRAME_COUNT = 50
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

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches
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
  let coarse = isCoarsePointer()

  function idleMs() {
    return coarse ? 2800 : 9000
  }

  function lerpRate() {
    return coarse ? 11 : 16
  }

  function resize() {
    coarse = isCoarsePointer()
    const dprCap = coarse ? 3 : 2
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
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
    const box = wrap.getBoundingClientRect()
    const isWide = box.width > 840
    const isShort = !isWide && box.height < 740

    let dw
    let dh
    let dx
    let dy

    if (isWide) {
      const zoom = 1.2
      dh = ch * zoom
      dw = dh * ir
      dx = cw * 0.005
      dy = ch - dh + ch * 0.02
    } else {
      // Phone: sit high so the face stays above the copy overlay.
      dw = cw * (isShort ? 0.88 : 0.94)
      dh = dw / ir
      dx = (cw - dw) / 2
      dy = ch * (isShort ? 0.12 : 0.05)
    }

    ctx.fillStyle = "#9eb4ba"
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)

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

  function applyPointer(x) {
    const w = window.innerWidth || 1
    target = clamp(x / w, 0, 1) * (FRAME_COUNT - 1)
    lastPtr = performance.now()
    idling = false
  }

  function onPointer(e) {
    applyPointer(e.clientX)
  }

  function onTouch(e) {
    const t = e.touches[0] || e.changedTouches[0]
    if (t) applyPointer(t.clientX)
  }

  function tick(now) {
    if (destroyed) return
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.05, (now - prev) / 1000)
    prev = now
    if (!ready) return

    if (!reduced) {
      if (now - lastPtr > idleMs()) {
        if (!idling) {
          idling = true
          const n = clamp((current / (FRAME_COUNT - 1)) * 2 - 1, -1, 1)
          idlePhase = Math.asin(n)
        }
        idlePhase += dt * (coarse ? 0.55 : 0.42)
        target = (Math.sin(idlePhase) * 0.5 + 0.5) * (FRAME_COUNT - 1)
      }
      const k = 1 - Math.exp(-dt * lerpRate())
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
  window.addEventListener("touchstart", onTouch, { passive: true })
  window.addEventListener("touchmove", onTouch, { passive: true })

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
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("touchmove", onTouch)
      ro.disconnect()
    },
  }
}

export { FRAME_COUNT }
