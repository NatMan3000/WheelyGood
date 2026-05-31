import { Link, useNavigate, useParams } from "react-router-dom"
import { settingById } from "../data/settings"
import RangeIndicator from "../components/shared/RangeIndicator"
import DirectionCard from "../components/shared/DirectionCard"
import SettingChip from "../components/shared/SettingChip"
import OledTag from "../components/shared/OledTag"
import Icon from "../components/shared/Icon"
import { highlightAcronyms } from "../utils/highlightAcronyms"

function accessLabel(access: "on-wheel-tuning" | "in-game"): string {
  return access === "on-wheel-tuning" ? "On-wheel tuning" : "In-game"
}

export default function SettingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const setting = id ? settingById(id) : undefined

  if (!setting) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-neutral-400">Setting not found.</p>
        <Link to="/learn" className="text-accent text-sm">
          Back to Encyclopedia
        </Link>
      </div>
    )
  }

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
        {/* Hero — OLED tag tile + title, mirrors the encyclopedia list cards */}
        <div className="flex items-start gap-3">
          <OledTag code={setting.abbreviation} />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight leading-tight">{setting.name}</h1>
            {setting.unverified && (
              <span className="mt-1.5 inline-flex bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                Unverified
              </span>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="inline-flex gap-2 text-sm text-neutral-400">
          <span>{accessLabel(setting.location.access)}</span>
          <span>·</span>
          <span className="text-neutral-200">{highlightAcronyms(setting.location.path)}</span>
        </div>

        {/* Description */}
        <p className="text-neutral-300">{highlightAcronyms(setting.description)}</p>

        {/* Full official detail (e.g. verbatim FH6 article text) */}
        {setting.details && (
          <div className="space-y-2 rounded-lg bg-neutral-900/60 border border-neutral-800 p-3">
            {setting.details.split("\n\n").map((para, i) => {
              const tip = para.startsWith("TIP:")
              return (
                <p
                  key={i}
                  className={tip ? "text-sm text-accent" : "text-sm text-neutral-300"}
                >
                  {highlightAcronyms(para)}
                </p>
              )
            })}
          </div>
        )}

        {/* Range indicator */}
        <RangeIndicator valueType={setting.valueType} />

        {/* Direction cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          <DirectionCard direction="up" text={setting.increaseEffect} />
          <DirectionCard direction="down" text={setting.decreaseEffect} />
        </div>

        {/* Sweet spot */}
        {setting.sweetSpot && (
          <div className="rounded-lg border border-accent/30 bg-accent/[0.07] p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent mb-1">Sweet spot</p>
            <p className="text-neutral-200 text-sm">{highlightAcronyms(setting.sweetSpot)}</p>
          </div>
        )}

        {/* Interacts with */}
        {setting.interactsWith && setting.interactsWith.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-neutral-300 mb-2">Interacts with</h2>
            <div className="space-y-2">
              {setting.interactsWith.map((interaction) => (
                <div key={interaction.settingId} className="flex flex-col gap-0.5">
                  <SettingChip
                    id={interaction.settingId}
                    label={settingById(interaction.settingId)?.name ?? interaction.settingId}
                  />
                  <span className="text-xs text-neutral-500 pl-1">{highlightAcronyms(interaction.relationship)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {setting.warnings && setting.warnings.length > 0 && (
          <ul className="space-y-1">
            {setting.warnings.map((warning, i) => (
              <li key={i} className="text-sm text-amber-400">
                ⚠️ {highlightAcronyms(warning)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
