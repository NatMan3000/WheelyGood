import type { GameId, HardwareId, Setting, SettingCategory, SettingValue, SetupId, SurfaceType } from "../types"
import { setupById } from "./setups"
import { fanatecDdSettings } from "./hardware/fanatec-dd"
import { fanatecV25Settings } from "./hardware/fanatec-v25"
import { cspV3Settings } from "./hardware/csp-v3"
import { cslElitePedalsV2Settings } from "./hardware/csl-elite-pedals-v2"
import { fanatecShifterSettings } from "./hardware/fanatec-shifter"
import { fanatecHandbrakeSettings } from "./hardware/fanatec-handbrake"
import { logitechG920Settings } from "./hardware/logitech-g920"
import { forzaHorizon6Settings } from "./games/forza-horizon-6"
import { f125Settings } from "./games/f1-25"

// Aggregate of all settings across hardware + games.
// NOTE: every entry is currently `unverified` — drafts for Nathan to confirm.
export const allSettings: Setting[] = [
  ...fanatecDdSettings,
  ...fanatecV25Settings,
  ...cspV3Settings,
  ...cslElitePedalsV2Settings,
  ...fanatecShifterSettings,
  ...fanatecHandbrakeSettings,
  ...logitechG920Settings,
  ...forzaHorizon6Settings,
  ...f125Settings,
]

export function settingById(id: string): Setting | undefined {
  return allSettings.find((s) => s.id === id)
}

/** Hardware ids present in a given setup. */
function hardwareForSetup(setupId: SetupId): HardwareId[] {
  return setupById(setupId).components.map((c) => c.id)
}

/**
 * Settings relevant to the active setup:
 *  - hardware settings whose `hardware` overlaps the setup's components, OR
 *  - in-game settings whose platform matches the setup's platform (or "all").
 */
export function settingsForSetup(setupId: SetupId): Setting[] {
  const setup = setupById(setupId)
  const hw = new Set(hardwareForSetup(setupId))
  return allSettings.filter((s) => {
    const hardwareMatch = s.hardware.some((h) => hw.has(h))
    const inGameMatch =
      s.category === "in-game" &&
      (!s.platform || s.platform.includes("all") || s.platform.includes(setup.platform))
    return hardwareMatch || inGameMatch
  })
}

/** Settings tied to a specific game (in-game category). */
export function settingsForGame(gameId: GameId): Setting[] {
  return allSettings.filter((s) => s.games?.includes(gameId))
}

/**
 * Best recommended value for a setting in a given context — a matching
 * `recommendation` if one exists, otherwise the valueType default.
 * Used by the profile editor to pre-fill values.
 */
export function recommendedValue(
  setting: Setting,
  opts: { game?: GameId; setup?: SetupId; surface?: SurfaceType } = {},
): SettingValue {
  const rec = setting.recommendations?.find(
    (r) =>
      (opts.game === undefined || r.game === opts.game) &&
      (opts.setup === undefined || r.setup === opts.setup) &&
      (opts.surface === undefined || r.surface === opts.surface),
  )
  if (rec) return rec.value
  return setting.valueType.default
}

export const games: { id: GameId; name: string }[] = [
  { id: "fh6", name: "Forza Horizon 6" },
  { id: "f1-25", name: "F1 25" },
]

export const categoryLabels: Record<SettingCategory, string> = {
  "wheel-base": "Wheel Base",
  pedals: "Pedals",
  "in-game": "In-Game",
  shifter: "Shifter",
  handbrake: "Handbrake",
}

/** Group settings by category, preserving a stable category order. */
export function groupByCategory(
  settings: Setting[],
): { category: SettingCategory; label: string; settings: Setting[] }[] {
  const order: SettingCategory[] = ["wheel-base", "pedals", "shifter", "handbrake", "in-game"]
  return order
    .map((category) => ({
      category,
      label: categoryLabels[category],
      settings: settings.filter((s) => s.category === category),
    }))
    .filter((g) => g.settings.length > 0)
}
