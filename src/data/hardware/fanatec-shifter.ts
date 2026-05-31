import type { Setting } from "../../types"

// ── SEED DATASET — ClubSport Shifter SQ V1.5 ──────────────────────────
// DRAFT values authored by Kai. Nathan to verify against the physical unit.
// Draft flags cleared 2026-05-31 (see docs/unverified-settings.md). Re-add `unverified: true` to re-flag.
//
// The SQ V1.5 has no on-wheel menu or software tuning panel.
// All adjustments are physical: a mode switch on the body, and a resistance
// screw under the shift knob. Both are modelled here with access:"in-game"
// and a path that makes the physical nature explicit.

export const fanatecShifterSettings: Setting[] = [
  {
    id: "fanatec-shifter-mode",
    name: "Shift Mode (H-Pattern / Sequential)",
    category: "shifter",
    hardware: ["fanatec-shifter"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "Physical switch on the underside of the shifter body (no software menu)",
    },
    description:
      "Toggles the shifter between H-pattern (1–6 + R gate) and sequential (+/– rocker) operation. This is a physical hardware switch on the shifter body — flip it with the unit powered down, then select the matching transmission mode in-game. H-pattern suits road/rally cars; sequential suits open-wheelers and fast sequential gearboxes.",
    valueType: {
      kind: "enum",
      options: ["H-Pattern", "Sequential"],
      default: "H-Pattern",
    },
    increaseEffect:
      "Sequential mode: single-axis shifting (push forward for up, pull back for down) — faster, suits racing gearboxes.",
    decreaseEffect:
      "H-Pattern mode: full gate shifting into individual gears — more immersive for road cars and rallying.",
    sweetSpot: "Match to the car class — H-pattern for road/rally, sequential for open-wheel.",
    warnings: [
      "Switch mode with the unit powered off. Switching while powered can confuse the base input mapping.",
      "In-game transmission setting must match — set it to Manual H-Pattern or Manual Sequential to match the physical mode.",
    ],
  },
  {
    id: "fanatec-shifter-resistance",
    name: "Shift Throw Resistance",
    category: "shifter",
    hardware: ["fanatec-shifter"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "Physical resistance screw under the shift knob (no software menu) — turn clockwise to increase",
    },
    description:
      "Adjusts the mechanical resistance of the shift throw via an adjustment screw located beneath the shift knob. Higher resistance gives a more deliberate, positive-feeling gate; lower resistance produces a lighter, faster throw. Preference is personal — heavier feels more mechanical, lighter suits fast sequential use.",
    valueType: {
      kind: "enum",
      options: ["Light", "Medium", "Heavy"],
      default: "Medium",
    },
    increaseEffect:
      "Heavier throw: more deliberate gate feel, harder to miss a shift under pressure — suits H-pattern road cars.",
    decreaseEffect:
      "Lighter throw: faster, less fatiguing shifts — suits sequential or long sessions.",
    sweetSpot: "Start at medium and adjust by feel. H-pattern road car drivers often prefer medium–heavy.",
  },
  {
    id: "fanatec-shifter-ingame-assignment",
    name: "In-Game Gear / Clutch Assignment",
    category: "shifter",
    hardware: ["fanatec-shifter"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "Game controller / input bindings screen — assign shifter axes to gear positions",
    },
    description:
      "In-game binding step: assign each shifter input (gear 1–6, reverse, sequential up/down) to the correct in-game action. Most Fanatec-aware titles detect the SQ V1.5 automatically and pre-bind correctly. If bindings are wrong or missing, map manually in the game's controller settings. Also confirm whether the game uses H-pattern or sequential mode in its own transmission settings.",
    valueType: {
      kind: "enum",
      options: ["Auto-detected", "Manual binding required"],
      default: "Auto-detected",
    },
    increaseEffect:
      "Manual binding: full control over every gear position and action mapping.",
    decreaseEffect:
      "Auto-detected: game maps inputs automatically — fastest setup, works for most titles.",
    sweetSpot: "Try auto-detect first; only remap if a gear position misfires or is missing.",
    warnings: [
      "Forza Horizon titles generally detect Fanatec shifters well. Verify reverse gear assignment separately.",
    ],
  },
]
