# WheelyGood

Sim racing wheel settings PWA — settings encyclopedia, troubleshooter, and profile manager for Fanatec hardware with Xbox and PC.

**Users:** Nathan + Josh  
**Stack:** React + Vite + TypeScript + TailwindCSS  
**Status:** All 4 phases shipped. **Live at https://natman3000.github.io/WheelyGood/** — installable as PWA.

## Features

- **Simpedia** — tap any setting from any hardware or game to see what it does, what turning it up/down changes, interactions with other settings, and recommended values
- **Troubleshooter** — tap on a car diagram zone, pick your symptom (e.g. "car understeers"), get an ordered fix list pointing to Simpedia
- **Saves** — save/load/compare named hardware + in-game setting profiles per game and surface type
- **Settings** — choose your active setup (XSX / XSS / PC) and active game

## Hardware Setups

| Setup | Wheel Base | Wheel Rim | Pedals | Extras |
|-------|-----------|-----------|--------|--------|
| Xbox Series X | ClubSport DD (15Nm) | GT Alcantara V2 Xbox | CSP V3 (load cell) | Shifter SQ + Handbrake V1.5 |
| Xbox Series S | ClubSport Wheelbase V2.5 | CSL Elite WRC / GT3 | CSL Elite V2 (load cell) | |
| PC | Logitech G920 Driving Force | (integrated) | (integrated) | |

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server (add --host for phone access)
bun run build      # Production build
bun run preview    # Preview production build
```

## Architecture

Static PWA — no backend. All settings data baked into JS modules at build time. Profiles stored in `localStorage`. Fully offline after first load via Workbox service worker.

## Timeline History

| Date | Event | Details |
|------|-------|---------|
| 2026-05-30 | [**Project created**](sessions/2026-05-30-project-scaffold.md) | WheelyGood PWA scaffolded — Vite + React + TS + Tailwind. Hardware research complete for 3 setups (Fanatec DD, V2.5, Logitech G920). App plan written. |
| 2026-05-30 | [**All 4 phases shipped — full app built in one session**](sessions/2026-05-30-full-app-build.md) | Phases 1–4 complete: Encyclopedia (full content for DD/V2.5/G920 + FH6/F1 25), Troubleshooter (car diagram + 23 symptoms), Profile Manager (CRUD/compare/export-import), PWA (offline + installable). Active game filter, acronym highlighting, game/setup logos, content verified against authoritative Fanatec + FH6 + F1 25 sources. ~50 commits. |
| 2026-05-30 | [**UI polish + F1 25 research**](sessions/2026-05-30-ui-polish-f1-research.md) | impeccable skill pass: OKLCH tokens, stroke icons, OLED-style wheel-code tags, brand logos, Simpedia rename, tyre-tread background. F1 25 FFB re-researched (Pit Stop Effects added, Understeer Enhance corrected to toggle). Commit f173495 dual-pushed. |
| 2026-05-31 | [**Live on GitHub Pages + Draft flags cleared**](sessions/2026-05-31-github-pages-pwa-ios-fixes.md) | Deployed to https://natman3000.github.io/WheelyGood/ via GitHub Actions (Bready pattern: subpath base, asset() helper, repo made public). Bulk-cleared `unverified`/Draft flag from 43 settings; pending list saved to docs/unverified-settings.md. |
| 2026-05-31 | [**iOS PWA safe-area fixes + PageHeader mobile layout**](sessions/2026-05-31-github-pages-pwa-ios-fixes.md) | Fixed bottom nav drift (app-shell h-dvh pattern), header status-bar overlap (env(safe-area-inset-top) on shell), Saves header button overlap (flex-col mobile stacking), and detail page status-bar overlap (box-content Back bar inset). |
