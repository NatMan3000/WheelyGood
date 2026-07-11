import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import { useProfiles } from "../hooks/useProfiles"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { exportProfileText } from "../utils/profileText"
import { setupById } from "../data/setups"
import {
  games,
  settingById,
  groupByCategory,
  formatValue,
  recommendedValue,
} from "../data/settings"
import type { Setting, SettingValue } from "../types"
import GameLogo from "../components/shared/GameLogo"
import SetupLogo from "../components/shared/SetupLogo"
import SettingValueInput from "../components/shared/SettingValueInput"
import Icon from "../components/shared/Icon"

/*
  The dial-in screen — built for the moment you're actually AT the rig, phone
  in one hand, scrolling the wheel's tuning menu with the other. Values are
  big, grouped the way the wheel groups them. Two gestures per row:
    · tap the row      → tick it off as applied (progress persists per profile)
    · tap the VALUE    → edit it in place ("tweaked FF on the wheel, update
                          the save") — saves straight to the profile and
                          un-ticks the row, since the new value isn't applied
                          until you dial it in again.
*/

export default function ProfileViewPage() {
  const { id } = useParams<{ id: string }>()
  const { profiles, updateProfile } = useProfiles()
  const profile = profiles.find((p) => p.id === id)
  usePageTitle(profile?.name)

  const [applied, setApplied] = useLocalStorage<string[]>(`wg-applied-${id}`, [])
  const [copied, setCopied] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

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

  function updateValue(settingId: string, value: SettingValue) {
    if (!profile) return
    updateProfile(profile.id, {
      settings: {
        ...profile.settings,
        [settingId]: { ...profile.settings[settingId], value },
      },
    })
    // A changed value isn't on the wheel yet — clear its tick.
    if (appliedSet.has(settingId)) setApplied(applied.filter((a) => a !== settingId))
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
              {allDone ? "Dialled in ✓" : "Tick off each setting as you copy it onto the wheel"}
            </p>
            <span className="flex items-baseline gap-2 shrink-0">
              <span className="text-xs text-neutral-500 tnum">
                {doneCount}/{total}
              </span>
              {doneCount > 0 && (
                <button
                  type="button"
                  onClick={() => setApplied([])}
                  className="text-xs text-neutral-500 hover:text-white transition-colors duration-150"
                >
                  {allDone ? "Start again" : "Clear ticks"}
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
          <p className="text-xs text-neutral-500 mt-1.5">
            Tap a <span className="text-accent">value</span> to tweak it — changes save straight to this profile.
          </p>
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
                const editing = editingId === setting.id
                const rec = recommendedValue(setting, {
                  game: profile.game,
                  setup: profile.setup,
                  surface: profile.surface,
                })
                return (
                  <div key={setting.id} className={done ? "bg-neutral-950/40" : ""}>
                    <div className="flex w-full items-stretch">
                      {/* Row body — tap to tick off */}
                      <button
                        type="button"
                        onClick={() => toggleApplied(setting.id)}
                        aria-pressed={done}
                        aria-label={`Mark ${setting.name} as dialled in`}
                        className={[
                          "flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3 min-h-[56px] text-left transition-colors duration-150",
                          done ? "" : "hover:bg-neutral-800/30",
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
                      </button>

                      {/* The value — big enough to read from arm's length; tap to edit in place */}
                      <button
                        type="button"
                        onClick={() => setEditingId(editing ? null : setting.id)}
                        aria-expanded={editing}
                        aria-label={`Edit ${setting.name} value`}
                        className={[
                          "shrink-0 px-3.5 min-h-[56px] text-xl font-bold tnum transition-colors duration-150",
                          editing
                            ? "text-white bg-neutral-800/50"
                            : done
                              ? "text-neutral-600 hover:bg-neutral-800/30"
                              : "text-accent hover:bg-neutral-800/30",
                        ].join(" ")}
                      >
                        {entry !== undefined ? formatValue(setting, entry.value) : "—"}
                      </button>
                    </div>

                    {/* Inline value editor */}
                    {editing && (
                      <div className="px-3.5 pb-3 pt-1 item-enter">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <SettingValueInput
                              setting={setting}
                              value={entry?.value ?? rec}
                              onChange={(v) => updateValue(setting.id, v)}
                              autoFocus
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="bg-accent text-black rounded-lg px-4 min-h-[44px] font-semibold text-sm transition-[filter] duration-150 hover:brightness-110"
                          >
                            Done
                          </button>
                        </div>
                        {String(entry?.value) !== String(rec) && (
                          <button
                            type="button"
                            onClick={() => updateValue(setting.id, rec)}
                            className="mt-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-150"
                          >
                            Rec: <span className="text-accent font-semibold tnum">{formatValue(setting, rec)}</span>
                            <span className="text-neutral-600"> · tap to apply</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
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
