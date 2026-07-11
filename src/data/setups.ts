import type { Setup } from "../types"

export const setups: Setup[] = [
  {
    id: "xsx",
    name: "Xbox Series X — The Big Rig",
    shortName: "Series X",
    platform: "xbox",
    brand: "fanatec",
    components: [
      { id: "fanatec-dd", role: "wheel-base", name: "ClubSport DD", summary: "Direct drive, 12Nm base (15Nm firmware), FullForce, QR2" },
      { id: "csp-v3", role: "pedals", name: "ClubSport Pedals V3", summary: "90kg load cell brake, vibration motors, Hall-effect" },
      { id: "fanatec-shifter", role: "shifter", name: "ClubSport Shifter SQ V1.5", summary: "H-pattern + sequential, adjustable resistance" },
      { id: "fanatec-handbrake", role: "handbrake", name: "ClubSport Handbrake V1.5", summary: "Analog, horizontal/vertical mount" },
    ],
    // Verified against Fanatec's tuning-menu FAQ + ClubSport quick guides (2026-07-11).
    tuningMenuAccess:
      "Press the Tuning Menu button on the rim — the menu shows on the wheel's display. FunkySwitch: left/right moves between settings, rotate changes the value, up/down switches setup slot (S_1–S_5). With the menu open, hold the Tuning Menu button ~3s to toggle Standard ↔ Advanced.",
  },
  {
    id: "xss",
    name: "Xbox Series S",
    shortName: "Series S",
    platform: "xbox",
    brand: "fanatec",
    components: [
      { id: "fanatec-v25", role: "wheel-base", name: "ClubSport Wheel Base V2.5", summary: "Belt-driven, ~8Nm peak" },
      { id: "csl-elite-pedals-v2", role: "pedals", name: "CSL Elite Pedals V2", summary: "90kg load cell brake, Hall-effect throttle/clutch" },
    ],
    tuningMenuAccess:
      "Press the Tuning Menu button on the rim — the menu shows on the rim display (OLED on the GT3 rim). FunkySwitch: left/right moves between settings, rotate changes the value, up/down switches setup slot (S_1–S_5).",
  },
  {
    id: "pc",
    name: "PC",
    shortName: "PC",
    platform: "pc",
    brand: "logitech",
    components: [
      { id: "logitech-g920", role: "wheel-pedals", name: "Logitech G920 Driving Force", summary: "Gear-driven 2.3Nm, 900°, 3 pedals" },
    ],
    tuningMenuAccess:
      "No on-wheel tuning menu — all tuning happens in each game's settings. On PC, G HUB handles operating range and centering spring (keep Centering Spring OFF).",
  },
]

export const defaultSetupId = "xsx"

export function setupById(id: string): Setup {
  return setups.find((s) => s.id === id) ?? setups[0]
}
