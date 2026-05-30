import { NavLink } from "react-router-dom"
import Icon, { type IconName } from "../shared/Icon"

const navItems: { to: string; icon: IconName; label: string }[] = [
  { to: "/learn", icon: "learn", label: "Learn" },
  { to: "/fix", icon: "fix", label: "Fix" },
  { to: "/saves", icon: "saves", label: "Saves" },
  { to: "/settings", icon: "settings", label: "Settings" },
]

export default function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/90 backdrop-blur-md border-t border-neutral-800 grid grid-cols-4 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary navigation"
    >
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "relative min-h-[56px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-150",
              isActive ? "text-accent" : "text-neutral-400 hover:text-neutral-200",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-0 h-[3px] w-9 rounded-full bg-accent" aria-hidden="true" />
              )}
              <Icon name={icon} className="h-[22px] w-[22px]" />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
