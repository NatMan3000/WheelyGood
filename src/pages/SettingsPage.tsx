import { useSetup } from "../hooks/useSetup"
import { useTheme } from "../hooks/useTheme"
import { useGame } from "../hooks/useGame"
import { setups } from "../data/setups"
import { themes } from "../data/themes"
import { games } from "../data/settings"
import GameLogo from "../components/shared/GameLogo"
import SetupLogo from "../components/shared/SetupLogo"
import type { SetupId } from "../types"

export default function SettingsPage() {
  const { setupId, setSetupId } = useSetup()
  const { gameId, setGameId } = useGame()
  const { themeId, theme, setThemeId } = useTheme()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* ── Active Setup ── */}
      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Active Setup</p>
        <div className="space-y-2">
          {setups.map((s) => {
            const isSelected = s.id === setupId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSetupId(s.id as SetupId)}
                className={[
                  "w-full text-left rounded-lg bg-neutral-900 border p-4 min-h-[44px] transition-colors duration-150",
                  isSelected ? "border-accent" : "border-neutral-800",
                ].join(" ")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SetupLogo setupId={s.id as SetupId} className="h-7 w-7" />
                  <span className="font-medium text-white">{s.name}</span>
                </div>
                <ul className="space-y-0.5">
                  {s.components.map((c) => (
                    <li key={c.id} className="text-sm text-neutral-400">
                      <span className="text-neutral-300">{c.name}</span>
                      {" — "}
                      {c.summary}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Active Game ── */}
      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Active Game</p>
        <div className="flex flex-wrap gap-2">
          {games.map((g) => {
            const isSelected = g.id === gameId
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGameId(g.id)}
                className={[
                  "flex items-center gap-3 rounded-lg px-4 py-3 min-h-[44px] text-sm transition-colors duration-150",
                  isSelected
                    ? "bg-neutral-900 border border-accent text-white font-medium"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-accent",
                ].join(" ")}
              >
                <GameLogo gameId={g.id} className="h-8 w-8" />
                {g.name}
              </button>
            )
          })}
        </div>
        <p className="text-sm text-neutral-400 mt-2">
          The encyclopedia and troubleshooter suggestions adjust to the game you pick.
        </p>
      </section>

      {/* ── Accent Theme ── */}
      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Accent Theme</p>
        <div className="flex flex-wrap gap-3 mb-3">
          {themes.map((t) => {
            const isSelected = t.id === themeId
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeId(t.id)}
                aria-label={t.name}
                className={[
                  "h-12 w-12 rounded-full transition-all duration-150",
                  isSelected ? "ring-2 ring-white" : "ring-1 ring-neutral-700",
                ].join(" ")}
                style={{ backgroundColor: t.accent }}
              />
            )
          })}
        </div>
        <p className="text-sm text-white font-medium">{theme.name}</p>
        <p className="text-sm text-neutral-400">{theme.use}</p>
      </section>

      {/* ── About ── */}
      <section className="mb-8">
        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">About</p>
        <div className="text-sm text-neutral-400 space-y-1">
          <p>App version: <span className="text-neutral-300">0.1.0</span></p>
          <p>Data version: <span className="text-neutral-300">Seed — Phase 1</span></p>
          <p>Built by <span className="text-neutral-300">Nathan &amp; Josh</span></p>
        </div>
      </section>
    </div>
  )
}
