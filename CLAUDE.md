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

## Key Decisions

- PWA with service worker for offline — all data baked into JS modules
- No backend, no database — profiles stored in localStorage
- Portrait-only mobile design
- Three hardware setups selectable in app settings
- Phase 1: Encyclopedia, Phase 2: Troubleshooter, Phase 3: Profiles, Phase 4: Polish

## Plan

See `plans/wheely-good-app.md` for full PRD.
