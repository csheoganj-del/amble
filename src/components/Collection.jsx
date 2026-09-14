import { products } from "../data"
import { useCart } from "../context/CartContext"

export default function Collection() {
  const { add } = useCart()

  return (
    <section id="collection" className="bg-paper px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-copper">
          The collection
        </p>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            This season’s
            <br />
            unhurried pieces.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed font-light text-mute">
            Four things. That is the whole drop. When they are gone we start
            again, not sooner.
          </p>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id} className="group">
              <article>
                <div className="overflow-hidden rounded-sm bg-dove">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg text-ink">{p.name}</h3>
                    <p className="mt-1 text-xs text-mute">{p.note}</p>
                  </div>
                  <p className="shrink-0 font-display text-lg text-ink">
                    ${p.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => add(p)}
                  className="mt-4 text-[11px] font-medium tracking-[0.2em] uppercase text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Add to cart
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
