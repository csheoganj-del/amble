export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-16 text-paper md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-3xl">Amble</p>
          <p className="mt-3 max-w-xs text-sm font-light text-paper/70">
            Knitwear, ceramics and small comforts. Made slowly in Frome since
            2019.
          </p>
        </div>

        <form
          className="w-full max-w-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            htmlFor="mail"
            className="text-[10px] font-medium tracking-[0.28em] uppercase text-paper/60"
          >
            A letter, twice a year
          </label>
          <div className="mt-3 flex border-b border-paper/30">
            <input
              id="mail"
              type="email"
              required
              placeholder="Your email"
              className="w-full bg-transparent py-2 text-sm text-paper outline-none placeholder:text-paper/35"
            />
            <button
              type="submit"
              className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-paper"
            >
              Join
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-[10px] tracking-[0.18em] uppercase text-paper/45">
        <p>© {new Date().getFullYear()} Amble workshop</p>
        <p>Repairs for life · shipped slowly</p>
      </div>
    </footer>
  )
}
