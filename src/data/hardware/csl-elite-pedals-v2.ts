import type { Setting } from "../../types"

// ── SEED DATASET — CSL Elite Pedals V2 ───────────────────────────────
// DRAFT values authored by Kai (hybrid sourcing). Nathan to verify each
// against real menus and pedal behaviour before this is treated as truth.
// Every setting is flagged `unverified: true` until confirmed.
//
// Load-cell concept: the CSL Elite V2 brake uses a load cell — it measures
// HOW HARD you press (force/pressure), not how far the pedal travels.
// The pedal barely moves; you squeeze against the rubber bump stop.
// This is fundamentally different from a standard potentiometer pedal.
//
// Key difference vs CSP V3: the CSL Elite V2 has NO vibration motors
// on any pedal. You will not feel ABS pulses or engine texture through
// the pedals — that feedback is wheel-only on this setup.
//
// BRF lives in the wheel base tuning menu (accessed via the wheel rim).

export const cslElitePedalsV2Settings: Setting[] = [
  {
    id: "csl-elite-pedals-v2-brf",
    name: "Brake Force",
    abbreviation: "BRF",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csl-elite-pedals-v2"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → BRF" },
    description:
      "Sets how much physical force (squeeze pressure) on the brake pedal equals 100% brake input in-game. " +
      "The CSL Elite V2 brake pedal uses a load cell — it measures force (pressure), not how far the pedal moves. " +
      "Higher BRF means you must push harder to reach 100%; lower BRF means lighter pressure achieves full braking. " +
      "Getting this right is the most impactful pedal adjustment: too low leads to constant lock-ups; too high and you can't trail-brake precisely.",
    valueType: { kind: "numeric", min: 1, max: 100, default: 50 },
    increaseEffect:
      "You must press harder for the same brake percentage — pedal feels firmer, gives more control over braking force at the limit.",
    decreaseEffect:
      "Light pressure reaches 100% — easier to brake hard but precise threshold braking becomes very difficult.",
    sweetSpot:
      "40–65 is a common starting range. The goal is a firm-but-reachable full-brake point. New drivers often start at 30–45 and increase as they develop pedal technique.",
    warnings: [
      "Too low a value (e.g. 10–20) makes it nearly impossible to modulate braking — almost any pressure goes straight to 100%.",
      "Unlike the CSP V3, you have no vibration feedback from ABS activation on these pedals — rely on visual ABS indicator in-game and wheel vibration (ABS setting) instead.",
      "After changing BRF, retrain your muscle memory with a few laps before drawing conclusions.",
    ],
    unverified: true,
  },
  {
    id: "csl-elite-pedals-v2-no-vibration",
    name: "Pedal Vibration — Not Available",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csl-elite-pedals-v2"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "N/A — no vibration motors on CSL Elite V2" },
    description:
      "The CSL Elite Pedals V2 do not have vibration motors. There is no tactile ABS pulse or engine texture feedback through the pedals. " +
      "This is the main hardware difference from the ClubSport Pedals V3. ABS and road feel are communicated only through the wheel itself (wheel ABS vibration and FFB). " +
      "This is not a setting you can adjust — it is a hardware limitation to be aware of.",
    valueType: { kind: "enum", options: ["Not available"], default: "Not available" },
    increaseEffect: "N/A",
    decreaseEffect: "N/A",
    warnings: [
      "No pedal vibration on the CSL Elite V2. To sense ABS activation, rely on the wheel's ABS vibration (set via Tuning menu → ABS on the wheel base) and your in-game ABS indicator.",
    ],
    unverified: true,
  },
  {
    id: "csl-elite-pedals-v2-throttle-hall",
    name: "Throttle & Clutch Sensor Type",
    category: "pedals",
    subcategory: "throttle",
    hardware: ["csl-elite-pedals-v2"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "N/A — hardware specification" },
    description:
      "The CSL Elite V2 throttle and clutch pedals use Hall-effect magnetic sensors rather than potentiometers. Hall-effect sensors have no physical contact point to wear out, giving more consistent readings over time and avoiding the 'spikes' common in older potentiometer pedals. " +
      "This is a hardware characteristic, not an adjustable setting — it means you can trust the throttle and clutch inputs to be linear and consistent without calibration drift.",
    valueType: { kind: "enum", options: ["Hall-effect (fixed)"], default: "Hall-effect (fixed)" },
    increaseEffect: "N/A",
    decreaseEffect: "N/A",
    sweetSpot: "No adjustment needed. Hall sensors self-calibrate and don't drift.",
    unverified: true,
  },
  {
    id: "csl-elite-pedals-v2-brake-performance-kit",
    name: "Brake Elastomer Firmness",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csl-elite-pedals-v2"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Physical — swap elastomer in pedal body" },
    description:
      "The CSL Elite V2 ships with a rubber bump stop (elastomer) that sets the physical firmness of the brake pedal. Fanatec sells optional Performance Kit elastomers in different hardness levels. " +
      "This is a physical hardware swap inside the pedal — not a software setting. A firmer elastomer requires more leg force to reach maximum compression, and should be paired with a higher BRF value.",
    valueType: { kind: "enum", options: ["Standard", "Performance Kit — soft", "Performance Kit — medium", "Performance Kit — hard"], default: "Standard" },
    increaseEffect: "Firmer physical pedal — more realistic brake feel, better for high-force driving.",
    decreaseEffect: "Softer physical pedal — easier to press but reduces modulation precision at the limit.",
    sweetSpot: "Medium for most drivers. Hard suits drivers who want a high BRF value and strong pedal pressure.",
    warnings: [
      "Physical swap required — no software equivalent. Always re-tune BRF after changing elastomers.",
    ],
    unverified: true,
  },
]
