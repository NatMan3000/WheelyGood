import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/learn", emoji: "📖", label: "Learn" },
  { to: "/fix", emoji: "🔧", label: "Fix" },
  { to: "/saves", emoji: "💾", label: "Saves" },
  { to: "/settings", emoji: "⚙️", label: "Settings" },
] as const

export default function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 backdrop-blur border-t border-neutral-800 grid grid-cols-4 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary navigation"
    >
      {navItems.map(({ to, emoji, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "min-h-[56px] flex flex-col items-center justify-center gap-0.5 text-xs transition-colors duration-150",
              isActive ? "text-accent" : "text-neutral-400",
            ].join(" ")
          }
        >
          <span className="text-lg" aria-hidden="true">{emoji}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
