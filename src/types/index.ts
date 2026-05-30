// Core domain types for WheelyGood.
// See plans/wheely-good-app.md for the data model rationale.

// ── Identifiers & enums ──────────────────────────────────────────────

export type SetupId = "xsx" | "xss" | "pc"

export type HardwareId =
  | "fanatec-dd"          // ClubSport DD (12Nm base, 15Nm firmware) — XSX
  | "fanatec-v25"         // ClubSport Wheel Base V2.5 — XSS
  | "csp-v3"              // ClubSport Pedals V3
  | "csl-elite-pedals-v2" // CSL Elite Pedals V2
  | "fanatec-shifter"     // ClubSport Shifter SQ V1.5
  | "fanatec-handbrake"   // ClubSport Handbrake V1.5
  | "logitech-g920"       // Logitech G920 (wheel + pedals)

export type GameId = "fh6" | "f1-25"

export type Platform = "xbox" | "pc" | "all"

export type SettingCategory =
  | "wheel-base"
  | "pedals"
  | "in-game"
  | "shifter"
  | "handbrake"

export type SurfaceType = "tarmac" | "dirt" | "snow" | "mixed"

// ── Value type (discriminated) ───────────────────────────────────────
// Avoids `number | string` ambiguity leaking into RangeIndicator / compare / inputs.

export type ValueType =
  | { kind: "numeric"; min: number; max: number; default: number; step?: number; unit?: string }
  | { kind: "enum"; options: string[]; default: string }
  | { kind: "auto-or-numeric"; min: number; max: number; default: number | "AUTO"; unit?: string }

export type SettingValue = number | string

// ── Where a setting is changed ───────────────────────────────────────
// Xbox bases have NO control panel — base tuning is the on-wheel menu only.

export interface SettingLocation {
  access: "on-wheel-tuning" | "in-game"
  path: string // "Tuning menu → NDP" | "FH6 → Advanced Controls → Force Feedback Scale"
}

// ── Setting ──────────────────────────────────────────────────────────

export interface SettingInteraction {
  settingId: string
  relationship: string
}

export interface SettingRecommendation {
  game: GameId
  setup: SetupId
  value: SettingValue
  surface?: SurfaceType
  notes?: string
}

export interface Setting {
  id: string
  name: string
  abbreviation?: string
  category: SettingCategory
  subcategory?: string
  hardware: HardwareId[]
  games?: GameId[]
  platform?: Platform[]
  location: SettingLocation

  description: string
  valueType: ValueType

  increaseEffect: string
  decreaseEffect: string

  sweetSpot?: string
  warnings?: string[]
  interactsWith?: SettingInteraction[]
  recommendations?: SettingRecommendation[]

  /** DRAFT settings authored by Kai, not yet verified by Nathan against real menus. */
  unverified?: boolean
}

// ── Symptom (Troubleshooter — Phase 2) ───────────────────────────────

export type CarArea = "front" | "rear" | "steering" | "brakes" | "overall"

export interface SymptomFix {
  settingId: string
  direction: "increase" | "decrease"
  priority: number
  explanation: string
  hardware?: HardwareId[]
  game?: GameId[]
}

export interface Symptom {
  id: string
  name: string
  description: string
  area: CarArea
  fixes: SymptomFix[]
  relatedSymptoms?: string[]
}

// ── Profile (Phase 3) ────────────────────────────────────────────────

export interface Profile {
  id: string
  name: string
  setup: SetupId
  game: GameId
  surface?: SurfaceType
  createdAt: string
  updatedAt: string
  notes?: string
  settings: Record<string, { value: SettingValue; notes?: string }>
}

// ── Setup & hardware definitions ─────────────────────────────────────

export interface HardwareComponent {
  id: HardwareId
  role: "wheel-base" | "wheel-rim" | "pedals" | "shifter" | "handbrake" | "wheel-pedals"
  name: string
  summary: string
}

export interface Setup {
  id: SetupId
  name: string
  shortName: string
  platform: Platform
  components: HardwareComponent[]
}

// ── Theme ────────────────────────────────────────────────────────────

export interface AccentTheme {
  id: string
  name: string
  accent: string // hex
  use: string
}
