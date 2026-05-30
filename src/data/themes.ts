import type { AccentTheme } from "../types"

export const themes: AccentTheme[] = [
  { id: "fanatec", name: "Fanatec", accent: "#b4ff00", use: "Matches Fanatec branding" },
  { id: "racing-red", name: "Racing Red", accent: "#ef4444", use: "Classic motorsport" },
  { id: "electric-blue", name: "Electric Blue", accent: "#3b82f6", use: "Modern sim racing" },
  { id: "mclaren-orange", name: "McLaren Orange", accent: "#f97316", use: "High energy" },
]

export const defaultThemeId = "fanatec"

export function themeById(id: string): AccentTheme {
  return themes.find((t) => t.id === id) ?? themes[0]
}
