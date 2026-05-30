---
type: auto
session_id: 4eb98637-923f-4510-a510-9bc1d089b9a2
project: WheelyGood
date: 2026-05-30
topic: UI polish via impeccable skill + F1 25 FFB re-research + tyre tread background
duration: ~2.2 hours (20:09–22:23)
events: 601
---

# WheelyGood — UI Polish (impeccable) + F1 25 FFB Research

**Project:** WheelyGood  
**Purpose:** Full visual design/UX audit and polish pass via the impeccable skill, F1 25 FFB re-research with authoritative sources, brand logos, and tyre-tread background  
**Duration:** ~2.2 hours (20:09–22:23)  
**Participants:** Nathan, Kai  
**Session Restart ID:** `claude -r 4eb98637-923f-4510-a510-9bc1d089b9a2`

---

## Summary

Nathan invoked `/impeccable:impeccable` to polish the app that had been built in the prior session. The skill ran a full product-register design/UX audit and applied a deep "go bolder" pass — OKLCH tinted tokens, a stroke-icon system replacing emoji, OLED-style wheel-code tags on encyclopedia cards, and a brand logo system for Fanatec and Logitech. Simultaneously, F1 25 FFB was re-researched against authoritative sources (Fanatec official July 2025 page + community sources), revealing a missing setting (Pit Stop Effects) and a miscategorised one (Understeer Enhance is a toggle, not a slider). The session ended at the context limit before the final user request (stacking setup/game dropdowns in the top-right header corner) could be completed — those changes remain uncommitted.

---

## What We Did

