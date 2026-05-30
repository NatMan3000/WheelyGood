# WheelyGood — Sim Racing Wheel Settings App

## Overview

A mobile-first PWA that helps sim racers understand, tune, and manage their wheel/pedal settings across multiple hardware setups and games. Think of it as a "settings bible + troubleshooter + profile manager" in your pocket.

**Users:** Nathan + Josh (built right, not throwaway)
**Platform:** PWA — hosted static site, fully offline after first load
**Primary device:** Mobile (phone at the rig), also works on desktop

---

## Review Decisions (2026-05-30)

Plan reviewed before build. Changes folded in:

1. **Phase 1 re-sequenced** — skeleton + small seed dataset first (prove the UI loop end-to-end), then bulk-author content. Service worker moved to Phase 4.
2. **Content sourcing** — hybrid: Kai drafts settings data into typed modules; Nathan verifies against actual wheel tuning menus + games. Nathan owns final accuracy.
3. **Deep-linkable routes** — `/setting/:id` and `/symptom/:id` baked in from the start (share a setting with Josh; pairs with export).
4. **`Setting` gains a `location` field** — *where* you change a setting (on-wheel tuning menu / G HUB / in-game). On Xbox there is **no Fanatec Control Panel** — all base tuning is the on-wheel menu. This dimension is load-bearing for "answer at the rig."
5. **Value type is discriminated** (numeric / enum / auto-or-numeric) instead of `number | string` everywhere — avoids ambiguity leaking into every UI component.
6. **Torque resolved:** ClubSport DD is **12Nm base, firmware-upgraded to 15Nm** (Nathan's runs the 15Nm firmware). Encyclopedia uses 15Nm peak for this base.
7. **Setting locations simplified:** all settings are changed either **on the wheel** or **in-game** — no PC control-panel / G HUB layer in scope. `SettingLocation.access` = `"on-wheel-tuning" | "in-game"`.

---

## Hardware Setups

Three distinct rigs, selectable in app settings:

### Setup 1 — Xbox Series X ("The Big Rig")

| Component | Hardware |
|-----------|----------|
| Wheel Base | ClubSport DD (15Nm direct drive, FullForce, QR2) |
| Wheel Rim | ClubSport Steering Wheel GT Alcantara V2 (Xbox) — 330mm, FunkySwitch, magnetic paddles |
| Pedals | ClubSport Pedals V3 — 90kg load cell brake, vibration motors (throttle + brake), Hall-effect sensors |
| Shifter | ClubSport Shifter SQ V1.5 — H-pattern + sequential, adjustable resistance |
| Handbrake | ClubSport Handbrake V1.5 — analog, horizontal/vertical mount |

### Setup 2 — Xbox Series S

| Component | Hardware |
|-----------|----------|
| Wheel Base | ClubSport Wheelbase V2.5 (belt-driven, ~8Nm) |
| Wheel Rim 1 | CSL Elite Steering Wheel WRC — 300mm, rally-style, Alcantara, RevStripe LED |
| Wheel Rim 2 | CSL Steering Wheel GT3 — 300mm, OLED display, analog paddles, FunkySwitch |
| Pedals | CSL Elite Pedals V2 — 90kg load cell brake, Hall-effect throttle/clutch |

### Setup 3 — PC

| Component | Hardware |
|-----------|----------|
| Wheel + Pedals | Logitech G920 Driving Force — gear-driven FFB (2.3Nm), 900°, 3 pedals (non-linear brake), leather rim |

### Games

| Game | Type | Primary wheel rotation |
|------|------|----------------------|
| Forza Horizon 6 | Open world, mixed surface (tarmac/dirt/snow) | 540°–900° |
| F1 25 | Circuit racing, single-seater | 360° |

---

## Architecture

```
Static PWA (Vite + React + TailwindCSS)
├── Service Worker (Workbox) — offline caching
├── All settings data — baked into JS/JSON modules
├── Profiles — browser localStorage
├── No backend, no API, no database
└── Hosted on Cloudflare Pages (or similar static host)
```

**Stack:**
- Vite + React + TypeScript
- TailwindCSS
- Workbox (service worker / offline)
- localStorage for profiles
- No runtime dependencies on any server

---

## Design System

### Theme

- **Base:** Dark racing theme — deep charcoal/near-black backgrounds (#0a0a0a → #1a1a1a)
- **Cards/panels:** Slightly elevated dark (#1e1e1e → #252525) with subtle borders
- **Text:** White primary, muted gray secondary
- **Accent:** User-selectable from theme settings:

| Theme | Primary Accent | Use |
|-------|---------------|-----|
| Fanatec | `#b4ff00` (lime/chartreuse) | Matches Fanatec branding |
| Racing Red | `#ef4444` | Classic motorsport |
| Electric Blue | `#3b82f6` | Modern sim racing |
| McLaren Orange | `#f97316` | High energy |

- **Typography:** System font stack (Inter if loaded, else system sans)
- **Corners:** Rounded (8px cards, 12px modals)
- **Transitions:** Smooth, not flashy — 150ms ease

### Mobile-First Layout (Portrait Only)

- Designed exclusively for portrait orientation on mobile — no landscape mode
- Bottom tab navigation (4 tabs: Encyclopedia, Troubleshooter, Profiles, Settings)
- Cards for settings, full-screen sheets for detail views
- Touch-friendly tap targets (min 44px)
- Swipe gestures where natural (e.g., swipe between settings in encyclopedia)
- Vertical stacking throughout — no side-by-side panels on mobile

### Desktop Adaptation

- Sidebar nav replaces bottom tabs
- Two-column layout: list on left, detail on right
- Same components, just reflowed

---

## Feature 1: Settings Encyclopedia

The core reference. Every adjustable setting across all hardware and games, explained in plain English.

### Data Model — Setting

```typescript
// Discriminated value type — settings are numeric, enum, or auto-or-numeric.
// Avoids `number | string` ambiguity leaking into RangeIndicator / compare / profile inputs.
type ValueType =
  | { kind: "numeric"; min: number; max: number; default: number; step?: number; unit?: string }
  | { kind: "enum"; options: string[]; default: string }
  | { kind: "auto-or-numeric"; min: number; max: number; default: number | "AUTO"; unit?: string } // e.g. Fanatec SEN

// Where the setting is actually changed. On Xbox there is NO Fanatec Control Panel —
// base tuning is the on-wheel tuning menu only. PC base tuning is the control panel / G HUB.
interface SettingLocation {
  access: "on-wheel-tuning" | "in-game"   // only two surfaces in scope
  path: string                            // "Tuning menu → NDP" | "FH6 → Advanced Controls → Force Feedback Scale"
}

interface Setting {
  id: string                          // e.g. "fanatec-dd-ndp"
  name: string                        // "Natural Damper"
  abbreviation?: string               // "NDP"
  category: SettingCategory           // "wheel-base" | "pedals" | "in-game" | "driver-software"
  subcategory?: string                // "force-feedback" | "deadzone" | "vibration"
  hardware: HardwareId[]              // which setups have this setting
  games?: GameId[]                    // which games (for in-game settings)
  platform?: Platform[]               // "xbox" | "pc" | "all"
  location: SettingLocation           // where to change it — load-bearing for "at the rig"

  // The core content
  description: string                 // What this setting does — plain English
  valueType: ValueType                // discriminated — see above
  
  // What happens when you change it
  increaseEffect: string              // "Heavier, stronger forces — more physical effort to turn"
  decreaseEffect: string              // "Lighter, less resistance — easier to turn but less detail"
  
  // Contextual guidance
  sweetSpot?: string                  // "Most users run 20–50 on the CS DD"
  warnings?: string[]                 // "Too high causes oscillation on straights"
  
  // Relationships
  interactsWith?: {
    settingId: string
    relationship: string              // "High NDP masks NFR/NIN feel"
  }[]
  
  // Per-game recommended values
  recommendations?: {
    game: GameId
    setup: SetupId
    value: number | string
    surface?: SurfaceType             // "tarmac" | "dirt" | "snow" | "mixed"
    notes?: string
  }[]
}
```

### UI Flow

1. **Encyclopedia home** — grouped by category (Wheel Base Settings, Pedal Settings, In-Game FFB, In-Game Deadzones)
2. **Setting card** — shows name, abbreviation, one-line summary, current recommended value for active setup/game
3. **Setting detail (full-screen sheet):**
   - Name + abbreviation badge
   - "What it does" paragraph
   - Visual range indicator (min → max with default marked)
   - "Turn it UP" card (green arrow ↑) — effect description
   - "Turn it DOWN" card (red arrow ↓) — effect description
   - Sweet spot callout
   - "Interacts with" — linked setting chips (tap to navigate)
   - Per-game recommendations table
   - Warnings/gotchas if any

### Filtering

- Filter by active setup (auto-applied based on setup selector)
- Filter by game
- Search by name or abbreviation
- Filter by category

---

## Feature 2: Troubleshooter

"My car does X — what do I change?"

### Data Model — Symptom

```typescript
interface Symptom {
  id: string
  name: string                        // "Car understeers"
  description: string                 // "Front tyres lose grip before rear..."
  area: CarArea                       // "front" | "rear" | "steering" | "brakes" | "overall"
  
  fixes: {
    settingId: string                 // link to encyclopedia
    direction: "increase" | "decrease"
    priority: number                  // 1 = try first
    explanation: string               // "Reducing NDP allows faster wheel response..."
    hardware?: HardwareId[]           // only applies to certain setups
    game?: GameId[]                   // only applies to certain games
  }[]
  
  relatedSymptoms?: string[]          // other symptoms that often co-occur
}
```

### Symptom Library (initial set)

**Steering feel:**
- Steering too heavy / fatiguing
- Steering too light / no feel
- Dead spot in centre
- Wheel oscillates on straights
- Delayed response to inputs
- FFB cuts out / goes dead mid-session

**Grip & handling:**
- Car understeers (front pushes wide)
- Car oversteers (rear slides out)
- Snap oversteer (sudden loss of rear grip)
- Spinning out on corner exit
- Can't feel grip limit through wheel

**Braking:**
- Wheels lock up too easily
- Can't reach full braking force
- Brake too sensitive / grabby (load-cell force curve too aggressive)
- Brake feels mushy / no bite point (load-cell force too high, never reaches max)
- No ABS vibration feel

**Surface & texture:**
- Can't feel road surface / kerbs
- Off-road vibration too intense
- Kerbs feel weak
- No difference between tarmac and dirt

**General:**
- FFB feels identical in all situations (clipping)
- Vibration too strong overall
- Vibration too weak / none

### UI Flow

1. **Car diagram** — simplified top-down car outline with tap zones:
   - Front (tyres, steering)
   - Rear (tyres, traction)
   - Brakes (all four wheels)
   - Steering wheel (centre)
   - Overall (body)
2. **Tap a zone** → filtered symptom list for that area
3. **Tap a symptom** → detail view:
   - Problem description
   - Ordered fix list (try this first → then this → then this)
   - Each fix shows: setting name, direction arrow (↑/↓), explanation
   - Tap setting name → jumps to encyclopedia detail
4. **Active setup/game context** — fixes are filtered and ordered based on which hardware you're using

---

## Feature 3: Profile Manager

Save, load, and compare hardware setting configurations.

### Data Model — Profile

```typescript
interface Profile {
  id: string                          // uuid
  name: string                        // "FH6 — Tarmac — Balanced"
  setup: SetupId                      // "xsx" | "xss" | "pc"
  game: GameId                        // "fh6" | "f1-25"
  surface?: SurfaceType               // "tarmac" | "dirt" | "snow" | "mixed"
  createdAt: string
  updatedAt: string
  notes?: string                      // free text notes
  
  // Setting values — only settings that have been explicitly set
  settings: {
    [settingId: string]: {
      value: number | string
      notes?: string                  // per-setting notes
    }
  }
}
```

### UI Flow

1. **Profiles list** — grouped by game, showing setup badge, surface tag, last modified
2. **Create profile:**
   - Pick setup + game + surface
   - Name it
   - Fill in setting values (pre-populated with recommended defaults, editable)
   - Each setting row links to encyclopedia for reference
3. **Profile detail:**
   - All settings in a scannable list with values
   - Edit inline (tap value to change)
   - Notes field
   - "Compare" button
4. **Compare mode:**
   - Pick two profiles
   - Side-by-side diff — highlights settings that differ
   - Useful for "what changed between my tarmac and dirt setup?"
5. **Quick actions:**
   - Duplicate profile (start from existing)
   - Export as text (copy to clipboard — for sharing with Josh)
   - Import from text

### Storage

- All profiles in `localStorage` under a single key
- JSON structure, versioned for future migrations
- No cloud sync (Phase 2 consideration)

---

## Feature 4: Settings (App Configuration)

### Setup Selector

- Pick active setup: Xbox Series X / Xbox Series S / PC
- Shows hardware summary for selected setup
- Persisted in localStorage

### Theme Selector

- Accent colour picker (Fanatec / Racing Red / Electric Blue / McLaren Orange)
- Preview swatch
- Persisted in localStorage

### About

- App version
- Data version (when settings database was last updated)
- "Built by Nathan & Josh"

---

## Navigation

### Mobile (bottom tabs)

```
┌─────────────────────────────────────┐
│                                     │
│         [Active Content]            │
│                                     │
├────────┬────────┬────────┬──────────┤
│  📖    │  🔧   │  💾    │  ⚙️     │
│ Learn  │  Fix   │ Saves  │ Settings │
└────────┴────────┴────────┴──────────┘
```

### Desktop (sidebar)

```
┌──────────┬──────────────────────────┐
│          │                          │
│  Learn   │                          │
│  Fix     │     [Active Content]     │
│  Saves   │                          │
│          │                          │
│  ─────   │                          │
│  Settings│                          │
└──────────┴──────────────────────────┘
```

---

## Data Architecture

All settings data lives in TypeScript modules — no runtime fetching.

```
src/
├── data/
│   ├── hardware/
│   │   ├── setups.ts              # 3 setup definitions with hardware lists
│   │   ├── fanatec-dd.ts          # ClubSport DD settings
│   │   ├── fanatec-v25.ts         # ClubSport V2.5 settings
│   │   ├── fanatec-pedals-v3.ts   # CSP V3 settings
│   │   ├── fanatec-pedals-elite.ts# CSL Elite V2 settings
│   │   ├── fanatec-shifter.ts     # Shifter settings
│   │   ├── fanatec-handbrake.ts   # Handbrake settings
│   │   └── logitech-g920.ts       # G920 + G Hub settings
│   ├── games/
│   │   ├── forza-horizon-6.ts     # FH6 in-game settings
│   │   └── f1-25.ts               # F1 25 in-game settings
│   ├── symptoms/
│   │   └── symptoms.ts            # All symptoms + fix mappings
│   └── themes.ts                  # Theme definitions
├── components/
│   ├── layout/
│   │   ├── BottomNav.tsx
│   │   ├── Sidebar.tsx
│   │   └── AppShell.tsx
│   ├── encyclopedia/
│   │   ├── SettingsList.tsx
│   │   ├── SettingCard.tsx
│   │   └── SettingDetail.tsx      # Full-screen sheet
│   ├── troubleshooter/
│   │   ├── CarDiagram.tsx         # SVG car outline with tap zones
│   │   ├── SymptomList.tsx
│   │   └── SymptomDetail.tsx
│   ├── profiles/
│   │   ├── ProfileList.tsx
│   │   ├── ProfileEditor.tsx
│   │   └── ProfileCompare.tsx
│   ├── settings/
│   │   ├── SetupSelector.tsx
│   │   └── ThemeSelector.tsx
│   └── shared/
│       ├── RangeIndicator.tsx     # Visual min-max-default bar
│       ├── DirectionCard.tsx      # ↑ increase / ↓ decrease effect
│       └── SettingChip.tsx        # Linked setting pill
├── hooks/
│   ├── useSetup.ts               # Active setup context
│   ├── useProfiles.ts            # localStorage profile CRUD
│   └── useTheme.ts               # Theme context
├── pages/
│   ├── EncyclopediaPage.tsx
│   ├── TroubleshooterPage.tsx
│   ├── ProfilesPage.tsx
│   └── SettingsPage.tsx
└── service-worker.ts             # Workbox config
```

---

## Phase Plan

### Phase 1 — Foundation + Encyclopedia (skeleton + seed first) ✅

1. ✅ App shell — bottom nav (mobile) / sidebar (desktop), routing incl. deep-link routes (`/setting/:id`)
2. ✅ Theme system + setup selector (localStorage-backed contexts: `useTheme`, `useSetup`)
3. ✅ Type definitions (`Setting`, `ValueType`, `SettingLocation`, ids/enums)
4. ✅ **Seed dataset** — ~5–8 real settings to prove the loop
5. ✅ Encyclopedia list + `SettingDetail` sheet + shared components (`RangeIndicator`, `DirectionCard`, `SettingChip`) against the seed
6. ✅ **Bulk-author content** — full content for DD/V2.5/G920 + FH6/F1 25, verified against authoritative sources

*(Service worker / offline moved to Phase 4 — a live SW during active dev causes stale-asset pain.)*

### Phase 2 — Troubleshooter ✅

- ✅ Car diagram — hybrid baked-lime PNG image set + transparent SVG hit-map overlay
- ✅ Symptom data module (23 symptoms)
- ✅ Symptom list + detail views with fix recommendations
- ✅ Deep links from troubleshooter → encyclopedia
- ✅ Active game filter on symptoms and fixes
- ✅ Game-specific fix badges

### Phase 3 — Profile Manager ✅

- ✅ localStorage profile CRUD
- ✅ Profile editor with setting value inputs
- ✅ Profile comparison view
- ✅ Export/import as text

### Phase 4 — Polish + PWA ✅

- ✅ Service worker / offline caching (`vite-plugin-pwa`)
- ✅ `manifest.webmanifest` + app icons + splash screen + favicon wired into `index.html`
- ✅ PWA install prompt
- ✅ Animations and transitions
- ✅ Desktop responsive layout (two-column reflow)
- ✅ Active Game selector (FH6/F1 25) — filters encyclopedia + troubleshooter
- ✅ On-wheel acronym red highlighting (SEN/FF/NDP/BRF…)
- ✅ Game + setup brand logos (GameLogo/SetupLogo chips)
- ✅ Slider default-value labels
- ✅ Scroll-to-top on navigation

### Future (Phase 5+)

- Car tuning setups (suspension, gearing, diff) as a second layer
- More games (Forza Motorsport, Assetto Corsa, etc.)
- Profile sharing via URL/QR code
- Community recommended profiles

---

## Key Design Principles

1. **Mobile at the rig** — designed to be used one-handed while sitting in a racing cockpit
2. **Answer in 2 taps** — from app open to understanding a setting should be ≤2 taps
3. **No jargon without explanation** — every abbreviation (NDP, FEI, FFB) has its full name and plain English description
4. **Context-aware** — the app knows which setup you're using and filters accordingly
5. **Offline-first** — works without internet after first load
6. **Settings interact** — the encyclopedia shows relationships, not isolated facts
