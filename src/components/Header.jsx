import { useCart } from "../context/CartContext"

const links = [
  { href: "#collection", label: "Shop" },
  { href: "#story", label: "Story" },
  { href: "#journal", label: "Journal" },
  { href: "#stockists", label: "Stockists" },
]

export default function Header() {
  const { count, setOpen } = useCart()

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-8">
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

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pointer-events-auto rounded-full border border-ink/25 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Cart ({count})
      </button>
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
