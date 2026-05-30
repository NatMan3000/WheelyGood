import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useProfiles } from "../hooks/useProfiles"
import type { NewProfileInput } from "../hooks/useProfiles"
import { exportProfileText } from "../utils/profileText"
import { setups } from "../data/setups"
import {
  games,
  settingsForSetup,
  groupByCategory,
  recommendedValue,
} from "../data/settings"
import type { GameId, SetupId, SurfaceType, SettingValue, Setting } from "../types"

// ── Constants ──────────────────────────────────────────────────────────────

const SURFACE_OPTIONS: { id: SurfaceType; label: string }[] = [
  { id: "tarmac", label: "Tarmac" },
  { id: "dirt", label: "Dirt" },
  { id: "snow", label: "Snow" },
  { id: "mixed", label: "Mixed" },
]

// ── Sub-components ─────────────────────────────────────────────────────────

interface PillButtonProps {
  label: string
  selected: boolean
  onClick: () => void
}

function PillButton({ label, selected, onClick }: PillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg px-4 min-h-[44px] border text-sm font-medium transition-colors duration-150",
        selected
          ? "border-accent bg-accent text-black"
          : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600",
      ].join(" ")}
    >
      {label}
    </button>
  )
}

// ── Setting value input ────────────────────────────────────────────────────

interface SettingInputProps {
  setting: Setting
  value: SettingValue
  onChange: (v: SettingValue) => void
}

