---
type: auto
session_id: e22b7c2d-c9eb-4ad6-8009-924dc477c6fb
project: WheelyGood
date: 2026-05-30
topic: Project inception — hardware research, app design, and scaffold
duration: ~8.5 hours (13:36–22:03)
events: 139
---

# WheelyGood — Project Inception, Hardware Research, App Design & Scaffold

**Project:** WheelyGood  
**Purpose:** Define requirements with Nathan and Josh, research all hardware + game settings, write the app plan, and scaffold the complete project space  
**Duration:** ~8.5 hours (13:36–22:03)  
**Participants:** Nathan, Kai (+ Josh in the room)  
**Session Restart ID:** `claude -r e22b7c2d-c9eb-4ad6-8009-924dc477c6fb`

---

## Summary

Nathan and Josh came with the idea for a sim racing settings PWA — a tool to understand Fanatec hardware settings and in-game wheel settings across two games (Forza Horizon 6 and F1 25), with a troubleshooter and profile manager. The session captured all hardware requirements across three distinct setups (Xbox Series X with ClubSport DD, Xbox Series S with V2.5, PC with Logitech G920), fetched Fanatec product specs via WebFetch, launched two parallel research agents for deep tuning-menu and game-settings content, settled all key design decisions (racing dark theme, PWA, portrait-only mobile, static offline), and wrote a full app PRD. The session then scaffolded the complete project space: Vite + React + TS + Tailwind, all standard Kai project files, memory junction, git init — building cleanly and ready for app code.

---

## What We Did

1. **Hardware requirements captured** — three setups documented in detail: XSX (ClubSport DD 15Nm, GT Alcantara V2 wheel, CSP V3 pedals, Shifter SQ, Handbrake V1.5), XSS (V2.5, CSL Elite WRC wheel, GT3 wheel, CSL Elite V2 pedals), PC (Logitech G920 gear-driven).
2. **Product page specs fetched** — 8 Fanatec product pages scraped via parallel WebFetch calls for exact model specs and tuning parameter lists.
3. **Parallel research agents launched** — Fanatec tuning menu deep dive (all ClubSport DD + V2.5 parameters) and Logitech G920 + game settings (FH6 + F1 25 full in-game settings).
4. **App design settled** — PWA, racing dark theme, mobile-first portrait-only, three core features (Settings Encyclopedia / Troubleshooter / Profile Manager) plus Settings tab. All data baked in, fully offline after first load, profiles in localStorage.
5. **App plan written** — `plans/wheely-good-app.md` with full feature spec, data models, UI flows, and 4-phase build plan. Portrait-only layout added after Nathan's note.
6. **Vite scaffold created** — `bun create vite --template react-ts`, Tailwind + `@tailwindcss/vite` + `react-router-dom` installed. App builds clean.
7. **Project directory structure** — `docs/`, `sessions/`, `scratchpad/`, `diagrams/`, `src/data/{hardware,games,symptoms}`, `src/components/{layout,encyclopedia,troubleshooter,profiles,settings,shared}`, `src/hooks/`, `src/pages/`.
8. **All Kai project files written** — `CLAUDE.md` (full hardware + design context), `TIMELINE.md`, `open-threads.md`, `FILE-INDEX.md`, memory symlink to Claude memory dir, git init.

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| PWA (static, no backend) | Offline-capable after first load; no backend maintenance; localStorage for profiles is sufficient for 2-user scope |
| Portrait-only on mobile | Nathan's use case; simplifies layout (no landscape breakpoints) |
| Racing dark theme, single accent (Fanatec lime) | Matches the hardware aesthetic; consistent with the OLED tuning display feel |
| Data baked in at build time | No API, no network dependency; all settings content is static and curated |
| Three core tabs: Learn / Fix / Saves | Encyclopedia for settings knowledge, Troubleshooter for symptom → fix, Profile Manager for hardware settings snapshots |
| Profiles = hardware settings snapshots, not car tuning | Profiles capture wheel base tune menu values + in-game FFB settings; car tuning is Phase 5+ |
| React + Vite + Bun + TailwindCSS | Nathan's standard stack for personal projects |

---

## Files Created

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project context — all hardware setups, design decisions, architecture |
| `TIMELINE.md` | Project timeline |
| `open-threads.md` | Active threads |
| `FILE-INDEX.md` | Artifact index |
| `plans/wheely-good-app.md` | Full app PRD — features, data models, UI flows, phase plan |
| `vite.config.ts` | Vite config with Tailwind v4 plugin |
| `src/index.css` | Tailwind base CSS |
| `src/App.tsx` | Minimal placeholder app shell |
| `index.html` | PWA meta tags, app title |
| `package.json` | Dependencies |

---

## Files Modified

| File | Change |
|------|--------|
| `plans/wheely-good-app.md` | Added portrait-only layout note after Nathan's feedback |

---

## Next Steps

- [ ] Start building Phase 1: app shell, bottom nav, routing, theme context
- [ ] Author hardware settings data files (one per hardware component)
- [ ] Author game settings data files (FH6 + F1 25)
- [ ] Wire up Encyclopedia page with settings list and detail view

---

## Open Questions

- Should the Troubleshooter use a car diagram, a symptom list, or both? (Decided in next session: hybrid approach)

---

## Related Sessions

- [2026-05-30 — Full app build (all 4 phases)](2026-05-30-full-app-build.md) — Session where the entire app was built out on top of this scaffold
- [2026-05-30 — UI polish + F1 research (impeccable)](2026-05-30-ui-polish-f1-research.md) — Session 2 on 2026-05-30 covering visual design improvements
