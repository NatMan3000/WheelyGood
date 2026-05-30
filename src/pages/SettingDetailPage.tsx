import { Link, useNavigate, useParams } from "react-router-dom"
import { settingById } from "../data/settings"
import RangeIndicator from "../components/shared/RangeIndicator"
import DirectionCard from "../components/shared/DirectionCard"
import SettingChip from "../components/shared/SettingChip"

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
    <div className="min-h-svh bg-neutral-950 text-white">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 flex items-center gap-2 px-4 h-14 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-400 hover:text-white transition-colors duration-150 shrink-0"
        >
          ← Back
        </button>
        <span className="font-medium text-white truncate">{setting.name}</span>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-4 py-4 space-y-4">
        {/* Name + badges */}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{setting.name}</h1>
          {setting.abbreviation && (
            <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs">
              {setting.abbreviation}
            </span>
          )}
          {setting.unverified && (
            <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded px-2 py-0.5 text-xs">
              Unverified
            </span>
          )}
        </div>

        {/* Location */}
        <div className="inline-flex gap-2 text-sm text-neutral-400">
          <span>{accessLabel(setting.location.access)}</span>
          <span>·</span>
          <span className="text-neutral-200">{setting.location.path}</span>
        </div>

        {/* Description */}
        <p className="text-neutral-300">{setting.description}</p>

        {/* Range indicator */}
        <RangeIndicator valueType={setting.valueType} />

        {/* Direction cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          <DirectionCard direction="up" text={setting.increaseEffect} />
          <DirectionCard direction="down" text={setting.decreaseEffect} />
        </div>

        {/* Sweet spot */}
        {setting.sweetSpot && (
          <div className="rounded-lg bg-neutral-900 border-l-4 border-accent p-3">
            <p className="text-xs uppercase text-neutral-500 mb-1">Sweet spot</p>
            <p className="text-neutral-200 text-sm">{setting.sweetSpot}</p>
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
                  <span className="text-xs text-neutral-500 pl-1">{interaction.relationship}</span>
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
                ⚠️ {warning}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
