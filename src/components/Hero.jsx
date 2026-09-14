import { useEffect, useState } from "react"
import CharacterCanvas from "./CharacterCanvas"
import Header from "./Header"
import Marquee from "./Marquee"

export default function Hero() {
  const [hint, setHint] = useState(true)

  useEffect(() => {
    const hide = () => setHint(false)
    window.addEventListener("pointerdown", hide, { once: true })
    window.addEventListener("touchstart", hide, { once: true })
    const t = window.setTimeout(hide, 5000)
    return () => {
      window.removeEventListener("pointerdown", hide)
      window.removeEventListener("touchstart", hide)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative h-svh overflow-hidden bg-[#9eb4ba] touch-pan-y"
    >
      <div className="absolute inset-0">
        <CharacterCanvas />
      </div>
      <Header />

      {hint && (
        <p className="pointer-events-none absolute top-[max(4.6rem,calc(env(safe-area-inset-top)+3.4rem))] left-0 right-0 z-20 hidden text-center font-sans text-[10px] tracking-[0.28em] uppercase text-ink/50 min-[390px]:block [@media(max-height:740px)]:hidden md:hidden">
          slide to look
        </p>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end md:flex-row md:justify-stretch">
        <div className="hidden md:block md:w-[48%] lg:w-[46%]" />

        <div className="bg-gradient-to-t from-[#9eb4ba] from-35% via-[#9eb4ba]/95 to-transparent px-5 pt-20 pb-[3.5rem] [@media(max-height:740px)]:pt-10 [@media(max-height:740px)]:pb-12 md:flex md:flex-1 md:flex-col md:justify-center md:bg-none md:px-10 md:pt-0 md:pb-16 lg:pr-16 xl:pr-24">
          <p className="mb-3 flex items-center gap-3 text-[10px] font-medium tracking-[0.32em] uppercase text-copper md:mb-5">
            <span className="hidden h-px w-8 bg-copper/60 sm:block" />
            Est. 2019 — small batch
          </p>

          <h1 className="font-display text-[clamp(1.95rem,8vw,4.35rem)] leading-[1.05] text-ink [@media(max-height:740px)]:text-[1.85rem]">
            Nothing here was
            <br />
            made in <em className="italic text-copper">a hurry.</em>
          </h1>

          <p className="mt-4 hidden max-w-[26rem] text-[15px] leading-[1.65] font-light text-ink-soft md:mt-6 md:block">
            Knitwear, ceramics and small comforts from a workshop that keeps
            its own pace. We make less than we could, and we would rather you
            bought one thing twice than two things once.
          </p>
          <p className="mt-3 max-w-[22rem] text-[13px] leading-[1.55] font-light text-ink-soft [@media(max-height:740px)]:hidden md:hidden">
            Knitwear, ceramics and small comforts from a workshop that keeps
            its own pace.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 [@media(max-height:740px)]:mt-4 md:mt-8 md:gap-3">
            <a
              href="#collection"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-paper transition-opacity hover:opacity-80 [@media(max-height:740px)]:w-full md:w-auto md:px-6 md:py-3"
            >
              Shop the collection
              <svg
                className="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#story"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/30 px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-ink transition-colors hover:bg-ink hover:text-paper [@media(max-height:740px)]:w-full md:w-auto md:px-6 md:py-3"
            >
              Our story
            </a>
          </div>

          <dl className="mt-6 grid max-w-lg grid-cols-3 gap-3 border-t border-ink/15 pt-4 [@media(max-height:740px)]:hidden md:mt-10 md:grid md:gap-4 md:pt-6">
            <Stat label="Pieces a year" value="120" />
            <Stat label="Makers" value="4" />
            <Stat label="Returns" value="Never asked" />
          </dl>
        </div>
      </div>

      <Marquee />
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-[8px] font-medium tracking-[0.2em] uppercase text-mute md:text-[9px] md:tracking-[0.22em]">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[clamp(1.15rem,4.2vw,1.85rem)] leading-none text-ink md:mt-1.5">
        {value}
      </dd>
    </div>
  )
}
