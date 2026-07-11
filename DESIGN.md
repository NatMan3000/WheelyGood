# DESIGN.md — WheelyGood

Documented from the live code (src/index.css + component classes), 2026-07-11.

## Color

- OKLCH cool-slate neutrals, hue 255, chroma 0.008–0.018 (no pure gray, no #000/#fff).
  - Surfaces: `neutral-950` page (0.155), `neutral-900` cards (0.205), `neutral-800` borders/inputs (0.269).
  - Text: `white` (0.965) headings, `neutral-300/400` body/secondary, `neutral-500` labels.
- Single fixed accent: Fanatec lime `#b4ff00` (`--accent`, mapped to Tailwind `accent`). Strategy: Restrained. Accent = primary actions, active selection, sweet-spot callouts, acronym highlights. No theme picker by design.
- Semantic: amber = unverified/warning/diff, red = decrease/delete, emerald = increase.
- Background texture: `.tread-surface` — real tyre-tread photo behind a 90–93% neutral-950 gradient, `background-attachment: fixed` so sticky headers tile-match the body.

## Typography

- System sans stack. One family. `tabular-nums` (`.tnum`) on all numerics.
- Scale: text-2xl bold page titles, text-sm body in lists/cards, text-xs uppercase tracking-wide section labels (`text-neutral-500`).
- On-wheel acronyms (SEN/FF/NDP…) render as red OLED-style tags (`OledTag`) mirroring the Fanatec wheel display; in prose they get the red highlight treatment (`highlightAcronyms`).

## Components

- Cards: `rounded-xl bg-neutral-900 border border-neutral-800`, hover = `border-accent` + `.card-hover` lift (translateY(-2px), 180ms ease-out-quart).
- Buttons: primary = `bg-accent text-black rounded-lg font-semibold` (hover brightness-110); secondary = `border border-neutral-700` (hover border-neutral-500). Min tap target 44px everywhere.
- Inputs/selects: `bg-neutral-900 border-neutral-800`, focus `border-accent` + accent ring (35% mix).
- Pills for exclusive choices (setup/game/surface), dropdowns with logos for global context (ContextPicker).
- Brand chips: game/setup/brand logos on white rounded chips (GameLogo/SetupLogo/BrandLogo).

## Motion

- `--ease-out-quart` everywhere. Card hover 180ms; sheet-enter 240ms slide-up on detail pages; item-enter 320ms staggered list reveal (28ms steps, capped at 10).
- Full `prefers-reduced-motion` opt-out.

## Layout

- Mobile-first, max-w-2xl content column, px-4.
- App shell: h-dvh flex column, only `<main>` scrolls, in-flow BottomNav (Learn/Fix/Saves/Settings) with safe-area padding. Desktop: fixed w-56 sidebar.
- Full-screen detail routes (/setting/:id, /symptom/:id) sit OUTSIDE the shell and handle their own safe-area + sticky back bar.

## iOS PWA constraints (load-bearing)

See CLAUDE.md "Mobile / iOS safe-area gotchas" — black-translucent status bar, env(safe-area-inset-*) handling, box-content sticky bars. Do not regress these.
