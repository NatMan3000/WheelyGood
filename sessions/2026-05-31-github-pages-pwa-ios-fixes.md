---
type: auto
session_id: fc658936-ff88-41ae-af4c-38411376e07e
project: WheelyGood
date: 2026-05-31
topic: GitHub Pages PWA deploy + iOS safe-area fixes
duration: ~6 hours
events: 10
---

# WheelyGood — GitHub Pages PWA Deploy + iOS Safe-Area Fixes

**Project:** WheelyGood (`~/Dev/WheelyGood`)
**Date:** 2026-05-31
**Duration:** ~6 hours (11:31–17:33)
**Participants:** Nathan, Kai
**Session Restart ID:** `claude -r fc658936-ff88-41ae-af4c-38411376e07e`

## Summary

This session deployed WheelyGood to GitHub Pages as an installable PWA, following the same pattern used for Bready. Along the way it also bulk-cleared the "Draft" badge from all 43 settings that had been flagged unverified, then fixed two iOS PWA issues that Nathan spotted on-device — bottom nav drift in Safari and header overlap with the status bar — including the subtler case of full-screen detail pages that live outside the AppShell.

## What We Did

1. **Investigated and cleared the "Draft" badges** — the `setting.unverified` flag (43 of 64 settings) rendered amber Draft chips on settings Kai had authored from research but Nathan hadn't yet confirmed against real hardware menus. Bulk-stripped the `unverified: true` flag from all data files, updated stale comments, and wrote `docs/unverified-settings.md` recording which 43 were still draft at that point (for future on-hardware verification).

2. **Deployed to GitHub Pages following the Bready pattern** — cloned the exact workflow from `~/Dev/Bready`:
   - `vite.config.ts`: `base: '/WheelyGood/'`, manifest `scope`/`start_url`, `navigateFallback`
   - Router `basename` set to `import.meta.env.BASE_URL`
   - `.github/workflows/deploy.yml` (Bun build → Pages artifact)
   - Resolved the `workflow` scope gap on the `gh` token (required interactive `gh auth refresh`)
   - Discovered WheelyGood was private (Bready is public) — flipped to public with Nathan's approval; GitHub Pages free tier requires public repos

3. **Fixed the subpath asset-rebasing gotcha** — Vite only rebases paths in `index.html`, not JS string literals or CSS `url()`. Created `src/utils/asset.ts` (`asset()` helper using `import.meta.env.BASE_URL`) and updated `BrandLogo.tsx`, `GameLogo.tsx`, `SetupLogo.tsx`, `CarDiagram.tsx`, and `PWAInstallPrompt.tsx`. Moved `tyre-tread.jpg` from `public/` to `src/assets/` so its CSS `url()` gets bundled and rebased automatically.

4. **Fixed bottom nav drift on iOS Safari** — the nav was `position: fixed`, which anchors to the *layout* viewport; as Safari's chrome collapses on scroll, the bar drifts and content shows beneath it. Switched to the standard app-shell pattern: `AppShell.tsx` root is `flex h-dvh flex-col overflow-hidden`, only `<main>` scrolls, and `BottomNav` is an in-flow flex child (not fixed). Verified in-browser with a simulated iPhone inset.

