import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import { useProfiles } from "../hooks/useProfiles"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { exportProfileText } from "../utils/profileText"
import { setupById } from "../data/setups"
import { games, settingById, groupByCategory, formatValue } from "../data/settings"
import type { Setting } from "../types"
import GameLogo from "../components/shared/GameLogo"
import SetupLogo from "../components/shared/SetupLogo"
import Icon from "../components/shared/Icon"

/*
  Read mode for a saved profile — built for the moment you're actually AT the
  rig, phone in one hand, scrolling the wheel's tuning menu with the other.
  Values are big, grouped the way the wheel groups them, and each row ticks
  off as you dial it in. Progress survives app switches (localStorage) so a
  mid-setup interruption doesn't lose your place.
*/

export default function ProfileViewPage() {
  const { id } = useParams<{ id: string }>()
  const { profiles } = useProfiles()
  const profile = profiles.find((p) => p.id === id)
  usePageTitle(profile?.name)

  const [applied, setApplied] = useLocalStorage<string[]>(`wg-applied-${id}`, [])
  const [copied, setCopied] = useState(false)

  if (!profile) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium">Profile not found.</p>
        <Link to="/saves" className="text-accent text-sm mt-4 inline-block hover:underline">
          Back to Saves
        </Link>
      </div>
    )
  }

  const setup = setupById(profile.setup)
  const gameName = games.find((g) => g.id === profile.game)?.name ?? profile.game

  // Resolve profile settings to Setting objects, keeping wheel-menu grouping.
  const resolved: Setting[] = []
  for (const sid of Object.keys(profile.settings)) {
    const s = settingById(sid)
    if (s) resolved.push(s)
  }
  const grouped = groupByCategory(resolved)

  const total = resolved.length
  const appliedSet = new Set(applied)
  const doneCount = resolved.filter((s) => appliedSet.has(s.id)).length
  const allDone = total > 0 && doneCount === total

  function toggleApplied(settingId: string) {
    setApplied(
      appliedSet.has(settingId) ? applied.filter((a) => a !== settingId) : [...applied, settingId],
    )
  }

  function handleExport() {
    if (!profile) return
    navigator.clipboard.writeText(exportProfileText(profile)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mx-auto max-w-2xl pb-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h1 className="text-2xl font-bold tracking-tight min-w-0">{profile.name}</h1>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExport}
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] inline-flex items-center text-sm font-medium transition-colors duration-150 hover:border-neutral-500"
          >
            {copied ? "Copied!" : "Share"}
          </button>
          <Link
            to={`/saves/${profile.id}/edit`}
            className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-semibold text-sm transition-[filter] duration-150 hover:brightness-110"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Context line */}
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <SetupLogo setupId={profile.setup} className="h-6 w-6" />
        <GameLogo gameId={profile.game} className="h-6 w-6" />
        <span className="text-sm text-neutral-400">
          {setup.shortName} · {gameName}
        </span>
        {profile.surface && (
          <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs capitalize">
            {profile.surface}
          </span>
        )}
      </div>

      {profile.notes && <p className="text-sm text-neutral-400 -mt-2 mb-5">{profile.notes}</p>}

      {/* Dial-in progress */}
      {total > 0 && (
        <div className="mb-5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <p className={["text-sm font-medium", allDone ? "text-accent" : "text-neutral-300"].join(" ")}>
              {allDone ? "Dialled in ✓" : "Tap each setting as you dial it in"}
            </p>
            <span className="flex items-baseline gap-2">
              <span className="text-xs text-neutral-500 tnum">
                {doneCount}/{total}
              </span>
              {doneCount > 0 && !allDone && (
                <button
                  type="button"
                  onClick={() => setApplied([])}
                  className="text-xs text-neutral-500 hover:text-white transition-colors duration-150"
                >
                  Reset
                </button>
              )}
              {allDone && (
                <button
                  type="button"
                  onClick={() => setApplied([])}
                  className="text-xs text-neutral-500 hover:text-white transition-colors duration-150"
                >
                  Start again
                </button>
              )}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Settings, grouped like the wheel's own menu */}
      <div className="space-y-6">
        {grouped.map(({ category, label, settings }) => (
          <section key={category}>
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">{label}</p>
            <div className="rounded-lg bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800 overflow-hidden">
              {settings.map((setting) => {
                const entry = profile.settings[setting.id]
                const done = appliedSet.has(setting.id)
                return (
                  <button
                    key={setting.id}
                    type="button"
                    onClick={() => toggleApplied(setting.id)}
                    aria-pressed={done}
                    className={[
                      "flex w-full items-center gap-3 px-3.5 py-3 min-h-[56px] text-left transition-colors duration-150",
                      done ? "bg-neutral-950/40" : "hover:bg-neutral-800/30",
                    ].join(" ")}
                  >
                    {/* Tick */}
                    <span
                      className={[
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-150",
                        done ? "border-accent bg-accent text-black" : "border-neutral-700 text-transparent",
                      ].join(" ")}
                    >
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>

                    {/* Name + note */}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span
                          className={[
                            "text-sm font-medium truncate",
                            done ? "text-neutral-500" : "text-white",
                          ].join(" ")}
                        >
                          {setting.name}
                        </span>
                        {setting.abbreviation && (
                          <span className="text-xs text-neutral-600 shrink-0">
                            {setting.abbreviation}
                          </span>
                        )}
                      </span>
                      {entry?.notes && (
                        <span className="block text-xs text-neutral-500 mt-0.5">{entry.notes}</span>
                      )}
                    </span>

                    {/* The value — big enough to read from arm's length */}
                    <span
                      className={[
                        "text-xl font-bold tnum shrink-0",
                        done ? "text-neutral-600" : "text-accent",
                      ].join(" ")}
                    >
                      {entry !== undefined ? formatValue(setting, entry.value) : "—"}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {total === 0 && (
        <p className="text-neutral-500 text-sm">
          This profile has no settings yet —{" "}
          <Link to={`/saves/${profile.id}/edit`} className="text-accent hover:underline">
            add some
          </Link>
          .
        </p>
      )}
    </div>
  )
}
