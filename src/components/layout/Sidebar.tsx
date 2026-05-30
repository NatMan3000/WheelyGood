import { NavLink } from "react-router-dom"
import Icon, { type IconName } from "../shared/Icon"

const mainNavItems: { to: string; icon: IconName; label: string }[] = [
  { to: "/learn", icon: "learn", label: "Learn" },
  { to: "/fix", icon: "fix", label: "Fix" },
  { to: "/saves", icon: "saves", label: "Saves" },
]

const settingsItem = { to: "/settings", icon: "settings" as IconName, label: "Settings" }

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "relative flex items-center gap-3 px-4 py-2.5 min-h-[44px] rounded-lg mx-2 text-sm font-medium transition-colors duration-150",
    isActive
      ? "bg-neutral-900 text-accent"
      : "text-neutral-300 hover:bg-neutral-900/60 hover:text-white",
  ].join(" ")
}

function NavItem({ to, icon, label }: { to: string; icon: IconName; label: string }) {
  return (
    <NavLink to={to} className={navLinkClass}>
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-accent"
              aria-hidden="true"
            />
          )}
          <Icon name={icon} className="h-[18px] w-[18px]" />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <nav
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 flex-col border-r border-neutral-800 bg-neutral-950 z-40"
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Icon name="wheel" className="h-6 w-6 text-accent" />
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight text-white">WheelyGood</p>
          <p className="text-[11px] text-neutral-500">Sim racing, sorted.</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex flex-col gap-1 mt-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>

      {/* Settings pinned to bottom */}
      <div className="mt-auto border-t border-neutral-800 pt-2 pb-4">
        <NavItem {...settingsItem} />
      </div>
    </nav>
  )
}
