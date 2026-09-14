import { useCart } from "../context/CartContext"

export default function CartDrawer() {
  const { items, count, total, inc, dec, open, setOpen } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase">
            Cart ({count})
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[11px] tracking-[0.18em] uppercase text-mute"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="font-display text-2xl italic text-mute">
              Empty, and in no rush.
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <img
                    src={item.img}
                    alt=""
                    className="h-20 w-20 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg">{item.name}</p>
                    <p className="text-sm text-mute">${item.price}</p>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <button type="button" onClick={() => dec(item.id)}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => inc(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink/10 px-6 py-5">
          <div className="mb-4 flex justify-between font-display text-xl">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button
            type="button"
            disabled={!items.length}
            className="w-full rounded-full bg-ink py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-paper disabled:opacity-40"
          >
            Checkout slowly
          </button>
        </div>
      </aside>
    </>
  )
}