5. **Fixed header overlapping the iOS status bar** — `black-translucent` + `viewport-fit=cover` makes the app full-bleed under the status bar; only the bottom was padded. Added `pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))]` to the AppShell root (slightly trimmed after Nathan's feedback on the first pass).

6. **Fixed Saves page header button overlap** — `PageHeader` stacked buttons beside the title with `justify-between`, but at phone width three buttons couldn't fit. Refactored to `flex-col` on mobile / `md:flex-row` on desktop so buttons wrap on their own row.

7. **Fixed status bar overlap on full-screen detail pages** — `SettingDetailPage` and `SymptomDetailPage` are outside the AppShell (full-screen routes), so they didn't inherit the top safe-area. Added the inset as top padding on each page's sticky Back bar with `box-content` (preserves the 56px `h-14` row) and an opaque gradient background to cover the status-bar zone when content scrolls beneath it.

8. **Saved the GitHub Pages PWA deploy pattern** — written to `~/Dev/memory/github-pages-pwa-deploy.md` (Mac-local, full cross-project pattern including the iOS safe-area gotchas), wired into `~/.claude/rules/core/knowledge-index.md` under "GitHub Pages PWA deploy" + safe-area triggers. A concise in-project copy lives in `CLAUDE.md` under "Mobile / iOS safe-area gotchas" (git-tracked, syncs cross-machine).

9. **Verified the live site** — HTTP 200, all asset paths carry `/WheelyGood/` subpath, JS bundle + manifest reachable. Four GitHub Actions deploys all green.

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Made repo public | GitHub Pages free tier requires public repos — WheelyGood has no secrets, all data baked into JS, profiles in localStorage |
| Moved tread image to `src/assets/` | Vite bundles and rebases CSS `url()` paths when the image is in `src/`; `public/` paths go through at their absolute URL, breaking the `/WheelyGood/` subpath |
| App-shell layout for nav (not `position: fixed`) | Fixed anchors to layout viewport and drifts with iOS Safari chrome; in-flow flex child in a `h-dvh` shell is the correct SPA pattern |
| `box-content` on detail page Back bar | Keeps the `h-14` (56px) button row intact while the inset is added *above* it as top padding, rather than compressing the row |
| `max(0px, inset-top − 0.5rem)` inset trim | Slightly tighter than the raw inset after Nathan's on-device feedback — still clears status bar on all devices |
| Saved pattern in two places (memory file + CLAUDE.md) | Memory file is Mac-local (gitignored); CLAUDE.md copy is git-tracked and syncs to Windows — cross-machine safety net |

## Files Created

| File | Description |
|------|-------------|
| `src/utils/asset.ts` | `asset()` helper — prepends `import.meta.env.BASE_URL` to public-asset paths so they work under the `/WheelyGood/` subpath |
| `.github/workflows/deploy.yml` | GitHub Actions workflow: Bun build → upload Pages artifact → deploy (mirrors Bready pattern) |

## Files Modified

| File | Change |
|------|--------|
| `docs/unverified-settings.md` | Written: 43 still-draft settings by category with IDs; guidance for re-flagging individual settings |
| `FILE-INDEX.md` | Added `docs/unverified-settings.md` entry |
| `src/data/hardware/*.ts`, `src/data/games/*.ts` | Stripped 43 `unverified: true` flags; updated stale header comments to point to `docs/unverified-settings.md` |
| `src/components/shared/BrandLogo.tsx` | Use `asset()` helper for logo src paths |
| `src/components/shared/GameLogo.tsx` | Use `asset()` helper for logo src paths |
| `src/components/shared/SetupLogo.tsx` | Use `asset()` helper for logo src paths |
| `src/components/troubleshooter/CarDiagram.tsx` | Use `asset()` helper for car image + hotspot image paths |
| `src/components/PWAInstallPrompt.tsx` | Use `asset()` helper for icon path |
| `src/index.css` | Update tread background to bundled `src/assets/tyre-tread.jpg` path (Vite-rebased) |
| `src/assets/tyre-tread.jpg` | Moved from `public/tyre-tread.jpg` so Vite bundles + rebases the CSS url |
| `vite.config.ts` | Set `base: '/WheelyGood/'`; manifest `scope`/`start_url: '/WheelyGood/'`; `navigateFallback` for SPA |
| `src/main.tsx` | Set `BrowserRouter basename={import.meta.env.BASE_URL}` |
| `src/components/layout/AppShell.tsx` | App-shell layout (`h-dvh`, inner-scroll `<main>`, `pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))]`) |
| `src/components/layout/BottomNav.tsx` | Converted from `position: fixed` to in-flow flex child; drop backdrop-blur |
| `src/components/shared/PageHeader.tsx` | Stack title above actions on mobile (`flex-col md:flex-row`); actions wrap on own row |
| `src/pages/SettingDetailPage.tsx` | Sticky Back bar: `box-content pt-[max(0px,calc(env(safe-area-inset-top)-0.5rem))]` + opaque gradient top |
| `src/pages/SymptomDetailPage.tsx` | Same Back bar fix as SettingDetailPage |
| `CLAUDE.md` | Added Deployment section and "Mobile / iOS safe-area gotchas" section |
| `TIMELINE.md` | Added deployment and iOS fix milestones |
| `open-threads.md` | Resolved hosting/deployment thread |

**Cross-project files (not in this commit):**

| File | Change |
|------|--------|
| `~/Dev/memory/github-pages-pwa-deploy.md` | Written: full cross-project GitHub Pages PWA deploy pattern + iOS safe-area gotchas (Mac-local, Kai recall) |
| `~/.claude/rules/core/knowledge-index.md` | Added entry for "GitHub Pages PWA deploy" + safe-area triggers |

## Next Steps

- [ ] Test on-device (phone) after each deploy: close/reopen installed PWA to clear SW cache
- [ ] Verify safe-area fixes in standalone PWA mode (install from `https://natman3000.github.io/WheelyGood/`)
- [ ] Dropdown repositioning: setup + game dropdowns stacked vertically in Simpedia header (still open thread)
- [ ] On-hardware verification of the 43 settings in `docs/unverified-settings.md`

## Open Questions

- Deep-link refresh 404s before SW installs (same as Bready — acceptable for now; optional `404.html` trick exists if needed later)

## Related Sessions

- [2026-05-30 — UI polish + F1 25 research](2026-05-30-ui-polish-f1-research.md)
- [2026-05-30 — Full app build](2026-05-30-full-app-build.md)
- [2026-05-30 — Project scaffold](2026-05-30-project-scaffold.md)
