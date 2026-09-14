import { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const api = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const total = items.reduce((n, i) => n + i.qty * i.price, 0)

    function add(product) {
      setItems((prev) => {
        const found = prev.find((i) => i.id === product.id)
        if (found) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
          )
        }
        return [...prev, { ...product, qty: 1 }]
      })
      setOpen(true)
    }

    function inc(id) {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
      )
    }

    function dec(id) {
      setItems((prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      )
    }

    return { items, count, total, add, inc, dec, open, setOpen }
  }, [items, open])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
