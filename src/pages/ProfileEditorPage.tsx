import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useProfiles } from "../hooks/useProfiles"
import { useSetup } from "../hooks/useSetup"
import { useGame } from "../hooks/useGame"
import type { NewProfileInput } from "../hooks/useProfiles"
import { setups } from "../data/setups"
import {
  games,
  settingsForSetup,
  groupByCategory,
  recommendedValue,
  formatValue,
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
  // New profiles start from the ACTIVE rig + game — you're almost always
  // saving settings for the thing you're currently tuning.

  const { setupId: activeSetupId } = useSetup()
  const { gameId: activeGameId } = useGame()
  const [name, setName] = useState("")
  const [setup, setSetup] = useState<SetupId>(activeSetupId)
  const [game, setGame] = useState<GameId>(activeGameId)
  const [surface, setSurface] = useState<SurfaceType | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const [settingValues, setSettingValues] = useState<
    Record<string, { value: SettingValue; notes?: string }>
  >({})

  // ── Initialise from existing profile (edit mode) ────────────────────────
  // Render-time state adjustment (the React-blessed pattern) rather than an
  // effect: re-seeds whenever the routed profile changes, e.g. after Duplicate
  // navigates to the copy while this component stays mounted.

  const [loadedProfileId, setLoadedProfileId] = useState<string | null>(null)
  if (isEditMode && existingProfile && loadedProfileId !== existingProfile.id) {
    setLoadedProfileId(existingProfile.id)
    setName(existingProfile.name)
    setSetup(existingProfile.setup)
    setGame(existingProfile.game)
    setSurface(existingProfile.surface)
    setNotes(existingProfile.notes ?? "")
    setSettingValues(existingProfile.settings)
  }

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

  // Changing context used to wipe settingValues so recommendations re-derive —
  // which silently destroyed every value the user had typed. Now edits are
  // kept: untouched settings still re-derive (they're not in settingValues),
  // and the per-setting "Rec" hint shows any drift with a one-tap apply.
  function handleSetupChange(newSetup: SetupId) {
    setSetup(newSetup)
  }

  function handleGameChange(newGame: GameId) {
    setGame(newGame)
  }

  function handleSurfaceChange(newSurface: SurfaceType | undefined) {
    setSurface(newSurface)
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
      navigate(`/saves/${id}`)
    } else {
      const created = createProfile(input)
      navigate(`/saves/${created.id}`)
    }
  }

  function handleDuplicate() {
    if (!id) return
    const copy = duplicateProfile(id)
    if (copy) navigate(`/saves/${copy.id}/edit`)
  }

  // Two-step inline delete — no blocking browser dialog. First tap arms it,
  // second tap (within 4s) deletes.
  const [deleteArmed, setDeleteArmed] = useState(false)
  const disarmTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (disarmTimer.current) clearTimeout(disarmTimer.current) }, [])

  function handleDelete() {
    if (!id) return
    if (!deleteArmed) {
      setDeleteArmed(true)
      disarmTimer.current = setTimeout(() => setDeleteArmed(false), 4000)
      return
    }
    if (disarmTimer.current) clearTimeout(disarmTimer.current)
    deleteProfile(id)
    navigate("/saves")
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
    <div className="mx-auto max-w-2xl">
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

                      {/* Drift from the recommendation for this context — one tap to apply */}
                      {(() => {
                        const rec = recommendedValue(setting, { game, setup, surface })
                        const current = getValueForSetting(setting)
                        if (String(current) === String(rec)) return null
                        return (
                          <button
                            type="button"
                            onClick={() => handleSettingValue(setting.id, rec)}
                            className="mt-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-150"
                          >
                            Rec: <span className="text-accent font-semibold tnum">{formatValue(setting, rec)}</span>
                            <span className="text-neutral-600"> · tap to apply</span>
                          </button>
                        )
                      })()}

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

      {/* ── Edit-only actions ── */}
      {isEditMode && (
        <div className="flex flex-wrap gap-3 pb-4">
          <button
            type="button"
            onClick={handleDuplicate}
            className="border border-neutral-700 rounded-lg px-4 min-h-[44px] text-sm transition-colors duration-150 hover:border-neutral-500"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={[
              "rounded-lg px-4 min-h-[44px] text-sm font-medium transition-colors duration-150 ml-auto",
              deleteArmed
                ? "bg-red-500/15 border border-red-500 text-red-300"
                : "border border-red-900 text-red-400 hover:border-red-700 hover:text-red-300",
            ].join(" ")}
          >
            {deleteArmed ? "Tap again to delete" : "Delete"}
          </button>
        </div>
      )}

      {/* ── Save bar — pinned so a long settings list never hides the exit ── */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 bg-accent text-black rounded-lg px-5 min-h-[44px] font-semibold text-sm transition-[filter,opacity] duration-150 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
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
      </div>
    </div>
  )
}
