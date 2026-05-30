import { useState } from "react"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { settingsForContext } from "../data/settings"
import SettingsList from "../components/encyclopedia/SettingsList"
import ContextPicker from "../components/shared/ContextPicker"
import PageHeader from "../components/shared/PageHeader"
import Icon from "../components/shared/Icon"

export default function EncyclopediaPage() {
  const { setupId } = useSetup()
  const { gameId } = useGame()
  const [query, setQuery] = useState("")

  const baseSettings = settingsForContext(setupId, gameId)

  const filtered = query.trim()
    ? baseSettings.filter((s) => {
        const q = query.toLowerCase()
        return (
          s.name.toLowerCase().includes(q) ||
          (s.abbreviation?.toLowerCase().includes(q) ?? false)
        )
      })
    : baseSettings

  return (
    <div>
      {/* Anchored header — title, context dropdowns, and search stay pinned
          while the settings list scrolls underneath. -mx-4/-mt-4 break out of
          the AppShell wrapper's px-4/pt-4 so the bar sits flush at the top and
          spans full width; its own pt-4 keeps the title at the same 16px
          baseline as every other page. */}
      <div className="sticky top-0 z-20 -mx-4 -mt-4 border-b border-neutral-800 bg-neutral-950/90 px-4 pt-4 pb-3 backdrop-blur-md">
        <div className="flex flex-col gap-4">
          <PageHeader title="Simpedia" subtitle="What each setting does, and which way to turn it." />
          <ContextPicker />
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
            placeholder="Search settings…"
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
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Icon name="search" className="mx-auto h-8 w-8 text-neutral-600" />
            <p className="mt-3 text-sm text-neutral-400">
              Nothing matches <span className="text-neutral-200">“{query.trim()}”</span>.
            </p>
          </div>
        ) : (
          <SettingsList settings={filtered} />
        )}
      </div>
    </div>
  )
}
