import CharacterCanvas from "./CharacterCanvas"
import Header from "./Header"
import Marquee from "./Marquee"

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-svh overflow-hidden bg-[#9eb4ba] md:h-svh"
    >
      <div className="relative h-[52vh] min-h-[280px] md:absolute md:inset-0 md:h-auto md:min-h-0">
        <CharacterCanvas />
      </div>
      <Header />

      <div className="relative z-10 flex md:h-full">
        <div className="hidden md:block md:w-[48%] lg:w-[46%]" />

        <div className="flex flex-1 flex-col justify-center px-6 pt-6 pb-10 md:px-10 md:pt-0 md:pb-16 lg:pr-16 xl:pr-24">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium tracking-[0.32em] uppercase text-copper">
            <span className="hidden h-px w-8 bg-copper/60 sm:block" />
            Est. 2019 — small batch
          </p>

          <h1 className="font-display text-[clamp(2.35rem,5.2vw,4.35rem)] leading-[1.05] text-ink">
            Nothing here was
            <br />
            made in <em className="italic text-copper">a hurry.</em>
          </h1>

          <p className="mt-6 max-w-[26rem] text-[15px] leading-[1.65] font-light text-ink-soft">
            Knitwear, ceramics and small comforts from a workshop that keeps
            its own pace. We make less than we could, and we would rather you
            bought one thing twice than two things once.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-medium tracking-[0.18em] uppercase text-paper transition-opacity hover:opacity-80"
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
              className="inline-flex items-center rounded-full border border-ink/30 px-6 py-3 text-[11px] font-medium tracking-[0.18em] uppercase text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Our story
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/15 pt-6">
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
      <dt className="text-[9px] font-medium tracking-[0.22em] uppercase text-mute">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-none text-ink">
        {value}
      </dd>
    </div>
  )
}
