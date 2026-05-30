import type { Setting } from "../../types"

// ── SEED DATASET — ClubSport Handbrake V1.5 ───────────────────────────
// DRAFT values authored by Kai. Nathan to verify against the physical unit.
// Every setting is flagged `unverified: true` until confirmed.
//
// The Handbrake V1.5 connects via USB or Fanatec hub. Mount orientation is
// a physical choice; analog vs digital behaviour and axis sensitivity are
// configured in-game (no dedicated software tuning panel on Xbox).

export const fanatecHandbrakeSettings: Setting[] = [
  {
    id: "fanatec-handbrake-mount",
    name: "Mount Orientation",
    category: "handbrake",
    hardware: ["fanatec-handbrake"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "Physical mounting decision when installing the handbrake (no software menu)",
    },
    description:
      "The Handbrake V1.5 can be mounted horizontally (traditional rally handbrake pull — back toward you) or vertically (upright, pull up like a car park handbrake). This is a physical hardware choice made at install time. Horizontal suits rally and drift driving; vertical suits circuit/road feel.",
    valueType: {
      kind: "enum",
      options: ["Horizontal", "Vertical"],
      default: "Horizontal",
    },
    increaseEffect:
      "Vertical mount: upright pull — more intuitive for users coming from real cars.",
    decreaseEffect:
      "Horizontal mount: pull-back action — traditional rally/drift orientation, feels natural alongside a racing seat.",
    sweetSpot: "Horizontal is standard for rally/drift rigs; vertical if you want a road-car feel.",
    unverified: true,
  },
  {
    id: "fanatec-handbrake-mode",
    name: "Analog vs Button / Digital Mode",
    category: "handbrake",
    hardware: ["fanatec-handbrake"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "In-game axis / button binding screen — assign the handbrake axis or button action",
    },
    description:
      "The Handbrake V1.5 outputs an analog axis (variable 0–100% pull) AND can be configured as a digital button in-game. For rally/drift in Forza Horizon, binding it as an analog axis allows progressive rear-wheel lock; binding as a button gives instant on/off. Most titles support both — choose in the game's controller binding screen.",
    valueType: {
      kind: "enum",
      options: ["Analog axis", "Digital button"],
      default: "Analog axis",
    },
    increaseEffect:
      "Digital button: instant full-lock on any input — simpler, more consistent for tight hairpins.",
    decreaseEffect:
      "Analog axis: progressive braking from 0–100% pull — more control for drift entry and rally.",
    sweetSpot: "Analog axis for drift/rally. Digital button for games that don't support analog handbrake properly.",
    warnings: [
      "Some Xbox titles only recognise the handbrake as a button and ignore the analog axis — check the game's binding screen.",
    ],
    unverified: true,
  },
  {
    id: "fanatec-handbrake-sensitivity",
    name: "In-Game Handbrake Sensitivity / Deadzone",
    category: "handbrake",
    hardware: ["fanatec-handbrake"],
    platform: ["xbox"],
    location: {
      access: "in-game",
      path: "In-game advanced controls → handbrake axis sensitivity or deadzone (game-dependent)",
    },
    description:
      "Adjusts how responsive the handbrake axis feels in-game — most titles expose a sensitivity or deadzone slider for the handbrake axis. A low deadzone means even a light pull starts braking; a high deadzone requires a firm pull before the game responds. Sensitivity scales how quickly the axis reaches full lock.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 10, unit: "%" },
    increaseEffect:
      "Higher sensitivity / lower deadzone: handbrake responds with less pull — very reactive, easy to over-rotate.",
    decreaseEffect:
      "Lower sensitivity / higher deadzone: requires a more deliberate pull before activating — reduces accidental braking.",
    sweetSpot: "Start with deadzone around 5–15% to eliminate any resting drift in the axis. Sensitivity to taste.",
    unverified: true,
  },
]
