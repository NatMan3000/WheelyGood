# WheelyGood

Sim racing wheel settings PWA — settings encyclopedia, troubleshooter, and profile manager.

**Users:** Nathan + Josh
**Stack:** React + Vite + TypeScript + TailwindCSS
**Architecture:** Static PWA, fully offline after first load, profiles in localStorage

## Hardware Setups

### Setup 1 — Xbox Series X

| Component | Hardware |
|-----------|----------|
| Wheel Base | ClubSport DD (15Nm direct drive) |
| Wheel Rim | ClubSport Steering Wheel GT Alcantara V2 (Xbox) — 330mm |
| Pedals | ClubSport Pedals V3 — 90kg load cell, vibration motors |
| Shifter | ClubSport Shifter SQ V1.5 — H-pattern + sequential |
| Handbrake | ClubSport Handbrake V1.5 |

### Setup 2 — Xbox Series S

| Component | Hardware |
|-----------|----------|
| Wheel Base | ClubSport Wheelbase V2.5 (belt-driven) |
| Wheel Rim 1 | CSL Elite Steering Wheel WRC — 300mm |
| Wheel Rim 2 | CSL Steering Wheel GT3 — 300mm, OLED, analog paddles |
| Pedals | CSL Elite Pedals V2 — 90kg load cell |

### Setup 3 — PC

| Component | Hardware |
|-----------|----------|
| Wheel + Pedals | Logitech G920 Driving Force — gear-driven, 2.3Nm, 900° |

### Games

- Forza Horizon 6 (primary)
- F1 25

## Design

- Mobile-first, portrait-only on mobile
- Racing dark theme with user-selectable accent colours
- Desktop gets sidebar layout
- Bottom tab navigation on mobile: Learn / Fix / Saves / Settings

## Project Structure

