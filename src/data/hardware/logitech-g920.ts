import type { Setting } from "../../types"

// ── SEED DATASET — Logitech G920 Driving Force ────────────────────────
// DRAFT values authored by Kai. Nathan to verify against the physical unit.
// Every setting is flagged `unverified: true` until confirmed.
//
// The G920 has NO on-wheel tuning menu. G HUB software is out of scope.
// All meaningful tuning happens in-game. The wheel is gear-driven (2.3Nm peak),
// which produces a notchier, less refined feel than belt or direct-drive bases —
// this is described honestly below, not papered over.

export const logitechG920Settings: Setting[] = [
  {
    id: "logitech-g920-rotation",
    name: "Steering Rotation / Operating Range",
    abbreviation: "Rotation",
    category: "wheel-base",
    subcategory: "rotation",
    hardware: ["logitech-g920"],
    platform: ["pc"],
    location: {
      access: "in-game",
      path: "In-game force feedback / steering settings → steering rotation or lock-to-lock range",
    },
    description:
      "The G920 supports up to 900° of lock-to-lock rotation. Most games automatically set the correct rotation per car (AUTO behaviour) via Logitech's SDK integration. When a game exposes a manual rotation slider, set it to match the car's real-world steering lock — typically 540° for a road car, 360° for a formula car. Do not set above the car's real lock or steering will feel sluggish.",
    valueType: { kind: "auto-or-numeric", min: 270, max: 900, default: "AUTO", unit: "°" },
    increaseEffect:
      "More degrees of rotation — more realistic steering for cars with high lock; slower, less twitchy response.",
    decreaseEffect:
      "Fewer degrees — quicker steering response; can feel oversensitive and nervous if set too low.",
    sweetSpot: "Leave on AUTO where possible. Manual: 540° for road cars, 360° for open-wheel.",
    warnings: [
      "If the game and the wheel both try to set rotation simultaneously you can end up with double-scaled steering — check the game's documentation.",
    ],
    unverified: true,
  },
  {
    id: "logitech-g920-ffb-strength",
    name: "Force Feedback Strength",
    abbreviation: "FFB",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["logitech-g920"],
    platform: ["pc"],
    location: {
      access: "in-game",
      path: "In-game force feedback / steering settings → force feedback strength or intensity",
    },
    description:
      "Controls the overall FFB output sent to the G920. The G920 peaks at ~2.3Nm — substantially lower than a belt or direct-drive base — so forces already feel lighter than a Fanatec unit. Running FFB too high on the G920 causes the gear mechanism to clip and produce a harsh, buzzy feeling rather than meaningful road texture. The gear-driven motor also introduces a slight mechanical notchiness at any strength — this is normal for the hardware, not a fault.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 60, unit: "%" },
    increaseEffect:
      "Stronger forces — more physical feedback from the road, kerbs, and car loads, up to the 2.3Nm ceiling.",
    decreaseEffect:
      "Lighter forces — easier to drive for longer stints; fine detail can disappear below ~30%.",
    sweetSpot:
      "50–70% is a typical starting point. Gear-driven notchiness becomes more pronounced above 80%; back off if the wheel feels buzzy rather than communicative.",
    warnings: [
      "The G920 has a 2.3Nm torque ceiling — forces will hard-clip before reaching the strength of a direct-drive base. Pushing FFB to 100% mostly increases gear noise, not road feel.",
      "Mechanical notchiness from the gear mechanism is inherent to this wheel — it does not indicate a fault.",
    ],
    unverified: true,
  },
  {
    id: "logitech-g920-brake-linearity",
    name: "Brake Pedal Behaviour (Non-Linear by Design)",
    category: "pedals",
    subcategory: "brake",
    hardware: ["logitech-g920"],
    platform: ["pc"],
    location: {
      access: "in-game",
      path: "In-game advanced controls → brake sensitivity, linearity, or deadzone (game-dependent)",
    },
    description:
      "The G920 brake pedal uses a progressive rubber buffer rather than a load cell — it is intentionally non-linear, becoming harder to press near full travel. This mimics a real brake pedal under servo/ABS pressure. The practical effect: the first half of pedal travel applies relatively little brake force, the second half ramps steeply. If trail-braking feels imprecise, reduce in-game brake sensitivity/linearity to flatten the curve, or increase it to shift the ramp point earlier. There is no hardware adjustment — all tuning is done in-game.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Higher sensitivity: brake force builds earlier in pedal travel — threshold braking is easier but light braking becomes harder to modulate.",
    decreaseEffect:
      "Lower sensitivity: more pedal travel before significant braking — rewards progressive, deliberate input; harder to brake hard quickly.",
    sweetSpot:
      "Start at the game default. If you find yourself locking up unexpectedly under light pedal pressure, reduce sensitivity. If full stops require an uncomfortable amount of pedal travel, increase it.",
    warnings: [
      "The G920 brake is NOT a load cell — it measures travel, not force. Pressing harder without pressing further does not increase brake input.",
      "Upgrading to the Logitech brake pedal mod (rubber spacer) stiffens the feel significantly and is a popular, cheap improvement.",
    ],
    unverified: true,
  },
  {
    id: "logitech-g920-centering-spring",
    name: "Centering Spring / Return Strength",
    category: "wheel-base",
    subcategory: "force-feedback",
    hardware: ["logitech-g920"],
    platform: ["pc"],
    location: {
      access: "in-game",
      path: "In-game force feedback settings → centering spring, self-aligning torque, or steering return strength",
    },
    description:
      "Some games expose a separate centering spring or return-to-centre strength slider independent of overall FFB. On the G920 this is worth adjusting because the gear motor can oscillate around centre at higher FFB levels — a light centering spring helps dampen this. If the game bundles centering spring into the FFB master, this becomes the FFB strength setting instead. Setting this to zero is generally wrong — you lose the natural self-aligning torque feel.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 40, unit: "%" },
    increaseEffect:
      "Stronger return-to-centre: wheel snaps back faster from lock — can feel artificial and fight your inputs.",
    decreaseEffect:
      "Weaker return: wheel is lazier to re-centre — more natural on some cars but can contribute to oscillation.",
    sweetSpot: "30–50% starting point; reduce if the wheel hunts around centre on straights.",
    unverified: true,
  },
]
