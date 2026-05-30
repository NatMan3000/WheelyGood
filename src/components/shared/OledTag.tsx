import Icon, { type IconName } from "./Icon"

/*
  The signature element. On a Fanatec wheel the tuning menu shows these 3-letter
  codes (SEN, FF, NDP, …) on a small red-segment OLED. We mirror that here: a
  fixed-width monospace tag in wheel-OLED red, so the app reads like the display
  on the rig. Red is intentional and does NOT follow the accent theme — it is
  the wheel's identity, not an interaction colour (matches highlightAcronyms).

  Settings with no on-wheel code (in-game options) get a neutral glyph tag
  instead, which also keeps the card rows from looking identical.
*/

export default function OledTag({
  code,
  fallbackIcon = "sliders",
}: {
  code?: string
  fallbackIcon?: IconName
}) {
  if (code) {
    return (
      <span
        aria-hidden="true"
        className="grid h-12 w-14 shrink-0 place-items-center rounded-lg border border-red-500/40 bg-red-500/10 font-mono text-sm font-bold tracking-widest text-red-400 tnum shadow-[inset_0_0_12px_rgba(248,113,113,0.12)]"
      >
        {code}
      </span>
    )
  }
  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-14 shrink-0 place-items-center rounded-lg border border-neutral-700 bg-neutral-800/60 text-neutral-500"
    >
      <Icon name={fallbackIcon} className="h-5 w-5" />
    </span>
  )
}
