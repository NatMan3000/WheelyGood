import { useState } from "react"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { settingsForContext } from "../data/settings"
import SettingsList from "../components/encyclopedia/SettingsList"
import GameLogo from "../components/shared/GameLogo"
import SetupLogo from "../components/shared/SetupLogo"

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
    <div className="px-4 py-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Encyclopedia</h1>
        <SetupLogo setupId={setupId} className="h-7 w-7" />
        <GameLogo gameId={gameId} className="h-7 w-7" />
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search settings…"
        className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] placeholder-neutral-500 focus:border-accent outline-none text-white mt-3"
      />

      <div className="mt-2">
        {baseSettings.length === 0 ? (
          <p className="text-center text-neutral-500 mt-8">No settings for this setup yet.</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-neutral-500 mt-8">No settings match.</p>
        ) : (
          <SettingsList settings={filtered} />
        )}
      </div>
    </div>
  )
}