function SettingInput({ setting, value, onChange }: SettingInputProps) {
  const vt = setting.valueType

  const inputClass =
    "rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] focus:border-accent outline-none text-white text-sm transition-colors duration-150 w-full"

  if (vt.kind === "enum") {
    return (
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {vt.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )
  }

  if (vt.kind === "numeric") {
    return (
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={vt.min}
          max={vt.max}
          step={vt.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputClass}
        />
        {vt.unit && (
          <span className="text-neutral-500 text-xs whitespace-nowrap">{vt.unit}</span>
        )}
      </div>
    )
  }

  // auto-or-numeric: text input accepting a number or "AUTO"
  // Display numeric value as a number; "AUTO" as text.
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        value={String(value)}
        placeholder="AUTO"
        onChange={(e) => {
          const raw = e.target.value.trim().toUpperCase()
          if (raw === "AUTO" || raw === "") {
            onChange("AUTO")
          } else {
            const n = Number(raw)
            if (!isNaN(n)) onChange(n)
            else onChange(e.target.value) // keep raw for intermediate typing
          }
        }}
        onBlur={(e) => {
          // Coerce on blur: empty → AUTO, numeric string → number
          const raw = e.target.value.trim().toUpperCase()
          if (raw === "" || raw === "AUTO") {
            onChange("AUTO")
          } else {
            const n = Number(raw)
            if (!isNaN(n)) onChange(Math.min(Math.max(n, vt.min), vt.max))
            else onChange("AUTO")
          }
        }}
        className={inputClass}
      />
      {vt.unit && (
        <span className="text-neutral-500 text-xs whitespace-nowrap">{vt.unit}</span>
      )}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function ProfileEditorPage() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const { getProfile, createProfile, updateProfile, deleteProfile, duplicateProfile } =
    useProfiles()

  const isEditMode = Boolean(id)
  const existingProfile = id ? getProfile(id) : undefined

  // ── Form state ──────────────────────────────────────────────────────────

  const [name, setName] = useState("")
  const [setup, setSetup] = useState<SetupId>(setups[0].id)
  const [game, setGame] = useState<GameId>(games[0].id)
  const [surface, setSurface] = useState<SurfaceType | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const [settingValues, setSettingValues] = useState<
    Record<string, { value: SettingValue; notes?: string }>
  >({})

  // ── Initialise from existing profile (edit mode) ────────────────────────

  useEffect(() => {
    if (isEditMode && existingProfile) {
      setName(existingProfile.name)
      setSetup(existingProfile.setup)
      setGame(existingProfile.game)
      setSurface(existingProfile.surface)
      setNotes(existingProfile.notes ?? "")
      setSettingValues(existingProfile.settings)
    }
  }, [isEditMode, existingProfile])

  // ── Recompute defaults when setup/game/surface changes ─────────────────
  // Only pre-fill recommended values for settings not yet in settingValues.

  // Filter to only include in-game settings for the currently selected game;
  // hardware/pedal/shifter/handbrake settings are always included.
  const currentSettings = settingsForSetup(setup).filter(
    (s) => s.category !== "in-game" || (s.games?.includes(game) ?? false),
  )
  const grouped = groupByCategory(currentSettings)

  const getValueForSetting = useCallback(
    (setting: Setting): SettingValue => {
      const stored = settingValues[setting.id]
      if (stored !== undefined) return stored.value
      return recommendedValue(setting, { game, setup, surface })
    },
    [settingValues, game, setup, surface],
  )

  // When setup changes, reset stored values so they re-derive from recommendations
  function handleSetupChange(newSetup: SetupId) {
    setSetup(newSetup)
    setSettingValues({})
  }

  function handleGameChange(newGame: GameId) {
    setGame(newGame)
    setSettingValues({})
  }

  function handleSurfaceChange(newSurface: SurfaceType | undefined) {
    setSurface(newSurface)
    setSettingValues({})
  }

  function handleSettingValue(settingId: string, value: SettingValue) {
    setSettingValues((prev) => ({
      ...prev,
      [settingId]: { ...prev[settingId], value },
    }))
  }

  function handleSettingNotes(settingId: string, noteText: string) {
    setSettingValues((prev) => {
      // If the setting hasn't been touched yet, seed its value from the recommendation
      // before we write notes — otherwise value would be blank.
      const setting = currentSettings.find((s) => s.id === settingId)
      const existingValue =
        prev[settingId]?.value ?? (setting ? recommendedValue(setting, { game, setup, surface }) : "")
      return {
        ...prev,
        [settingId]: { value: existingValue, notes: noteText || undefined },
      }
    })
  }

  // ── Build final settings record (merges defaults + overrides) ──────────

  function buildSettingsRecord(): Record<string, { value: SettingValue; notes?: string }> {
    const record: Record<string, { value: SettingValue; notes?: string }> = {}
    for (const setting of currentSettings) {
      const value = getValueForSetting(setting)
      const storedNotes = settingValues[setting.id]?.notes
      record[setting.id] = { value, ...(storedNotes ? { notes: storedNotes } : {}) }
    }
    return record
  }

  // ── Actions ─────────────────────────────────────────────────────────────

  function handleSave() {
    if (!name.trim()) return

    const input: NewProfileInput = {
      name: name.trim(),
      setup,
      game,
      surface,
      notes: notes.trim() || undefined,
      settings: buildSettingsRecord(),
    }

    if (isEditMode && id) {
      updateProfile(id, input)
      navigate("/saves")
    } else {
      const created = createProfile(input)
      navigate(`/saves/${created.id}`)
    }
  }

  function handleDuplicate() {
    if (!id) return
    const copy = duplicateProfile(id)
    if (copy) navigate(`/saves/${copy.id}`)
  }

  function handleDelete() {
    if (!id) return
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProfile(id)
      navigate("/saves")
    }
  }

  const [copied, setCopied] = useState(false)

  function handleExport() {
    if (!id || !existingProfile) return
    navigator.clipboard.writeText(exportProfileText(existingProfile)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Not found (edit mode, bad id) ───────────────────────────────────────

  if (isEditMode && id && !existingProfile) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium">Profile not found.</p>
        <Link
          to="/saves"
          className="text-accent text-sm mt-4 inline-block hover:underline"
        >
          Back to Saves
        </Link>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="pb-12">
      {/* Page header */}
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        {isEditMode ? "Edit Profile" : "New Profile"}
      </h1>
      <p className="text-neutral-400 text-sm mb-6">
        {isEditMode ? existingProfile?.name : "Set up your wheel configuration"}
      </p>

      {/* ── Profile metadata ── */}
      <section className="mb-6">
        {/* Name */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-wide text-neutral-500 block mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. FH6 Tarmac — High grip"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] placeholder-neutral-500 focus:border-accent outline-none text-white transition-colors duration-150"
          />
        </div>

        {/* Setup selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Setup</p>
          <div className="flex flex-wrap gap-2">
            {setups.map((s) => (
              <PillButton
                key={s.id}
                label={s.shortName}
                selected={setup === s.id}
                onClick={() => handleSetupChange(s.id as SetupId)}
              />
            ))}
          </div>
        </div>

        {/* Game selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Game</p>
          <div className="flex flex-wrap gap-2">
            {games.map((g) => (
              <PillButton
                key={g.id}
                label={g.name}
                selected={game === g.id}
                onClick={() => handleGameChange(g.id)}
              />
            ))}
          </div>
        </div>

        {/* Surface selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Surface <span className="normal-case text-neutral-600">(optional)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <PillButton
              label="None"
              selected={surface === undefined}
              onClick={() => handleSurfaceChange(undefined)}
            />
            {SURFACE_OPTIONS.map((opt) => (
              <PillButton
                key={opt.id}
                label={opt.label}
                selected={surface === opt.id}
                onClick={() => handleSurfaceChange(opt.id)}
              />
            ))}
          </div>
        </div>

        {/* Profile notes */}
        <div>
          <label className="text-xs uppercase tracking-wide text-neutral-500 block mb-2">
            Notes <span className="normal-case text-neutral-600">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Track conditions, car, any context…"
            rows={2}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 placeholder-neutral-500 focus:border-accent outline-none text-white text-sm resize-none transition-colors duration-150"
          />
        </div>
      </section>

      {/* ── Settings ── */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>

        {grouped.length === 0 ? (
          <p className="text-neutral-500 text-sm">No settings available for this setup.</p>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ category, label, settings }) => (
              <div key={category}>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">{label}</p>
                <div className="rounded-lg bg-neutral-900 border border-neutral-800 divide-y divide-neutral-800">
                  {settings.map((setting) => (
                    <div key={setting.id} className="p-3">
                      {/* Setting name + abbreviation */}
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <div className="flex items-baseline gap-2 min-w-0">
                          <span className="text-sm font-medium text-white truncate">
                            {setting.name}
                          </span>
                          {setting.abbreviation && (
                            <span className="text-xs text-neutral-500 shrink-0">
                              {setting.abbreviation}
                            </span>
                          )}
                        </div>
                        {setting.unverified && (
                          <span className="text-xs text-amber-500 shrink-0">draft</span>
                        )}
                      </div>

                      {/* Value input */}
                      <SettingInput
                        setting={setting}
                        value={getValueForSetting(setting)}
                        onChange={(v) => handleSettingValue(setting.id, v)}
                      />

                      {/* Optional per-setting notes */}
                      <input
                        type="text"
                        value={settingValues[setting.id]?.notes ?? ""}
                        onChange={(e) => handleSettingNotes(setting.id, e.target.value)}
                        placeholder="Setting note (optional)"
                        className="mt-2 w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 placeholder-neutral-600 focus:border-accent outline-none transition-colors duration-150"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Primary actions ── */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!name.trim()}
          className="bg-accent text-black rounded-lg px-5 min-h-[44px] font-semibold text-sm transition-[filter,opacity] duration-150 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
        >
          {isEditMode ? "Save changes" : "Create profile"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="border border-neutral-700 rounded-lg px-5 min-h-[44px] text-sm font-medium transition-colors duration-150 hover:border-neutral-500"
        >
          Cancel
        </button>
      </div>

      {/* ── Edit-only actions ── */}
      {isEditMode && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleDuplicate}
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] text-sm transition-colors duration-150 hover:border-neutral-500"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] text-sm transition-colors duration-150 hover:border-neutral-500"
          >
            {copied ? "Copied!" : "Export"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="border border-red-900 text-red-400 rounded-lg px-4 min-h-[44px] text-sm transition-colors duration-150 hover:border-red-700 hover:text-red-300 ml-auto"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
