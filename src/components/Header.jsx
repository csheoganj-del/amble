import { useState } from "react"
import { useCart } from "../context/CartContext"

const links = [
  { href: "#collection", label: "Shop" },
  { href: "#story", label: "Story" },
  { href: "#journal", label: "Journal" },
  { href: "#stockists", label: "Stockists" },
]

export default function Header() {
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-5 pt-[max(1.15rem,env(safe-area-inset-top))] pb-3 md:px-8 md:pt-5">
      <div className="flex items-center justify-between">
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5 text-ink"
        >
          <LogoMark />
          <span className="font-display text-[22px] leading-none tracking-tight">
            Amble
          </span>
        </a>

        <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-soft/80 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-ink/25 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-ink md:hidden"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? "Close" : "Menu"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-ink/25 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Cart ({count})
          </button>
        </div>
      </div>

      {menu && (
        <nav className="pointer-events-auto mt-3 flex flex-wrap gap-x-5 gap-y-2 rounded-2xl bg-paper/80 px-4 py-3 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className="py-1 text-[11px] font-medium tracking-[0.22em] uppercase text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#1c1b19" />
      <ellipse cx="16" cy="17.4" rx="8" ry="7.4" fill="#e8dcc8" />
      <ellipse cx="11.5" cy="16.3" rx="3" ry="2.3" fill="#1c1b19" />
      <ellipse cx="20.5" cy="16.3" rx="3" ry="2.3" fill="#1c1b19" />
      <circle cx="12.3" cy="16.1" r="1" fill="#f4efe8" />
      <circle cx="21.3" cy="16.1" r="1" fill="#f4efe8" />
      <ellipse cx="16" cy="19.5" rx="1.3" ry="1" fill="#1c1b19" />
    </svg>
  )
}
