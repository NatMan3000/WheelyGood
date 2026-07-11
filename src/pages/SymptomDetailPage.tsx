import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { symptomById, contextFixes } from "../data/symptoms/symptoms"
import { settingById, contextValue, formatValue } from "../data/settings"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { highlightAcronyms } from "../utils/highlightAcronyms"
import GameLogo from "../components/shared/GameLogo"
import Icon from "../components/shared/Icon"

/*
  Symptom page doubles as a fix SESSION: fixes are meant to be tried in
  order, one at a time, with laps in between — so each fix carries a
  persistent "Helped / No change" verdict (localStorage per symptom). You
  can put the phone down, race, and come back knowing where you were up to.
*/

type FixVerdict = "helped" | "nope"

function fixKey(settingId: string, priority: number) {
  return `${settingId}-${priority}`
}

export default function SymptomDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setupId, setup } = useSetup()
  const { gameId, game } = useGame()
  const [showAll, setShowAll] = useState(false)
  const symptom = id ? symptomById(id) : undefined
  usePageTitle(symptom?.name)

  const [verdicts, setVerdicts] = useLocalStorage<Record<string, FixVerdict>>(
    `wg-fixlog-${id}`,
    {},
  )

  if (!symptom) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-neutral-400">Symptom not found.</p>
        <Link to="/fix" className="text-accent text-sm">
          Back to Troubleshooter
        </Link>
      </div>
    )
  }

  const hardware = new Set(setup.components.map((c) => c.id))
  const sortedFixes = [...symptom.fixes].sort((a, b) => a.priority - b.priority)
  const rigFixes = contextFixes(symptom, hardware, gameId)
  const rigKeys = new Set(rigFixes.map((f) => fixKey(f.settingId, f.priority)))
  const visibleFixes = showAll ? sortedFixes : sortedFixes.filter((f) => rigKeys.has(fixKey(f.settingId, f.priority)))
  const hiddenCount = sortedFixes.length - rigFixes.length

  const verdictCount = Object.keys(verdicts).length

  function setVerdict(key: string, v: FixVerdict) {
    // Tapping the same verdict again clears it.
    const next = { ...verdicts }
    if (next[key] === v) delete next[key]
    else next[key] = v
    setVerdicts(next)
  }

  return (
    <div className="min-h-svh text-white tread-surface">
      {/* Minimal back control — no duplicated title; the hero below owns it. */}
      {/* box-content keeps the h-14 button row intact while pt adds the iOS
          status-bar safe area above it (these full-screen pages sit outside
          the AppShell, so they handle the top inset themselves). */}
      <div className="sticky top-0 z-10 px-4 h-14 box-content pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))] flex items-center bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/0">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 -ml-1 rounded-lg pl-1 pr-2.5 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors duration-150"
        >
          <Icon name="back" className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-4 pb-8 -mt-1 space-y-4 sheet-enter">
        {/* Hero */}
        <div>
          <span className="inline-flex items-center rounded-full bg-accent/15 text-accent border border-accent/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide capitalize mb-2">
            {symptom.area}
          </span>
          <h1 className="text-2xl font-bold tracking-tight leading-tight">{symptom.name}</h1>
        </div>

        {/* Description */}
        <p className="text-neutral-300">{highlightAcronyms(symptom.description)}</p>

        {/* Fixes */}
        {sortedFixes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-sm font-medium text-neutral-300">
                Try these in order — race a few corners between each
              </h2>
              <span className="flex items-center gap-3">
                {verdictCount > 0 && (
                  <button
                    onClick={() => setVerdicts({})}
                    className="text-xs text-neutral-500 hover:text-white transition-colors duration-150"
                  >
                    Clear session
                  </button>
                )}
                {hiddenCount > 0 && (
                  <button
                    onClick={() => setShowAll((v) => !v)}
                    className="text-xs text-neutral-400 hover:text-accent transition-colors duration-150"
                  >
                    {showAll
                      ? `Showing everything · filter to ${setup.shortName} + ${game.name}`
                      : `Showing ${setup.shortName} + ${game.name} · show all (+${hiddenCount})`}
                  </button>
                )}
              </span>
            </div>
            {visibleFixes.length === 0 && (
              <p className="text-sm text-neutral-500">
                No fixes specific to your {setup.shortName} + {game.name}.{" "}
                <button onClick={() => setShowAll(true)} className="text-accent">
                  Show all
                </button>
              </p>
            )}
            {visibleFixes.map((fix) => {
              const key = fixKey(fix.settingId, fix.priority)
              const verdict = verdicts[key]
              const setting = settingById(fix.settingId)
              // Current dial-to value for this rig — only meaningful when the
              // setting actually belongs to the active hardware/game.
              const inRig = rigKeys.has(key) && setting !== undefined
              const cv = inRig && setting ? contextValue(setting, setupId, gameId) : null
              return (
                <div
                  key={key}
                  className={[
                    "rounded-lg border p-3 space-y-2 transition-colors duration-150",
                    verdict === "helped"
                      ? "bg-accent/[0.06] border-accent/40"
                      : verdict === "nope"
                        ? "bg-neutral-900/50 border-neutral-800 opacity-60"
                        : "bg-neutral-900 border-neutral-800",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Priority badge */}
                    <span className="bg-accent text-black rounded-full w-6 h-6 grid place-items-center text-xs font-bold shrink-0 tnum">
                      {fix.priority}
                    </span>

                    {/* Setting name link */}
                    <Link
                      to={`/setting/${fix.settingId}`}
                      className="text-accent hover:underline font-medium text-sm"
                    >
                      {setting?.name ?? fix.settingId}
                    </Link>

                    {/* Direction */}
                    {fix.direction === "increase" ? (
                      <span className="text-emerald-400 text-sm">↑ Increase</span>
                    ) : (
                      <span className="text-red-400 text-sm">↓ Decrease</span>
                    )}

                    {/* Game-specific badge — this fix only applies in the named game(s) */}
                    {fix.game?.map((g) => <GameLogo key={g} gameId={g} className="h-5 w-5" />)}

                    {/* Where you're starting from, for your rig */}
                    {cv && (
                      <span className="ml-auto text-xs text-neutral-500 shrink-0">
                        your rig{" "}
                        <span className={cv.source === "rec" ? "text-accent font-semibold tnum" : "text-neutral-300 font-semibold tnum"}>
                          {setting ? formatValue(setting, cv.value) : ""}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Explanation */}
                  <p className="text-neutral-300 text-sm">{highlightAcronyms(fix.explanation)}</p>

                  {/* Verdict buttons — the fix-session state */}
                  <div className="flex gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setVerdict(key, "helped")}
                      aria-pressed={verdict === "helped"}
                      className={[
                        "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium border transition-colors duration-150",
                        verdict === "helped"
                          ? "bg-accent text-black border-accent"
                          : "border-neutral-700 text-neutral-400 hover:border-neutral-500",
                      ].join(" ")}
                    >
                      Helped ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerdict(key, "nope")}
                      aria-pressed={verdict === "nope"}
                      className={[
                        "rounded-lg px-3 py-1.5 min-h-[36px] text-xs font-medium border transition-colors duration-150",
                        verdict === "nope"
                          ? "bg-neutral-700 text-white border-neutral-600"
                          : "border-neutral-700 text-neutral-400 hover:border-neutral-500",
                      ].join(" ")}
                    >
                      No change
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Related symptoms */}
        {symptom.relatedSymptoms && symptom.relatedSymptoms.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-neutral-300">Related</h2>
            <div className="flex flex-wrap gap-2">
              {symptom.relatedSymptoms.map((relId: string) => (
                <Link
                  key={relId}
                  to={`/symptom/${relId}`}
                  className="inline-flex items-center rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 hover:border-accent transition-colors duration-150"
                >
                  {symptomById(relId)?.name ?? relId}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
