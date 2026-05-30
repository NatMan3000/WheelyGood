import type { Setting } from "../../types"

// ── ClubSport Wheel Base V2.5 — on-wheel tuning menu ──────────────────
// Names/ranges/defaults VERIFIED against Fanatec's official "What can be set
// in the Wheel Tuning Menu?" FAQ, EXCEPT SHO and DRI which the FAQ doesn't
// list for this base — those stay `unverified` pending confirmation on the
// actual V2.5 menu. NDP/NFR/NIN/LIN are Direct-Drive only, so they are
// intentionally absent here. Belt-driven (~8Nm): run FF higher than a DD.
// Xbox only — no PC Control Panel on Xbox.

export const fanatecV25Settings: Setting[] = [
  {
    id: "fanatec-v25-sen",
    name: "Sensitivity",
    abbreviation: "SEN",
    category: "wheel-base",
    subcategory: "rotation",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → SEN" },
    description:
      "Total steering rotation (lock-to-lock). Set to AUTO so the game decides the correct rotation per car. On console titles like Forza and F1, AUTO is strongly recommended — these games send a rotation signal and the wheel obeys it.",
    valueType: { kind: "auto-or-numeric", min: 90, max: 900, default: "AUTO", unit: "°" },
    increaseEffect: "More degrees of rotation — slower, more realistic steering arc, less nervous on straights.",
    decreaseEffect: "Fewer degrees — faster steering input needed, can feel twitchy.",
    sweetSpot: "Leave on AUTO. Only override if the game ignores the rotation signal; then match the real car's lock-to-lock.",
    warnings: [
      "Setting SEN manually while the game also sets rotation can double-scale your steering, making it far too sensitive.",
    ],
  },
  {
    id: "fanatec-v25-ff",
    name: "Force Feedback",
    abbreviation: "FF",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → FF" },
    description:
      "Overall force feedback strength — the master volume for all wheel forces. Because the V2.5 is belt-driven (~8Nm) rather than direct-drive, you generally need to run this higher than a DD to achieve a satisfying wheel weight.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 100, unit: "%" },
    increaseEffect: "Heavier, stronger wheel forces — more physical feedback, but more forearm fatigue on long stints.",
    decreaseEffect: "Lighter wheel — easier to hold for extended play but forces lose their punch.",
    sweetSpot:
      "80–100 is a common starting range on the V2.5. Because the belt motor peaks lower than a DD, clipping is less aggressive — you can often run it higher without flattening detail.",
    warnings: [
      "Values above ~95 can still clip on the strongest forces (e.g., hitting a kerb hard), washing out fine texture.",
      "Pair with in-game FFB Scale to avoid double-boosting — one of the two should be the primary control.",
    ],
    interactsWith: [
      { settingId: "fanatec-v25-fei", relationship: "FF sets the volume; FEI sets the sharpness of what you hear at that volume." },
    ],
  },
  {
    id: "fanatec-v25-fei",
    name: "Force Effect Intensity",
    abbreviation: "FEI",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → FEI" },
    description:
      "Overall intensity/sharpness of FFB effects (bumps, kerbs, surface texture). Lower values smooth and round off the signal; higher values keep effects crisp and immediate.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 100, unit: "%" },
    increaseEffect: "Sharper, more defined effects — every kerb and surface change is crisp and distinct.",
    decreaseEffect: "Softer, smoother effects — gentler on the wrists and less harsh, but fine detail is blended away.",
    sweetSpot: "Default 100. On the belt base the signal is slightly softer than a DD, so keeping FEI high helps preserve crispness.",
  },
  {
    id: "fanatec-v25-sho",
    name: "Shock / Vibration Intensity",
    abbreviation: "SHO",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → SHO" },
    description:
      "Strength of the vibration motors in the steering wheel rim (only applies to rims that have rumble motors). Default 100.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 100, unit: "%" },
    increaseEffect: "Stronger rumble through the rim — more tactile feel for surface changes and impacts.",
    decreaseEffect: "Smoother, less buzzy rim — reduces vibration noise from road texture.",
    sweetSpot: "50–80 to taste. Has no effect on rims without vibration motors.",
    warnings: ["Only affects rims with built-in rumble motors — check whether your fitted rim has them."],
    unverified: true,
  },
  {
    id: "fanatec-v25-dri",
    name: "Drift Mode",
    abbreviation: "DRI",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → DRI" },
    description:
      "Adjusts self-centering to assist drift-style driving. OFF = normal. Higher values reduce the centering/return force so the wheel travels more freely during slides. (Not listed in the Fanatec tuning-menu FAQ for this base — confirm on the actual menu.)",
    valueType: { kind: "enum", options: ["OFF", "1", "2", "3", "4", "5"], default: "OFF" },
    increaseEffect: "Weaker centering/more free movement — wheel sits more neutrally during slides; suits drift/rally.",
    decreaseEffect: "Toward OFF — normal self-centering returns; suits grip/circuit driving.",
    sweetSpot: "OFF for most racing. Raise for dedicated drift/rally sessions.",
    unverified: true,
  },
  {
    id: "fanatec-v25-for",
    name: "Force",
    abbreviation: "FOR",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → FOR" },
    description:
      "Scales the directional force-feedback signal strength. Distinct from FF — FOR adjusts the force component specifically. Default 100; can be boosted up to 120.",
    valueType: { kind: "numeric", min: 0, max: 120, default: 100, unit: "%" },
    increaseEffect: "Stronger directional forces — wheel pulls harder under cornering load.",
    decreaseEffect: "Lighter directional forces — less arm effort, but a weaker sense of grip.",
    sweetSpot: "100 is the default; values above 100 boost force at the risk of clipping.",
  },
  {
    id: "fanatec-v25-spr",
    name: "Spring",
    abbreviation: "SPR",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → SPR" },
    description:
      "Spring (return-to-centre) effect strength. Mostly affects desktop mode and games using DirectInput spring effects rather than proper FFB telemetry — most modern titles override it. Default 100; up to 120.",
    valueType: { kind: "numeric", min: 0, max: 120, default: 100, unit: "%" },
    increaseEffect: "Stronger return-to-centre spring — can feel artificial in games that use it.",
    decreaseEffect: "Weaker spring — less artificial centering pull.",
    sweetSpot: "100 for compatibility; most modern racing titles send their own centering forces and ignore this.",
    warnings: ["Some older or arcade titles use DirectInput spring — if the wheel feels overly springy in a specific game, reduce SPR."],
  },
  {
    id: "fanatec-v25-dpr",
    name: "Damper",
    abbreviation: "DPR",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → DPR" },
    description:
      "Damper (friction/stiffness) effect strength. Like SPR, mostly used by desktop/legacy DirectInput mode; most modern sim titles override it with their own damper. Default 100; up to 120.",
    valueType: { kind: "numeric", min: 0, max: 120, default: 100, unit: "%" },
    increaseEffect: "Heavier, more resistant wheel movement — adds drag/stiffness.",
    decreaseEffect: "Freer wheel — less drag, more reactive.",
    sweetSpot: "100 for compatibility. If the wheel feels sluggish in a specific title, experiment with lower values.",
  },
  {
    id: "fanatec-v25-bli",
    name: "Brake Level Indicator",
    abbreviation: "BLI",
    category: "wheel-base",
    subcategory: "vibration",
    hardware: ["fanatec-v25"],
    platform: ["xbox"],
    location: { access: "on-wheel-tuning", path: "Tuning menu → BLI" },
    description:
      "Triggers a vibration once your brake input passes a set threshold — a haptic cue for consistent braking. Needs vibration-capable pedals to be felt; the CSL Elite Pedals V2 have no vibration motors, so on the Series S rig this does nothing. Default OFF.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect: "Vibration kicks in at a lower brake %, warning you earlier in the brake travel.",
    decreaseEffect: "Vibration kicks in later / off — fewer haptic cues while braking.",
    sweetSpot: "OFF for most. Only useful with vibration-capable pedals.",
    warnings: ["No effect with CSL Elite Pedals V2 (no vibration motors)."],
  },
]
