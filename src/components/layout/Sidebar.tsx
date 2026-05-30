import { NavLink } from "react-router-dom"

const mainNavItems = [
  { to: "/learn", emoji: "📖", label: "Learn" },
  { to: "/fix", emoji: "🔧", label: "Fix" },
  { to: "/saves", emoji: "💾", label: "Saves" },
] as const

const settingsItem = { to: "/settings", emoji: "⚙️", label: "Settings" } as const

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg mx-2 text-sm transition-colors duration-150",
    isActive
      ? "bg-neutral-900 text-accent"
      : "text-neutral-300 hover:bg-neutral-900/50",
  ].join(" ")
}

export default function Sidebar() {
  return (
    <nav
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 flex-col border-r border-neutral-800 bg-neutral-950 z-40"
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="px-4 py-4">
        <p className="text-lg font-bold text-white">WheelyGood</p>
        <p className="text-xs text-neutral-500">Sim racing, sorted.</p>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-1 mt-2">
        {mainNavItems.map(({ to, emoji, label }) => (
          <NavLink key={to} to={to} className={navLinkClass}>
            <span aria-hidden="true">{emoji}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Settings pinned to bottom */}
      <div className="mt-auto border-t border-neutral-800 pt-2 pb-4">
        <NavLink to={settingsItem.to} className={navLinkClass}>
          <span aria-hidden="true">{settingsItem.emoji}</span>
          <span>{settingsItem.label}</span>
        </NavLink>
      </div>
    </nav>
  )
}
