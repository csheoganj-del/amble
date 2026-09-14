import { ticker } from "../data"

export default function Marquee() {
  const row = [...ticker, ...ticker]
  const doubled = [...row, ...row]

  return (
    <div className="relative z-20 overflow-hidden border-t border-ink/10 md:absolute md:inset-x-0 md:bottom-0">
      <div className="marquee-track flex w-max items-center gap-0 py-2.5 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center text-[10px] font-medium tracking-[0.28em] uppercase text-ink-soft/70"
          >
            <span className="px-5">{item}</span>
            <span aria-hidden="true" className="text-ink/30">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
