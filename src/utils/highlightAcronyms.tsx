import { Fragment, type ReactNode } from "react"
import { allSettings } from "../data/settings"

// Acronyms that appear on the wheel's on-wheel tuning menu (SEN, FF, NDP, BRF,
// …). Derived from every setting whose location is the on-wheel tuning menu, so
// the list stays in sync with the data. Highlighted bright red wherever they
// appear so you can match the app to the labels on your wheel at the rig.
const ACRONYMS = Array.from(
  new Set(
    allSettings
      .filter((s) => s.location.access === "on-wheel-tuning" && s.abbreviation)
      .map((s) => s.abbreviation as string),
  ),
).sort((a, b) => b.length - a.length)

const ACRONYM_SET = new Set(ACRONYMS)
const ACRONYM_RE = ACRONYMS.length ? new RegExp(`\\b(${ACRONYMS.join("|")})\\b`, "g") : null

export const ACRONYM_CLASS = "text-red-400 font-semibold"

/** Wrap any on-wheel acronym occurrences in `text` with a bright-red span. */
export function highlightAcronyms(text: string): ReactNode {
  if (!ACRONYM_RE) return text
  // split with a capturing group → acronyms land at odd indices
  const parts = text.split(ACRONYM_RE)
  return parts.map((part, i) =>
    ACRONYM_SET.has(part) ? (
      <span key={i} className={ACRONYM_CLASS}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** True if a string is itself an on-wheel acronym (for badge styling). */
export function isWheelAcronym(s: string | undefined): boolean {
  return !!s && ACRONYM_SET.has(s)
}
