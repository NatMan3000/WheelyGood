import type { HardwareId, Setting, SettingCategory, SetupId } from "../types"
import { setupById } from "./setups"
import { fanatecDdSettings } from "./hardware/fanatec-dd"

// Aggregate of all settings across hardware + games.
// Phase 1 seed: ClubSport DD only. More modules added during bulk-authoring.
export const allSettings: Setting[] = [...fanatecDdSettings]

export function settingById(id: string): Setting | undefined {
  return allSettings.find((s) => s.id === id)
}

/** Hardware ids present in a given setup. */
function hardwareForSetup(setupId: SetupId): HardwareId[] {
  return setupById(setupId).components.map((c) => c.id)
}

/** Settings that apply to the active setup's hardware. */
export function settingsForSetup(setupId: SetupId): Setting[] {
  const hw = new Set(hardwareForSetup(setupId))
  return allSettings.filter((s) => s.hardware.some((h) => hw.has(h)))
}

export const categoryLabels: Record<SettingCategory, string> = {
  "wheel-base": "Wheel Base",
  pedals: "Pedals",
  "in-game": "In-Game",
  shifter: "Shifter",
  handbrake: "Handbrake",
}

/** Group settings by category, preserving a stable category order. */
export function groupByCategory(settings: Setting[]): { category: SettingCategory; label: string; settings: Setting[] }[] {
  const order: SettingCategory[] = ["wheel-base", "pedals", "shifter", "handbrake", "in-game"]
  return order
    .map((category) => ({
      category,
      label: categoryLabels[category],
      settings: settings.filter((s) => s.category === category),
    }))
    .filter((g) => g.settings.length > 0)
}
