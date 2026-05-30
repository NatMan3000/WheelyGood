import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useProfiles } from "../hooks/useProfiles"
import { settingById, groupByCategory, games } from "../data/settings"
import { setupById } from "../data/setups"
import type { Setting } from "../types"

// ── Helpers ────────────────────────────────────────────────────────────────

function profileLabel(
  profileId: string,
  profiles: ReturnType<typeof useProfiles>["profiles"],
): string {
  const p = profiles.find((x) => x.id === profileId)
  if (!p) return "—"
  const setup = setupById(p.setup)
  const gameName = games.find((g) => g.id === p.game)?.name ?? p.game
  return `${p.name} (${setup.shortName} / ${gameName})`
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function ProfileComparePage() {
  const { profiles } = useProfiles()

  const [aId, setAId] = useState<string>(() => profiles[0]?.id ?? "")
  const [bId, setBId] = useState<string>(() => profiles[1]?.id ?? "")

  // ── Guard: need at least 2 profiles ────────────────────────────────────

  if (profiles.length < 2) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium">Need at least two profiles to compare.</p>
        <p className="text-neutral-400 text-sm mt-1">Create a second profile first.</p>
        <Link
          to="/saves/new"
          className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm mt-4 mx-auto transition-colors duration-150"
        >
          New profile
        </Link>
      </div>
    )
  }

  const profileA = profiles.find((p) => p.id === aId)
  const profileB = profiles.find((p) => p.id === bId)

  // ── Compute diff ────────────────────────────────────────────────────────

  interface DiffRow {
    setting: Setting
    valueA: string
    valueB: string
    differs: boolean
  }

  const { grouped, diffCount } = useMemo(() => {
    if (!profileA || !profileB) return { grouped: [], diffCount: 0 }

    // Union of all setting ids from both profiles
    const allIds = new Set([
      ...Object.keys(profileA.settings),
      ...Object.keys(profileB.settings),
    ])

    // Resolve to Setting objects (skip ids we can't resolve — orphaned data)
    const resolved: Setting[] = []
    for (const sid of allIds) {
      const s = settingById(sid)
      if (s) resolved.push(s)
    }

    // Build diff rows
    let diffs = 0
    const rows: DiffRow[] = resolved.map((setting) => {
      const vA = profileA.settings[setting.id]?.value
      const vB = profileB.settings[setting.id]?.value
      const strA = vA !== undefined ? String(vA) : "—"
      const strB = vB !== undefined ? String(vB) : "—"
      const differs = strA !== strB
      if (differs) diffs++
      return { setting, valueA: strA, valueB: strB, differs }
    })

    // Group by category
    const byCategory = groupByCategory(resolved)
    const groupedRows = byCategory.map(({ category, label }) => ({
      category,
      label,
      rows: rows.filter((r) => r.setting.category === category),
    }))

    return { grouped: groupedRows, diffCount: diffs }
  }, [profileA, profileB])

  const selectClass =
    "rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] focus:border-accent outline-none text-white text-sm transition-colors duration-150 w-full"

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compare</h1>
          <p className="text-neutral-400 text-sm mt-0.5">Side-by-side settings diff</p>
        </div>
        <Link
          to="/saves"
          className="border border-neutral-700 rounded-lg px-4 min-h-[44px] inline-flex items-center text-sm font-medium transition-colors duration-150 hover:border-neutral-500"
        >
          Back
        </Link>
      </div>

      {/* Profile selectors */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Profile A</p>
          <select
            value={aId}
            onChange={(e) => setAId(e.target.value)}
            className={selectClass}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {profileLabel(p.id, profiles)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Profile B</p>
          <select
            value={bId}
            onChange={(e) => setBId(e.target.value)}
            className={selectClass}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {profileLabel(p.id, profiles)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Same profile selected */}
      {aId === bId && (
        <p className="text-amber-400 text-sm mb-4">Select two different profiles to compare.</p>
      )}

      {/* Diff summary */}
      {profileA && profileB && aId !== bId && (
        <>
          <p className="text-sm text-neutral-400 mb-4">
            {diffCount === 0 ? (
              <span className="text-neutral-300">Profiles are identical.</span>
            ) : (
              <>
                <span className="text-white font-medium">{diffCount}</span>{" "}
                {diffCount === 1 ? "setting differs" : "settings differ"}
              </>
            )}
          </p>

          {/* Column headers */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="min-w-[320px]">
              {/* Sticky-ish profile name header */}
              <div className="grid grid-cols-[1fr_5rem_5rem] gap-2 mb-2 text-xs uppercase tracking-wide text-neutral-500">
                <span>Setting</span>
                <span className="text-center truncate text-accent">{profileA.name}</span>
                <span className="text-center truncate text-neutral-300">{profileB.name}</span>
              </div>

              {grouped.length === 0 ? (
                <p className="text-neutral-500 text-sm py-4 text-center">
                  No settings found for these profiles.
                </p>
              ) : (
                <div className="space-y-5">
                  {grouped.map(({ category, label, rows }) => (
                    <div key={category}>
                      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
                        {label}
                      </p>
                      <div className="rounded-lg bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800 overflow-hidden">
                        {rows.map(({ setting, valueA, valueB, differs }) => (
                          <div
                            key={setting.id}
                            className={[
                              "grid grid-cols-[1fr_5rem_5rem] gap-2 items-center px-3 py-2.5",
                              differs ? "border-l-2 border-amber-500" : "",
                            ].join(" ")}
                          >
                            {/* Setting name */}
                            <div className="min-w-0">
                              <span
                                className={[
                                  "text-sm truncate block",
                                  differs ? "text-white" : "text-neutral-500",
                                ].join(" ")}
                              >
                                {setting.name}
                              </span>
                              {setting.abbreviation && (
                                <span className="text-xs text-neutral-600">
                                  {setting.abbreviation}
                                </span>
                              )}
                            </div>

                            {/* Value A */}
                            <span
                              className={[
                                "text-sm text-center font-mono",
                                differs
                                  ? "text-accent font-semibold"
                                  : "text-neutral-500",
                              ].join(" ")}
                            >
                              {valueA}
                            </span>

                            {/* Value B */}
                            <span
                              className={[
                                "text-sm text-center font-mono",
                                differs
                                  ? "text-white font-semibold"
                                  : "text-neutral-500",
                              ].join(" ")}
                            >
                              {valueB}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
