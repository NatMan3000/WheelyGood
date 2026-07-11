import { useState } from "react"
import { Link } from "react-router-dom"
import { useProfiles } from "../hooks/useProfiles"
import { useSetup } from "../hooks/useSetup"
import {
  settingById,
  groupByCategory,
  games,
  settingsForContext,
  recommendedValue,
} from "../data/settings"
import { setupById } from "../data/setups"
import type { Profile, Setting } from "../types"

// ── Helpers ────────────────────────────────────────────────────────────────

function profileLabel(profileId: string, profiles: Profile[]): string {
  const p = profiles.find((x) => x.id === profileId)
  if (!p) return "—"
  const setup = setupById(p.setup)
  const gameName = games.find((g) => g.id === p.game)?.name ?? p.game
  return `${p.name} (${setup.shortName} / ${gameName})`
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function ProfileComparePage() {
  const { profiles } = useProfiles()
  const { setupId, setup } = useSetup()

  const [aId, setAId] = useState<string>(() => profiles[0]?.id ?? "")
  const [bId, setBId] = useState<string>(() => profiles[1]?.id ?? "")
  const [diffOnly, setDiffOnly] = useState(false)

  // Synthetic "recommended" profiles for the active rig — lets a saved
  // profile answer "what have I actually changed from stock?" without
  // needing a second real profile.
  const recommendedProfiles: Profile[] = games.map((g) => ({
    id: `rec-${setupId}-${g.id}`,
    name: `★ Recommended`,
    setup: setupId,
    game: g.id,
    createdAt: "",
    updatedAt: "",
    settings: Object.fromEntries(
      settingsForContext(setupId, g.id).map((s) => [
        s.id,
        { value: recommendedValue(s, { game: g.id, setup: setupId }) },
      ]),
    ),
  }))

  const allProfiles = [...profiles, ...recommendedProfiles]

  // Fall back gracefully when a stored selection vanishes (deleted profile,
  // setup switch changing synthetic ids) — and default B to "recommended"
  // when there's only one real profile.
  const aSel = allProfiles.some((p) => p.id === aId) ? aId : profiles[0]?.id ?? ""
  const aGame = allProfiles.find((p) => p.id === aSel)?.game
  const bSel = allProfiles.some((p) => p.id === bId)
    ? bId
    : profiles[1]?.id ??
      recommendedProfiles.find((r) => r.game === aGame)?.id ??
      recommendedProfiles[0]?.id ??
      ""

  const profileA = allProfiles.find((p) => p.id === aSel)
  const profileB = allProfiles.find((p) => p.id === bSel)

  // ── Compute diff ────────────────────────────────────────────────────────

  interface DiffRow {
    setting: Setting
    valueA: string
    valueB: string
    differs: boolean
  }

  // Plain computation — no memo. The synthetic recommended profiles are
  // rebuilt every render (new identities), so memoizing on them buys nothing,
  // and the diff over ~40 settings is trivial.
  const { grouped, diffCount } = (() => {
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
  })()

  const selectClass =
    "rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] focus:border-accent outline-none text-white text-sm transition-colors duration-150 w-full"

  // ── Guard: need at least 1 saved profile (after hooks, per rules-of-hooks).
  // One is enough — the synthetic ★ Recommended profiles cover side B.

  if (profiles.length < 1) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium">Nothing to compare yet.</p>
        <p className="text-neutral-400 text-sm mt-1">
          Save a profile first — then compare it against another, or against the
          recommended values for your rig.
        </p>
        <Link
          to="/saves/new"
          className="bg-accent text-black rounded-lg px-4 min-h-[44px] inline-flex items-center font-medium text-sm mt-4 mx-auto transition-colors duration-150"
        >
          New profile
        </Link>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compare</h1>
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
            value={aSel}
            onChange={(e) => setAId(e.target.value)}
            className={selectClass}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {profileLabel(p.id, allProfiles)}
              </option>
            ))}
            <optgroup label={`Recommended — ${setup.shortName}`}>
              {recommendedProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {profileLabel(p.id, allProfiles)}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1.5">Profile B</p>
          <select
            value={bSel}
            onChange={(e) => setBId(e.target.value)}
            className={selectClass}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {profileLabel(p.id, allProfiles)}
              </option>
            ))}
            <optgroup label={`Recommended — ${setup.shortName}`}>
              {recommendedProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {profileLabel(p.id, allProfiles)}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Same profile selected */}
      {aSel === bSel && (
        <p className="text-amber-400 text-sm mb-4">Select two different profiles to compare.</p>
      )}

      {/* Diff summary */}
      {profileA && profileB && aSel !== bSel && (
        <>
          <div className="flex items-center justify-between gap-2 mb-4">
            <p className="text-sm text-neutral-400">
              {diffCount === 0 ? (
                <span className="text-neutral-300">Profiles are identical.</span>
              ) : (
                <>
                  <span className="text-white font-medium">{diffCount}</span>{" "}
                  {diffCount === 1 ? "setting differs" : "settings differ"}
                </>
              )}
            </p>
            {diffCount > 0 && (
              <button
                type="button"
                onClick={() => setDiffOnly((v) => !v)}
                aria-pressed={diffOnly}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150",
                  diffOnly
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-500",
                ].join(" ")}
              >
                Differences only
              </button>
            )}
          </div>

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
                  {grouped
                    .map((g) => ({
                      ...g,
                      rows: diffOnly ? g.rows.filter((r) => r.differs) : g.rows,
                    }))
                    .filter((g) => g.rows.length > 0)
                    .map(({ category, label, rows }) => (
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
                              differs ? "bg-amber-500/[0.07]" : "",
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
