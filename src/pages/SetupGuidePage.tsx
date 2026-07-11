import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePageTitle } from "../hooks/usePageTitle"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import { useProfiles } from "../hooks/useProfiles"
import {
  settingsForContext,
  groupByCategory,
  contextValue,
  recommendedValue,
  formatValue,
  settingById,
} from "../data/settings"
import { highlightAcronyms } from "../utils/highlightAcronyms"
import type { SettingValue } from "../types"
import OledTag from "../components/shared/OledTag"
import ContextPicker from "../components/shared/ContextPicker"
import DirectionCard from "../components/shared/DirectionCard"
import SettingChip from "../components/shared/SettingChip"
import Icon from "../components/shared/Icon"

/*
  The day-one flow: fresh wheel or new game, walk every setting for the
  active rig + game in wheel-menu order — one at a time, value front and
  centre, with where-to-find-it and why. Position persists per rig+game so
  a half-finished walk-through resumes where it left off.

  Step index convention: -1 = intro screen, 0..n-1 = settings, n = done.
*/

export default function SetupGuidePage() {
  usePageTitle("Setup Guide")
  const navigate = useNavigate()
  const { setupId, setup } = useSetup()
  const { gameId, game } = useGame()
  const { createProfile } = useProfiles()

  const steps = groupByCategory(settingsForContext(setupId, gameId)).flatMap((g) =>
    g.settings.map((setting) => ({ setting, categoryLabel: g.label })),
  )
  const total = steps.length

  const [pos, setPos] = useLocalStorage<number>(`wg-guide-pos-${setupId}-${gameId}`, -1)
  const clamped = Math.max(-1, Math.min(pos, total))

  // "Full detail" expander — keyed by setting id so moving to another step
  // collapses it automatically.
  const [expandedStep, setExpandedStep] = useState<string | null>(null)

  function saveAsProfile() {
    const settings: Record<string, { value: SettingValue }> = {}
    for (const { setting } of steps) {
      settings[setting.id] = { value: recommendedValue(setting, { game: gameId, setup: setupId }) }
    }
    const created = createProfile({
      name: `${game.name} — Guide (${setup.shortName})`,
      setup: setupId,
      game: gameId,
      settings,
    })
    navigate(`/saves/${created.id}`)
  }

  const step = clamped >= 0 && clamped < total ? steps[clamped] : null
  const cv = step ? contextValue(step.setting, setupId, gameId) : null
  const rec =
    step?.setting.recommendations?.find((r) => r.setup === setupId && r.game === gameId) ?? null

  return (
    <div className="min-h-svh text-white tread-surface flex flex-col">
      {/* Back bar (full-screen page outside the shell — handles its own inset) */}
      <div className="sticky top-0 z-10 px-4 h-14 box-content pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))] flex items-center justify-between bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950/0">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 -ml-1 rounded-lg pl-1 pr-2.5 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors duration-150"
        >
          <Icon name="back" className="h-5 w-5" />
          Back
        </button>
        {clamped >= 0 && (
          <span className="text-xs text-neutral-500 tnum">
            {Math.min(clamped + 1, total)} / {total}
          </span>
        )}
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 pb-8 flex-1 flex flex-col">
        {/* Progress */}
        {clamped >= 0 && (
          <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${total ? (Math.min(clamped, total) / total) * 100 : 0}%` }}
            />
          </div>
        )}

        {/* ── Intro ── */}
        {clamped === -1 && (
          <div className="sheet-enter space-y-5 my-auto">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Setup Guide</h1>
              <p className="text-neutral-400 mt-1.5">
                Every setting for your rig, one at a time, in the order the menus show them —
                what to set and why.
              </p>
            </div>

            {/* Pick the rig + game right here — drives the same global
                context as everywhere else, and the step list / tuning-menu
                card below update live. */}
            <ContextPicker />

            {setup.tuningMenuAccess && (
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                  Opening the tuning menu
                </p>
                <p className="text-sm text-neutral-300">{setup.tuningMenuAccess}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setPos(0)}
              className="w-full bg-accent text-black rounded-lg px-5 min-h-[48px] font-semibold text-sm transition-[filter] duration-150 hover:brightness-110"
            >
              Start — {total} settings
            </button>
          </div>
        )}

        {/* ── Step ── */}
        {step && cv && (
          <div key={step.setting.id} className="sheet-enter flex-1 flex flex-col">
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
              {step.categoryLabel}
            </p>

            <div className="flex items-start gap-3">
              <OledTag code={step.setting.abbreviation} />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold tracking-tight leading-tight">
                  {step.setting.name}
                </h1>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {highlightAcronyms(step.setting.location.path)}
                </p>
              </div>
            </div>

            {/* The number to dial in */}
            <div className="my-6 text-center">
              <span className={["text-5xl font-bold tnum", cv.source === "rec" ? "text-accent" : "text-neutral-100"].join(" ")}>
                {formatValue(step.setting, cv.value)}
              </span>
              <p className="text-[11px] uppercase tracking-wide text-neutral-500 mt-2">
                {cv.source === "rec" ? "recommended for your rig" : "hardware default"}
              </p>
            </div>

            {/* Why */}
            <div className="space-y-3">
              <p className="text-sm text-neutral-300">{highlightAcronyms(step.setting.description)}</p>
              {rec?.notes ? (
                <div className="rounded-lg border border-accent/30 bg-accent/[0.07] p-3">
                  <p className="text-sm text-neutral-200">{highlightAcronyms(rec.notes)}</p>
                </div>
              ) : step.setting.sweetSpot ? (
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                    Sweet spot
                  </p>
                  <p className="text-sm text-neutral-300">{highlightAcronyms(step.setting.sweetSpot)}</p>
                </div>
              ) : null}
              {/* Full detail — expands in place, no detour off the guide */}
              {(() => {
                const s = step.setting
                const expanded = expandedStep === s.id
                return (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setExpandedStep(expanded ? null : s.id)}
                      aria-expanded={expanded}
                      className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-accent transition-colors duration-150"
                    >
                      Full detail
                      <Icon
                        name="chevron-down"
                        className={[
                          "h-3.5 w-3.5 transition-transform duration-150",
                          expanded ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>

                    {expanded && (
                      <div className="space-y-3 item-enter">
                        {/* Long-form official detail */}
                        {s.details &&
                          s.details.split("\n\n").map((para, i) => {
                            const tip = para.startsWith("TIP:")
                            return (
                              <p key={i} className={tip ? "text-sm text-accent" : "text-sm text-neutral-400"}>
                                {highlightAcronyms(para)}
                              </p>
                            )
                          })}

                        {/* Direction cards */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          <DirectionCard direction="up" text={s.increaseEffect} />
                          <DirectionCard direction="down" text={s.decreaseEffect} />
                        </div>

                        {/* Sweet spot — only if the rec note took its slot above */}
                        {rec?.notes && s.sweetSpot && (
                          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                              Sweet spot
                            </p>
                            <p className="text-sm text-neutral-300">{highlightAcronyms(s.sweetSpot)}</p>
                          </div>
                        )}

                        {/* Interactions */}
                        {s.interactsWith && s.interactsWith.length > 0 && (
                          <div className="space-y-2">
                            {s.interactsWith.map((interaction) => (
                              <div key={interaction.settingId} className="flex flex-col gap-0.5">
                                <SettingChip
                                  id={interaction.settingId}
                                  label={settingById(interaction.settingId)?.name ?? interaction.settingId}
                                />
                                <span className="text-xs text-neutral-500 pl-1">
                                  {highlightAcronyms(interaction.relationship)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warnings */}
                        {s.warnings && s.warnings.length > 0 && (
                          <ul className="space-y-1">
                            {s.warnings.map((warning, i) => (
                              <li key={i} className="text-sm text-amber-400">
                                ⚠️ {highlightAcronyms(warning)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>

            {/* Nav */}
            <div className="mt-auto pt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPos(clamped - 1)}
                className="border border-neutral-700 rounded-lg px-5 min-h-[48px] text-sm font-medium transition-colors duration-150 hover:border-neutral-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPos(clamped + 1)}
                className="flex-1 bg-accent text-black rounded-lg px-5 min-h-[48px] font-semibold text-sm transition-[filter] duration-150 hover:brightness-110"
              >
                {clamped === total - 1 ? "Finish" : "Set it — next"}
              </button>
            </div>
          </div>
        )}

        {/* ── Done ── */}
        {clamped >= total && total > 0 && (
          <div className="sheet-enter my-auto text-center space-y-5">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-black">
              <Icon name="check" className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dialled in</h1>
              <p className="text-neutral-400 text-sm mt-1">
                All {total} settings for {setup.shortName} + {game.name}.
              </p>
            </div>
            <button
              type="button"
              onClick={saveAsProfile}
              className="w-full bg-accent text-black rounded-lg px-5 min-h-[48px] font-semibold text-sm transition-[filter] duration-150 hover:brightness-110"
            >
              Save as a profile
            </button>
            <button
              type="button"
              onClick={() => setPos(-1)}
              className="text-xs text-neutral-500 hover:text-white transition-colors duration-150"
            >
              Start again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