```
src/
├── data/           # All settings data (baked in, no API)
│   ├── hardware/   # Per-hardware settings definitions
│   ├── games/      # Per-game in-game settings
│   └── symptoms/   # Troubleshooter symptom → fix mappings
├── components/     # React components by feature
│   ├── layout/     # App shell, nav
│   ├── encyclopedia/
│   ├── troubleshooter/
│   ├── profiles/
│   ├── settings/
│   └── shared/     # Reusable UI components
├── hooks/          # Custom React hooks
└── pages/          # Page-level components
```

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server
bun run build      # Production build
```

## Status

**All 4 phases shipped (2026-05-30).** App builds clean, PWA-installable, offline-capable.
**Live on GitHub Pages (2026-05-31):** https://natman3000.github.io/WheelyGood/
**v1.1 "Fable upgrade" (2026-07-11)** — see below.

## v1.1 Upgrade (2026-07-11)

Design/UX context now lives in `PRODUCT.md` + `DESIGN.md` (impeccable-skill format) — read them before design work.

- **Context values everywhere:** every Simpedia card shows the value for the active rig+game (`contextValue()` in `data/settings.ts`) — accent = published rec ("your rig"), neutral = hardware default. Detail pages get a "Your rig" block (`recommendationsForContext()`) with the big value + provenance notes.
- **F1 25 on-wheel recs populated:** ClubSport DD values are Fanatec-official (SEN 360/FF 75/NDP 55/NFR 0/NIN 0/INT 10/FEI 100, from `research/f1-25-ffb-research-2026-05-30.md` §2); V2.5 SEN/FF are community-derived and say so in their notes. FH6 has no published on-wheel values — cards fall back to defaults.
- **Profile dial-in view:** `/saves/:id` is the dial-in page (`ProfileViewPage`) — big values grouped like the wheel menu, Share (clipboard export) + Edit. Two gestures per row: tap the ROW to tick it off (progress persisted per profile, `wg-applied-<id>` in localStorage); tap the VALUE to edit it inline (`SettingValueInput`, shared with the editor) — saves straight to the profile and clears that row's tick (changed value isn't on the wheel yet). Rec-drift hint with tap-to-apply appears while editing. The full editor moved to `/saves/:id/edit`.
- **Editor:** defaults to the ACTIVE setup+game; context switches no longer wipe typed values (rec-drift hint with tap-to-apply instead); inline two-step delete (no `window.confirm` — blocks browser automation and is banned UX); sticky bottom save bar.
- **Unified search:** Simpedia search covers name/abbr/description/subcategory/sweetSpot/warnings AND surfaces up to 4 Troubleshooter symptom matches ("From the Troubleshooter"). Troubleshooter has its own symptom search + per-area counts on the pills.
- **Simpedia header:** setup/game dropdowns stacked vertically top-right (ContextPicker `stacked` prop → compact right-aligned menus). Resolves the 2026-05-30 open thread.
- **Desktop:** shell widens to `lg:max-w-4xl` with 2-col card grids (settings/symptoms/profiles); form-ish pages (editor/compare/settings/view) self-cap at `max-w-2xl`. Detail pages carry the tread surface now.
- **Misc:** per-page `document.title` (`usePageTitle`), compare gets a "Differences only" toggle, Settings page shows real version + data provenance (`dataVersion`), app version 1.1.0.

Known lint debt (pre-existing): 3 `react-refresh/only-export-components` errors in `useGame`/`useProfiles`/`useSetup` (provider + hook share a file). Cosmetic; `bun run lint` fails on them.

## v1.2 (2026-07-11) — Setup Guide + Troubleshooter upgrades

- **Setup Guide** (`/guide`, full-screen outside the shell, `SetupGuidePage`): intro (active rig + how-to-open-the-tuning-menu) → one setting per step in wheel-menu order (big value via `contextValue`, rec notes or sweet spot, location path) → done screen with "Save as a profile" (recommended values). Position persists per rig+game (`wg-guide-pos-<setup>-<game>`). Entry points: accent CTA card on Simpedia (hidden mid-search) + Settings page section + PWA shortcut.
- **Fix sessions:** symptom pages carry a persistent Helped/No-change verdict per fix (`wg-fixlog-<symptomId>`; tap same verdict to clear; "Clear session"). Fix rows show the starting value for your rig. `contextFixes()` in `symptoms.ts` is the shared rig-filter (detail page + card counts).
- **Reverse lookup:** setting detail pages list "Fixes these symptoms" with direction arrows (`symptomsForSetting()`).
- **Symptom cards** show "N fixes" for the active rig (replaces the area chip).
- **Tuning-menu access** (`Setup.tuningMenuAccess`, verified vs Fanatec FAQ/quick guides 2026-07-11): shown on the selected Settings-page setup card + guide intro. FunkySwitch nav, hold-3s Standard↔Advanced; G920 = no on-wheel menu.
- **Compare vs stock:** Compare injects synthetic "★ Recommended (setup · game)" profiles for the active rig; guard relaxed to ≥1 real profile; B defaults to the rec matching A's game.
- **PWA shortcuts** (long-press app icon): Troubleshooter / Setup Guide / Saves.

## Deployment

| Item | Value |
|------|-------|
| **Live URL** | https://natman3000.github.io/WheelyGood/ |
| **Host** | GitHub Pages (free tier — repo is **public**) |
| **Trigger** | GitHub Actions on push to `main` (`.github/workflows/deploy.yml`) |

Served under a subpath `/WheelyGood/`, so: `vite.config.ts` sets `base: '/WheelyGood/'`, the router uses `basename={import.meta.env.BASE_URL}`, manifest `scope`/`start_url` are `/WheelyGood/`, and every JS public-asset ref goes through `src/utils/asset.ts` (Vite doesn't rebase absolute paths in JS/CSS — only index.html). The tread background lives in `src/assets/` (not `public/`) so Vite bundles + rebases its CSS `url()`. Full pattern: `~/Dev/memory/github-pages-pwa-deploy.md` (Mac-local).

## Mobile / iOS safe-area gotchas

These bite only in the **installed PWA** (standalone), not desktop Chrome — `env(safe-area-inset-*)` reads 0 in browser emulation, so verify on-device (or inject a literal `padding-top` to eyeball).

- **Standalone is full-bleed under the status bar + home indicator** (`apple-mobile-web-app-status-bar-style: black-translucent` + `viewport-fit=cover` in `index.html`). The app pads the safe areas itself — nothing does it automatically.
- **App-shell layout** (`AppShell.tsx`): root is `flex h-dvh flex-col overflow-hidden` with `pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))]`; only `<main>` (`min-h-0 flex-1 overflow-y-auto`) scrolls; `BottomNav` is an in-flow flex child (NOT `position:fixed`) with `pb-[env(safe-area-inset-bottom)]`. This stops the bottom nav drifting as iOS Safari's chrome collapses and stops content showing beneath it. `min-h-0` is load-bearing — without it the scroll region won't shrink.
- **Full-screen routes are OUTSIDE the shell** (`/setting/:id`, `/symptom/:id` in `App.tsx`) so they don't inherit the top inset. Each handles it on its sticky Back bar: `h-14 box-content pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))]` (box-content keeps the 56px row intact; opaque-top gradient covers the status zone when scrolled).
- **PageHeader** stacks title-above-actions on mobile (`flex-col md:flex-row`) so action buttons can't overlap the title at narrow widths.

## Key Decisions

- PWA with service worker for offline — all data baked into JS modules
- No backend, no database — profiles stored in localStorage
- Portrait-only mobile design
- Three hardware setups selectable in app settings
- Active Game selector (FH6/F1 25) filters both encyclopedia and troubleshooter
- Hybrid car diagram: baked-lime PNG image set + transparent SVG hit-map overlay
- Content verified against authoritative sources: Fanatec Wheel Tuning Menu FAQ, official FH6 Advanced Wheel Tuning article, F1 25 simracingsetup + Fanatec recommended values
- CS DD corrected to 14 settings (not 15) per current FAQ; V2.5 also corrected
- F1 25 On Track Effects described as texture layer (not cornering force) — per research/f1-25-ffb-explained.md

## UI Features

- Red highlighting of on-wheel acronyms (SEN/FF/NDP/BRF…) in encyclopedia
- Game-specific fix badges on troubleshooter symptoms
- Game + setup brand logos (GameLogo/SetupLogo on white chips)
- Slider default-value labels
- Scroll-to-top on navigation

## Git Remotes

- **Forgejo** (fetch): `git@forgejo:NatMan3000/wheely-good.git`
- **GitHub** (push mirror): `git@github.com:NatMan3000/WheelyGood.git`
- Dual-push origin set up. Push to `origin` sends to both.

## Known State

- `docs/` contains raw PNG source files (~55MB, untracked) — keep untracked
- Two PNGs were accidentally committed in an early `git add -A` — they remain in history

## Plan

See `plans/wheely-good-app-COMPLETED.md` for full PRD (all phases complete).
