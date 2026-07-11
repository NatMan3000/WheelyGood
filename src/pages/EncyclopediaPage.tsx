import { useState } from "react"
import { usePageTitle } from "../hooks/usePageTitle"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { settingsForContext } from "../data/settings"
import { symptoms } from "../data/symptoms/symptoms"
import SettingsList from "../components/encyclopedia/SettingsList"
import SymptomCard from "../components/troubleshooter/SymptomCard"
import ContextPicker from "../components/shared/ContextPicker"
import Icon from "../components/shared/Icon"

export default function EncyclopediaPage() {
  usePageTitle("Simpedia")
  const { setupId } = useSetup()
  const { gameId } = useGame()
  const [query, setQuery] = useState("")

  const baseSettings = settingsForContext(setupId, gameId)
  const q = query.trim().toLowerCase()

  const filtered = q
    ? baseSettings.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.abbreviation?.toLowerCase().includes(q) ?? false) ||
          s.description.toLowerCase().includes(q) ||
          (s.subcategory?.toLowerCase().includes(q) ?? false) ||
          (s.sweetSpot?.toLowerCase().includes(q) ?? false) ||
          (s.warnings?.some((w) => w.toLowerCase().includes(q)) ?? false),
      )
    : baseSettings

  // One search box serves both halves of the app: surface symptom matches
  // ("clipping", "oscillate") alongside settings, capped so they stay a
  // cross-reference rather than taking over the page.
  const matchedSymptoms = q
    ? symptoms
        .filter(
          (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
        )
        .slice(0, 4)
    : []

  return (
    <div>
      {/* Anchored header — title, context dropdowns, and search stay pinned
          while the settings list scrolls underneath. -mx-4/-mt-4 break out of
          the AppShell wrapper's px-4/pt-4 so the bar sits flush at the top and
          spans full width; its own pt-4 keeps the title at the same 16px
          baseline as every other page. */}
      <div className="tread-surface sticky top-0 z-20 -mx-4 -mt-4 border-b border-neutral-800 px-4 pt-4 pb-3">
        {/* Title + subtitle left, setup/game pickers stacked top-right */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">Simpedia</h1>
            <p className="text-neutral-400 text-sm mt-1">
              What each setting does, and which way to turn it.
            </p>
          </div>
          <ContextPicker stacked />
        </div>

        <div className="relative mt-3">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search settings and symptoms…"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 pl-10 pr-3 py-2 min-h-[44px] placeholder-neutral-500 text-white transition-colors duration-150 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>
      </div>

      <div className="mt-4">
        {baseSettings.length === 0 ? (
          <div className="py-16 text-center">
            <Icon name="sliders" className="mx-auto h-8 w-8 text-neutral-600" />
            <p className="mt-3 text-sm text-neutral-400">No settings for this setup yet.</p>
          </div>
        ) : filtered.length === 0 && matchedSymptoms.length === 0 ? (
          <div className="py-16 text-center">
            <Icon name="search" className="mx-auto h-8 w-8 text-neutral-600" />
            <p className="mt-3 text-sm text-neutral-400">
              Nothing matches <span className="text-neutral-200">“{query.trim()}”</span>.
            </p>
          </div>
        ) : (
          <>
            <SettingsList settings={filtered} />

            {/* Symptom cross-results */}
            {matchedSymptoms.length > 0 && (
              <section className={filtered.length > 0 ? "mt-8" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-300">
                    From the Troubleshooter
                  </h2>
                  <span className="text-[11px] font-semibold text-neutral-600 tnum">
                    {matchedSymptoms.length}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
                </div>
                <div className="space-y-2">
                  {matchedSymptoms.map((s) => (
                    <SymptomCard key={s.id} symptom={s} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
