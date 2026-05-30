import { useState } from "react"
import { Link } from "react-router-dom"
import { useProfiles } from "../hooks/useProfiles"
import { importProfileText } from "../utils/profileText"
import { games } from "../data/settings"
import ProfileCard from "../components/profiles/ProfileCard"

export default function ProfilesPage() {
  const { profiles, createProfile } = useProfiles()
  const [importOpen, setImportOpen] = useState(false)
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState<string | null>(null)

  function handleImport() {
    const result = importProfileText(importText)
    if (!result) {
      setImportError("Couldn't read that profile text.")
      return
    }
    createProfile(result)
    setImportText("")
    setImportError(null)
    setImportOpen(false)
  }

  // Group profiles by game, using games registry order
  const grouped = games
    .map((game) => ({
      game,
      profiles: profiles.filter((p) => p.game === game.id),
    }))
    .filter((g) => g.profiles.length > 0)

  const hasProfiles = profiles.length > 0

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Saves</h1>
          <p className="text-neutral-400 text-sm mt-0.5">Your wheel setups</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              setImportOpen((v) => !v)
              setImportError(null)
            }}
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm transition-colors duration-150 hover:border-neutral-500"
          >
            Import
          </button>
          <Link
            to="/saves/compare"
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm transition-colors duration-150 hover:border-neutral-500"
          >
            Compare
          </Link>
          <Link
            to="/saves/new"
            className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm transition-colors duration-150"
          >
            New profile
          </Link>
        </div>
      </div>

      {/* Import panel */}
      {importOpen && (
        <div className="mb-6 rounded-lg bg-neutral-900 border border-neutral-800 p-4">
          <p className="text-sm font-medium mb-2">Paste profile text</p>
          <textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value)
              setImportError(null)
            }}
            placeholder="Paste exported profile text here…"
            rows={4}
            className="w-full rounded bg-neutral-800 border border-neutral-700 text-sm text-neutral-200 placeholder-neutral-500 px-3 py-2 focus:outline-none focus:border-accent resize-none transition-colors duration-150"
          />
          {importError && (
            <p className="text-red-400 text-xs mt-1">{importError}</p>
          )}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleImport}
              className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm transition-colors duration-150"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setImportOpen(false)
                setImportText("")
                setImportError(null)
              }}
              className="border border-neutral-700 rounded-lg px-4 min-h-[44px] inline-flex items-center text-sm transition-colors duration-150 hover:border-neutral-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasProfiles && (
        <div className="py-16 text-center">
          <span className="text-4xl" aria-hidden="true">💾</span>
          <p className="text-lg font-medium mt-3">No saved profiles yet</p>
          <p className="text-neutral-400 text-sm mt-1">Create one to store your wheel settings.</p>
          <Link
            to="/saves/new"
            className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm mt-4 mx-auto transition-colors duration-150"
          >
            New profile
          </Link>
        </div>
      )}

      {/* Grouped profile list */}
      {hasProfiles && (
        <div className="space-y-8">
          {grouped.map(({ game, profiles: gameProfiles }) => (
            <section key={game.id}>
              <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
                {game.name}
              </p>
              <div className="space-y-2">
                {gameProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
