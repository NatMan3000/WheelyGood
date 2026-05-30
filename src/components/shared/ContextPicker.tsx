import { useEffect, useRef, useState, type ReactNode } from "react"
import { useSetup } from "../../hooks/useSetup"
import { useGame } from "../../hooks/useGame"
import { setups } from "../../data/setups"
import { games } from "../../data/settings"
import BrandLogo from "./BrandLogo"
import SetupLogo from "./SetupLogo"
import GameLogo from "./GameLogo"
import Icon from "./Icon"
import type { GameId, SetupId } from "../../types"

interface Option {
  id: string
  label: string
  logo: ReactNode
}

/*
  A single labelled dropdown. Closes on outside-click or Escape. The trigger
  shows the active option's logo + label; the menu lists every option with a
  check on the active one.
*/
function Dropdown({
  label,
  options,
  activeId,
  onSelect,
}: {
  label: string
  options: Option[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = options.find((o) => o.id === activeId) ?? options[0]

  useEffect(() => {
    if (!open) return
    function onDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "flex w-full items-center gap-2 rounded-lg border bg-neutral-900 py-2 pl-2 pr-2.5 min-h-[44px] text-sm transition-colors duration-150",
          open ? "border-accent" : "border-neutral-800 hover:border-neutral-600",
        ].join(" ")}
      >
        {active.logo}
        <span className="min-w-0 flex-1 truncate text-left font-medium text-white">
          {active.label}
        </span>
        <Icon
          name="chevron-down"
          className={[
            "h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-150",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 shadow-xl shadow-black/40 item-enter"
        >
          {options.map((o) => {
            const selected = o.id === activeId
            return (
              <li key={o.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(o.id)
                    setOpen(false)
                  }}
                  className={[
                    "flex w-full items-center gap-2.5 px-2.5 py-2.5 min-h-[44px] text-left text-sm transition-colors duration-150",
                    selected ? "bg-neutral-800/70 text-white" : "text-neutral-300 hover:bg-neutral-800/40",
                  ].join(" ")}
                >
                  {o.logo}
                  <span className="min-w-0 flex-1 truncate font-medium">{o.label}</span>
                  {selected && <Icon name="check" className="h-4 w-4 shrink-0 text-accent" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/*
  Two dropdowns — Setup and Game — that drive the global setup/game context.
  Replaces the read-only context pill so the encyclopedia can be re-scoped
  without a trip to Settings.
*/
export default function ContextPicker() {
  const { setupId, setSetupId } = useSetup()
  const { gameId, setGameId } = useGame()

  const setupOptions: Option[] = setups.map((s) => ({
    id: s.id,
    label: s.shortName,
    // Platform logo (Xbox / PC) before brand — pairs with the platform-named label.
    logo: (
      <span className="flex shrink-0 items-center gap-1">
        <SetupLogo setupId={s.id as SetupId} className="h-5 w-5" />
        <BrandLogo setupId={s.id as SetupId} className="h-5 w-5" />
      </span>
    ),
  }))

  const gameOptions: Option[] = games.map((g) => ({
    id: g.id,
    label: g.name,
    logo: <GameLogo gameId={g.id} className="h-5 w-5" />,
  }))

  return (
    <div className="flex gap-2">
      <Dropdown
        label="Setup"
        options={setupOptions}
        activeId={setupId}
        onSelect={(id) => setSetupId(id as SetupId)}
      />
      <Dropdown
        label="Game"
        options={gameOptions}
        activeId={gameId}
        onSelect={(id) => setGameId(id as GameId)}
      />
    </div>
  )
}
