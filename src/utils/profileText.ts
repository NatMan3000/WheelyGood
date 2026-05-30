import type { NewProfileInput } from "../hooks/useProfiles"
import type { Profile, SettingValue } from "../types"
import { setupById } from "../data/setups"
import { games, settingById } from "../data/settings"

// Portable, paste-able representation of a profile for sharing (e.g. with Josh).
// Export = human-readable header + a machine-readable JSON block.
// Import = pull the JSON block back out (tolerant of surrounding text).

const MARKER = "WheelyGood Profile v1"

interface PortableProfile {
  wg: "profile"
  version: 1
  name: string
  setup: Profile["setup"]
  game: Profile["game"]
  surface?: Profile["surface"]
  notes?: string
  settings: Profile["settings"]
}

export function exportProfileText(profile: Profile): string {
  const setupName = setupById(profile.setup).name
  const gameName = games.find((g) => g.id === profile.game)?.name ?? profile.game

  const lines: string[] = [
    `${MARKER} — ${profile.name}`,
    `Setup: ${setupName} | Game: ${gameName}${profile.surface ? ` | Surface: ${profile.surface}` : ""}`,
    "",
  ]
  for (const [id, entry] of Object.entries(profile.settings)) {
    const s = settingById(id)
    const label = s ? `${s.name}${s.abbreviation ? ` (${s.abbreviation})` : ""}` : id
    lines.push(`- ${label}: ${entry.value}${entry.notes ? `  // ${entry.notes}` : ""}`)
  }
  if (profile.notes) lines.push("", `Notes: ${profile.notes}`)

  const portable: PortableProfile = {
    wg: "profile",
    version: 1,
    name: profile.name,
    setup: profile.setup,
    game: profile.game,
    surface: profile.surface,
    notes: profile.notes,
    settings: profile.settings,
  }
  lines.push("", "--- import data (keep this) ---", JSON.stringify(portable))
  return lines.join("\n")
}

/** Parse exported text (or raw JSON) back into a creatable profile. Returns null if invalid. */
export function importProfileText(text: string): NewProfileInput | null {
  try {
    const start = text.indexOf("{")
    const end = text.lastIndexOf("}")
    if (start === -1 || end === -1 || end < start) return null
    const parsed = JSON.parse(text.slice(start, end + 1)) as Partial<PortableProfile>
    if (parsed.wg !== "profile" || !parsed.name || !parsed.setup || !parsed.game) return null
    const settings = (parsed.settings ?? {}) as Record<string, { value: SettingValue; notes?: string }>
    return {
      name: parsed.name,
      setup: parsed.setup,
      game: parsed.game,
      surface: parsed.surface,
      notes: parsed.notes,
      settings,
    }
  } catch {
    return null
  }
}
