import { useSetup } from "../hooks/useSetup"
import { useTheme } from "../hooks/useTheme"
import { setups } from "../data/setups"
import { themes } from "../data/themes"
import type { SetupId } from "../types"

export default function SettingsPage() {
  const { setupId, setSetupId } = useSetup()
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
                  <span className="font-medium text-white">{s.name}</span>
                  <span className="text-xs text-neutral-400 bg-neutral-800 rounded px-2 py-0.5">
                    {s.shortName}
                  </span>
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
