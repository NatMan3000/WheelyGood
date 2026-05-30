import type { Setting } from "../../types"

// ── SEED DATASET — ClubSport Pedals V3 ───────────────────────────────
// DRAFT values authored by Kai (hybrid sourcing). Nathan to verify each
// against real menus and pedal behaviour before this is treated as truth.
// Every setting is flagged `unverified: true` until confirmed.
//
// Load-cell concept: unlike a standard potentiometer pedal that measures
// HOW FAR you press the pedal, the CSP V3's brake uses a load cell that
// measures HOW HARD you press it. The pedal barely moves — you squeeze
// harder into the rubber bump stop to register more braking force.
// This is far closer to real racing car brakes.
//
// BRF (Brake Force) lives in the wheel base's tuning menu, not on the
// pedals themselves, because it's transmitted via the base.

export const cspV3Settings: Setting[] = [
  {
    id: "csp-v3-brf",
    name: "Brake Force",
    abbreviation: "BRF",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csp-v3"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → BRF" },
    description:
      "Sets how much physical force (squeeze pressure) on the brake pedal equals 100% brake input in-game. " +
      "The CSP V3 uses a load cell — it measures force (kg), not distance. " +
      "A high BRF value means you have to squeeze harder to reach 100%; a low value means light pressure triggers full braking. " +
      "This is the most important pedal setting to dial in: too low and you'll lock up constantly; too high and you can't modulate trail-braking.",
    valueType: { kind: "numeric", min: 1, max: 100, default: 50 },
    increaseEffect:
      "You must press harder for the same brake percentage — pedal feels firmer and more progressive, closer to a real race car.",
    decreaseEffect:
      "Lighter pressure reaches 100% — easier to brake hard but harder to modulate, increasing lock-up risk.",
    sweetSpot:
      "40–65 is a common starting range. Adjust until a firm but comfortable push just reaches 100%. New users often start lower (30–45) and increase as they build leg strength and technique.",
    warnings: [
      "Too low (e.g. 10–20) means almost any pedal pressure locks the brakes — very hard to modulate.",
      "After changing BRF, take a few laps to recalibrate muscle memory before judging the feel.",
    ],
    interactsWith: [
      { settingId: "csp-v3-brake-vibration", relationship: "BRF affects when ABS fires; ABS intensity determines how clearly you feel it." },
    ],
    unverified: true,
  },
  {
    id: "csp-v3-brake-vibration",
    name: "Brake Pedal Vibration (ABS Motor)",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csp-v3"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → ABS" },
    description:
      "The CSP V3 has a vibration motor under the brake pedal. When the game signals ABS activation, the pedal buzzes to simulate the ABS pulse you'd feel in a real car. " +
      "This is controlled by the ABS setting in the wheel's tuning menu, the same value that governs ABS vibration in the wheel rim. " +
      "This tactile feedback helps you identify and release the brake threshold without locking up.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Stronger buzz under your foot during ABS activation — very clear signal to ease off the brake.",
    decreaseEffect: "Subtler vibration — less intrusive, but the lock-up warning is harder to feel.",
    sweetSpot:
      "40–70 is a useful starting range. High enough to clearly feel ABS triggering under your foot; low enough it's not jarring mid-corner.",
    interactsWith: [
      { settingId: "csp-v3-brf", relationship: "BRF sets the threshold where ABS fires; ABS intensity sets how loudly you feel it." },
    ],
    unverified: true,
  },
  {
    id: "csp-v3-throttle-vibration",
    name: "Throttle Pedal Vibration",
    category: "pedals",
    subcategory: "throttle",
    hardware: ["csp-v3"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → SHO" },
    description:
      "The CSP V3 throttle pedal also has a vibration motor. It responds to the wheel base's shock/vibration (SHO) signal, giving tactile feedback through the throttle for engine revs, wheelspin, or surface texture depending on how the game uses the effect channel.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Stronger tactile buzz under your right foot — more sensory information about wheelspin and engine state.",
    decreaseEffect: "Less vibration through the throttle pedal — quieter underfoot, less distraction.",
    sweetSpot: "30–60 is a reasonable starting range. Most drivers find heavy throttle vibration distracting; moderate values add useful feel without being intrusive.",
    warnings: [
      "The throttle vibration channel shares the SHO signal from the base — games must support this channel for it to fire.",
    ],
    unverified: true,
  },
  {
    id: "csp-v3-brake-performance-kit",
    name: "Brake Elastomer / Performance Kit Firmness",
    category: "pedals",
    subcategory: "brake",
    hardware: ["csp-v3"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Physical — swap elastomer in pedal body" },
    description:
      "The V3 ships with a rubber bump stop (elastomer) that determines the physical firmness of the brake pedal. Fanatec sells a Performance Kit with multiple elastomer options ranging from soft to extra-hard. " +
      "This is a hardware change, not a software setting — you physically swap the elastomer in the pedal. A firmer elastomer raises the actual force needed, which pairs with a higher BRF value.",
    valueType: { kind: "enum", options: ["Standard (medium)", "Performance Kit — soft", "Performance Kit — medium", "Performance Kit — hard", "Performance Kit — extra hard"], default: "Standard (medium)" },
    increaseEffect: "Firmer physical pedal feel — closer to a real brake master cylinder, great for high-force trail braking.",
    decreaseEffect: "Softer physical pedal feel — easier to press but less precise modulation at the top of the range.",
    sweetSpot: "Medium or hard for most drivers; harder kits suit drivers who prefer high BRF values and strong leg force.",
    warnings: [
      "This is a physical hardware swap. Always adjust BRF after changing elastomers — the force range changes.",
    ],
    unverified: true,
  },
]
