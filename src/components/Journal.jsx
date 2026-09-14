import { journal, stockists } from "../data"

export default function Journal() {
  return (
    <>
      <section id="journal" className="bg-paper px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-copper">
            Journal
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Notes from the bench.
          </h2>

          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {journal.map((entry) => (
              <li key={entry.title}>
                <a
                  href="#journal"
                  className="group flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-12"
                >
                  <span className="w-36 shrink-0 text-[11px] tracking-[0.16em] uppercase text-mute">
                    {entry.date}
                  </span>
                  <span className="w-28 shrink-0 text-[11px] tracking-[0.16em] uppercase text-copper">
                    {entry.kicker}
                  </span>
                  <span className="font-display text-2xl text-ink transition-colors group-hover:text-copper md:text-3xl">
                    {entry.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="stockists"
        className="border-t border-ink/10 bg-paper px-5 py-16 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-copper">
            Stockists
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink">
            Places that keep our pace.
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stockists.map((s) => (
              <li key={s.city}>
                <p className="text-[11px] tracking-[0.2em] uppercase text-mute">
                  {s.city}
                </p>
                <p className="mt-1 font-display text-xl text-ink">{s.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
