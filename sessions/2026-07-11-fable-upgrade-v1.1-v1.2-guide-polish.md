---
type: auto
session_id: 83e467db-0b2d-4c0c-bcbd-333190083ae7
project: WheelyGood
date: 2026-07-11
topic: Fable upgrade pass - context-aware values, dial-in editing, Setup Guide, troubleshooter fix sessions
duration: 4.4 hours
events: 348
---

**Session Restart ID:** `claude -r 83e467db-0b2d-4c0c-bcbd-333190083ae7`

**Duration:** 4.4 hours
**Participants:** Nathan, Kai (Fable 5)

## Summary

Nathan asked for a full "Fable upgrade" pass on WheelyGood (the sim-racing setup PWA built with Josh) - open-ended design/functionality/feature review, then build. Kai ran the `impeccable` skill for design grounding, then shipped three rounds: v1.1 (context-aware recommended values wired from Fanatec's official F1 25 research, a profile dial-in view, unified search), a mid-round fix (dial-in rows made directly editable after Nathan flagged the tick-only UX as pointless), v1.2 (Setup Guide wizard, troubleshooter fix-session tracking, compare-vs-recommended), and a final guide-polish round from live feedback (inline rig/game pickers, full detail shown by default instead of collapsed).

## What We Did

1. Ran `impeccable` skill, read the ~5.7k-line codebase and existing F1 25 research doc, then wired Fanatec-official on-wheel values (SEN 360 / FF 75 / NDP 55 / NFR·NIN Off / INT 10 / FEI 100) into the DD hardware data - previously verified but never encoded; V2.5 flagged honestly as community-derived, FH6 left on defaults (no published source).
2. Built the "Your rig" pattern: Simpedia cards and detail pages now show the recommended value for the active rig+game everywhere, not just static reference text.
3. Built a new profile dial-in read view (`/saves/:id`) - wheel-menu-grouped big values, tap-to-tick progress persisted per profile; moved editing to `/saves/:id/edit`.
4. Unified Simpedia search across settings and Troubleshooter symptoms; added Troubleshooter's own search + per-area fix counts.
5. Resolved the standing open thread (dropdown repositioning) - Simpedia header pickers now stack vertically top-right via a compact `ContextPicker` variant.
6. Verified everything in-browser (desktop width), shipped v1.1 (`e5a6430`), deploy green on both remotes.
7. **User feedback round 1:** ticking a dial-in row did nothing actionable - Nathan couldn't change a value from that screen. Fixed by making the value itself tappable (shared `SettingValueInput` component), with editing a value auto-clearing its tick (v1.2 dial-in fix, `92dcfa7`).
8. **Feature ideation:** proposed 8 enhancements (Setup Guide, troubleshooter fix-session tracking, fix-count chips, reverse symptom lookup, share-by-link, tuning-menu-access reference, compare-vs-stock, PWA shortcuts) via `AskUserQuestion`; built the full set as v1.2 (`2375092`) after a mid-stream API stall + "continue".
9. **User feedback round 2:** Setup Guide's "change platform/game" control bounced to the Simpedia page instead of switching in place - replaced with the same `ContextPicker` embedded directly on the guide intro (`f4b6c4d`).
10. **User feedback round 3:** "Full detail" on guide steps first became a tap-to-expand inline panel (`db17d85`), then Nathan ruled it should just be visible by default - removed the toggle entirely, every step now always shows description, rec note, turn-it-up/down cards, sweet spot, interactions, warnings (`d0f6430`).
11. Wrapped: resolved the open thread, updated `CLAUDE.md`/`TIMELINE.md`/`FILE-INDEX.md` live in-session, committed and pushed to both remotes throughout (8 commits total, `e5a6430..27a1bbe`), stopped the dev server.

## Key Decisions

| Decision | Rationale |
|---|---|
| Only populate structured hardware recommendations where a published source exists | Fanatec official F1 25 DD values in; V2.5 flagged as community-derived; FH6 left on defaults - editorial numbers never invented to fill the schema |
| Tick-only dial-in selection replaced with tap-to-edit | User feedback: a selection with no action payoff reads as broken; editing now happens in place, tick auto-clears on edit |
| "Full detail" made always-visible on guide steps, not an expander | User's second-pass call after trying the expander - fewer taps, guide reads as the full reference it should be |
| Guide intro embeds `ContextPicker` directly | Switching rig/game shouldn't require leaving the guide for Simpedia; the guide already keys progress per rig+game combo |

## Files Created / Modified

| File | Change |
|------|--------|
| `src/pages/SettingDetailPage.tsx`, `src/data/settings.ts`, `src/data/hardware/fanatec-dd.ts`, `fanatec-v25.ts` | Fanatec-official F1 25 DD values wired in; V2.5 flagged as estimates |
| `src/components/encyclopedia/SettingCard.tsx` | New - "Your rig" value display |
| `src/pages/ProfileViewPage.tsx` | New dial-in read view with tap-to-tick + tap-to-edit |
| `src/components/shared/SettingValueInput.tsx` | New - shared inline value editor |
| `src/pages/TroubleshooterPage.tsx` | New - search, per-area fix counts |
| `src/pages/SymptomDetailPage.tsx` | New - persistent Helped/No-change verdicts per fix, rig starting values |
| `src/components/troubleshooter/SymptomCard.tsx` | New - fix-count chips |
| `src/pages/SetupGuidePage.tsx` | New - Setup Guide wizard, inline rig/game pickers, always-visible full detail |
| `src/components/shared/ContextPicker.tsx` | Compact/stacked variant; embedded in guide intro |
| `src/pages/ProfileComparePage.tsx` | Differences-only toggle; synthetic ★ Recommended compare profiles |
| `src/hooks/usePageTitle.ts` | New - per-page document titles |
| `src/data/setups.ts`, `src/data/symptoms/symptoms.ts`, `src/types/index.ts` | Tuning-menu-access reference text, symptom reverse-lookup helpers, new types |
| `PRODUCT.md`, `DESIGN.md` | New - design context grounding for future passes |
| `package.json`, `vite.config.ts` | Version bump to 1.2.0, PWA icon shortcuts |
| `CLAUDE.md`, `TIMELINE.md`, `FILE-INDEX.md` | Updated live in-session |

## Next Steps

- [ ] Nathan: eyeball v1.1/v1.2 on the iPhone - mobile width couldn't be emulated in-session (DevTools MCP dropped, extension `resize_window` doesn't actually resize on macOS); Simpedia header + guide steps are the ones worth checking
- [ ] PWA shortcuts need a reinstall/service-worker refresh to appear
- [ ] `bun run lint` still fails on 3 pre-existing fast-refresh errors (provider + hook sharing a file) - cosmetic, noted in CLAUDE.md

## Open Questions

None outstanding - all requested feedback rounds were shipped and verified live.
