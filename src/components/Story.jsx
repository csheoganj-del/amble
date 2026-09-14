export default function Story() {
  return (
    <section id="story" className="bg-[#e7dfd3] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="overflow-hidden rounded-sm bg-dove">
          <img
            src="/frames/sloth-28.webp"
            alt="Amble’s workshop companion"
            className="aspect-[4/5] w-full object-cover object-[50%_20%]"
          />
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-copper">
            The workshop
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
            Four pairs of hands,
            <br />
            one slow kettle.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.7] font-light text-ink-soft">
            Amble started in a converted dairy on the edge of Frome. We still
            work there. The machines are older than the brand. The wool is
            undyed because colour is a decision we would rather not rush, and
            the kiln is fired when the batch is ready — not when a calendar
            says so.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-[1.7] font-light text-ink-soft">
            If something we made comes back to us worn, we mend it. That is
            the whole returns policy, and the whole point.
          </p>
          <a
            href="#journal"
            className="mt-8 inline-flex text-[11px] font-medium tracking-[0.2em] uppercase text-ink underline decoration-ink/30 underline-offset-4"
          >
            Read the journal
          </a>
        </div>
      </div>
    </section>
  )
}