1. **impeccable skill invoked** — full product-register design audit + "go bolder" pass selected. 18 files touched in the first pass: OKLCH-tinted neutral/white/black tokens, `Icon.tsx` stroke icon family replacing emoji nav icons, active indicators on bottom nav + sidebar, banned side-stripe borders removed (replaced with full borders + tinted fills), WCAG-AA contrast on red tags, global `:focus-visible`, tabular numerics, `ease-out-quart` motion.
2. **Encyclopedia redesigned** — Nathan's screenshot feedback: "main page is very boring". Cards redesigned with OLED-style red wheel-code tags (SEN/FF/NDP — mirroring the actual tuning display), chevron affordance, and category headers with live count + fading rule line. New `OledTag` and `SymptomCard` components.
3. **F1 25 FFB re-researched** — agent launched against authoritative sources; research saved to `research/f1-25-ffb-research-2026-05-30.md`. Key findings: Pit Stop Effects setting was missing from the data; Understeer Enhance is a toggle (Off/On), not a slider — common misconception corrected (it makes the wheel *lighter* not heavier). Fanatec DD official values confirmed; V2.5 has no official F1 25 values anywhere.
4. **Brand logos wired in** — Fanatec and Logitech G logos added to `public/` (resized from Nathan-supplied images), `BrandLogo` component created, shown on Settings cards and the Simpedia context pill. Platform-before-brand logo order established. DOM-verified: all 3 images loaded correctly, `brokenCount: 0`.
5. **Setup/Game dropdowns added to Simpedia** — `ContextPicker` component replaces the static context pill. Inline dropdowns on the encyclopedia header let Nathan switch setup and game without going to Settings. Verified: switching to PC filters to Logitech-only settings, persists across navigation.
6. **Sticky header anchored** — Simpedia title + dropdowns + search pinned to top; content scrolls under. Jump-on-pin bug fixed with `-mt-4`. Verified via DOM probe: `stickyTop=0` even at `scrollY=500`.
7. **Theme picker removed** — theme system stripped entirely (dead `useTheme.tsx` and `themes.ts` deleted, `ThemeProvider` removed from `main.tsx`). Fanatec lime locked as the single accent via CSS `:root`. Prevents stored `localStorage.wg-theme` from overriding green.
8. **Encyclopedia renamed → "Simpedia"** — `PageHeader` shared component created, all four tabs use identical title scale/position/subtitle treatment. Consistent heading typography confirmed via DOM: `h1 at top:16/left:16/30px`, `cards at left:16 width:470px` across all four tabs.
9. **Tyre-tread background** — CSS-generated tread replaced with Nathan's real tread JPEG (`tyre-tread.jpg`), `background-attachment: fixed`, dark overlay. AppShell and Simpedia sticky header given `.tread-surface` class so the texture is continuous from header to body. Header bleed-through fixed (no more translucent black). `bun run build` green throughout.
10. **Commit `f173495`** pushed to Forgejo + GitHub — "Racing-themed redesign: Simpedia, dropdowns, tread bg, F1 25 data", 32 files, +1269/−269. Pushed dual-remote successfully.
11. **Remaining uncommitted** — tyre-tread background continuation work (AppShell + Simpedia header `.tread-surface` refactor) and an unresolved request to restack setup/game dropdowns vertically in the top-right of the header. Session hit the context limit before this was completed.

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| OKLCH tinted tokens for all neutrals | Eliminates pure `#000`/`#fff` (impeccable law); warm tint toward brand hue coheres the palette |
| OLED-style tags (SEN/FF/NDP on red monospace tiles) | Mirrors the actual wheel tuning display — makes the app feel like an extension of the hardware |
| F1 25 Understeer Enhance as toggle, not slider | Authoritative source correction — it makes the wheel lighter (less understeer signal), not heavier |
| Pit Stop Effects added to F1 25 data | Was missing; confirmed present in F1 25, added with verified description |
| Theme picker removed entirely | Fanatec lime is the correct accent for this app; user choice here adds complexity for no gain |
| `.tread-surface` shared utility class | Body and sticky header share the same fixed-position background image, eliminating the seam and bleed-through |
| Simpedia (renamed from Encyclopedia) | More distinctive naming for the settings encyclopedia feature |
| Shared `PageHeader` component | Ensures consistent title scale, position, and padding across all four tabs without per-page duplication |

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/shared/Icon.tsx` | Stroke icon family (24px, 2px, `currentColor`) — replaces emoji UI icons |
| `src/components/shared/OledTag.tsx` | Red monospace tag mirroring the wheel tuning display codes |
| `src/components/shared/ContextPicker.tsx` | Inline dropdown for setup + game selection in Simpedia header |
| `src/components/shared/BrandLogo.tsx` | Fanatec/Logitech brand logo chip component |
| `src/components/shared/PageHeader.tsx` | Shared page title + subtitle component used across all four tabs |
| `src/components/encyclopedia/SettingCard.tsx` | Redesigned card with OLED tag, chevron, structured layout |
| `src/components/encyclopedia/SettingsList.tsx` | Settings list with category headers + staggered reveal |
| `src/components/troubleshooter/SymptomCard.tsx` | New symptom card matching SettingCard visual language |
| `public/brand-fanatec.png` | Fanatec logo (resized to 256px from Nathan-supplied image) |
| `public/brand-logitech.png` | Logitech G logo (resized to 256px from Nathan-supplied image) |
| `public/tyre-tread.jpg` | Real tyre tread JPEG background (renamed from "tyre tread pattern.jpg") |
| `research/f1-25-ffb-research-2026-05-30.md` | Full F1 25 FFB research — 9 settings, Fanatec official + community sources, source table |

---

## Files Modified

| File | Change |
|------|--------|
| `src/index.css` | OKLCH tinted tokens, `.tread-surface` utility, tread background on body |
| `src/main.tsx` | Removed `ThemeProvider` |
| `src/App.tsx` | Routing + contexts |
| `src/components/layout/AppShell.tsx` | `.tread-surface` on main content area |
| `src/components/layout/BottomNav.tsx` | Stroke icons, active indicators |
| `src/components/layout/Sidebar.tsx` | Stroke icons, active indicators |
| `src/components/shared/DirectionCard.tsx` | Removed side-stripe border ban |
| `src/components/shared/RangeIndicator.tsx` | Design-law fixes |
| `src/pages/EncyclopediaPage.tsx` | Simpedia rename, sticky header, ContextPicker, PageHeader |
| `src/pages/TroubleshooterPage.tsx` | PageHeader, padding normalised |
| `src/pages/ProfilesPage.tsx` | PageHeader + design-law fixes |
| `src/pages/ProfileEditorPage.tsx` | Design-law fixes |
| `src/pages/ProfileComparePage.tsx` | Removed side-stripe diff rows |
| `src/pages/SettingDetailPage.tsx` | Redesigned hero (OLED tag + title, gradient back control) |
| `src/pages/SymptomDetailPage.tsx` | Redesigned hero (area pill + title, gradient back control) |
| `src/pages/SettingsPage.tsx` | Brand logos, platform-before-brand order, theme picker removed |
| `src/data/games/f1-25.ts` | Pit Stop Effects added; Understeer Enhance corrected to toggle |
| `src/data/setups.ts` | `brand` field added to all three setups |
| `src/types/index.ts` | `brand` field on Setup type |
| `FILE-INDEX.md` | `f1-25-ffb-research-2026-05-30.md` added to research section |

---

## Next Steps

- [ ] Complete the dropdown repositioning: stack setup and game dropdowns vertically, top-right of the Simpedia header (left incomplete at session limit)
- [ ] Commit the remaining uncommitted tread-surface changes (`src/index.css`, `src/components/layout/AppShell.tsx`, `src/pages/EncyclopediaPage.tsx`, `public/tyre-tread.jpg`, `public/tyre tread pattern.jpg`)
- [ ] Consider hosting/deployment (Cloudflare Pages or HomeLab) — currently needs a running dev server for phone access

---

## Open Questions

- Is the vertical dropdown stack (top-right header) the final UX for setup/game selection, or should it stay horizontal? (Nathan approved direction, session ended before implementation)

---

## Related Sessions

- [2026-05-30 — Project inception + scaffold](2026-05-30-project-scaffold.md) — First session: hardware research, app plan, Vite scaffold
- [2026-05-30 — Full app build (all 4 phases)](2026-05-30-full-app-build.md) — Session where the entire app was built before this polish pass
