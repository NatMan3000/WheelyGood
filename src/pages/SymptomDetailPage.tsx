import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { symptomById } from "../data/symptoms/symptoms"
import { settingById } from "../data/settings"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { highlightAcronyms } from "../utils/highlightAcronyms"
import GameLogo from "../components/shared/GameLogo"
import Icon from "../components/shared/Icon"

export default function SymptomDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setup } = useSetup()
  const { gameId, game } = useGame()
  const [showAll, setShowAll] = useState(false)
  const symptom = id ? symptomById(id) : undefined

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

  const setupHardware = new Set(setup.components.map((c) => c.id))
  const sortedFixes = [...symptom.fixes].sort((a, b) => a.priority - b.priority)
  // A fix applies to your context if its hardware overlaps the active setup
  // (or has none) AND its game matches the active game (or has none).
  const inContext = (f: (typeof sortedFixes)[number]) =>
    (!f.hardware || f.hardware.some((h) => setupHardware.has(h))) &&
    (!f.game || f.game.includes(gameId))
  const contextFixes = sortedFixes.filter(inContext)
  const visibleFixes = showAll ? sortedFixes : contextFixes
  const hiddenCount = sortedFixes.length - contextFixes.length

  return (
    <div className="min-h-svh text-white">
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
                Try these fixes, in order
              </h2>
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
            </div>
            {visibleFixes.length === 0 && (
              <p className="text-sm text-neutral-500">
                No fixes specific to your {setup.shortName} + {game.name}.{" "}
                <button onClick={() => setShowAll(true)} className="text-accent">
                  Show all
                </button>
              </p>
            )}
            {visibleFixes.map((fix) => (
              <div
                key={`${fix.settingId}-${fix.priority}`}
                className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 space-y-1.5"
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
                    {settingById(fix.settingId)?.name ?? fix.settingId}
                  </Link>

                  {/* Direction */}
                  {fix.direction === "increase" ? (
                    <span className="text-emerald-400 text-sm">↑ Increase</span>
                  ) : (
                    <span className="text-red-400 text-sm">↓ Decrease</span>
                  )}

                  {/* Game-specific badge — this fix only applies in the named game(s) */}
                  {fix.game?.map((g) => <GameLogo key={g} gameId={g} className="h-5 w-5" />)}
                </div>

                {/* Explanation */}
                <p className="text-neutral-300 text-sm">{highlightAcronyms(fix.explanation)}</p>
              </div>
            ))}
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
