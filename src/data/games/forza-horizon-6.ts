import type { Setting } from "../../types"

// ── SEED DATASET — Forza Horizon 6 in-game FFB & controls settings ────
// DRAFT values authored by Kai based on FH5/FH6 series conventions.
// Nathan to verify every setting name, slider range, and path against
// the actual in-game menus before treating this as truth.
// All settings flagged `unverified: true`.

export const forzaHorizon6Settings: Setting[] = [
  {
    id: "fh6-ffb-scale",
    name: "Force Feedback Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Force Feedback Scale",
    },
    description:
      "Master volume for all force feedback output sent to the wheel. Scales every FFB force up or down proportionally. This is the primary dial to prevent clipping on a strong direct-drive base or to boost feel on a lighter gear-driven wheel.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Stronger forces across the board — more physical feedback from road texture, kerbs, and chassis load.",
    decreaseEffect:
      "Weaker, lighter forces — easier on the arms for long sessions but less information from the road.",
    sweetSpot:
      "Fanatec DD: start around 40–55 to avoid clipping; Fanatec V2.5: 55–70; G920: 70–85. Confirm in-game — starting point only.",
    warnings: [
      "Setting too high clips the strongest forces, making everything feel the same at the limit.",
      "Starting point — verify the correct slider name and range in-game.",
    ],
    interactsWith: [
      { settingId: "fh6-vibration-scale", relationship: "Both scale together; adjust FFB Scale first, then trim Vibration Scale separately." },
      { settingId: "fh6-ffb-minimum-force", relationship: "Raising Minimum Force effectively raises the floor; FFB Scale sets the ceiling." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 50, surface: "tarmac", notes: "Starting point on the ClubSport DD — dial down if wheel feels stiff or oscillates." },
      { game: "fh6", setup: "xsx", value: 45, surface: "dirt", notes: "Slightly lower on dirt; surface noise can feel chaotic at higher values." },
      { game: "fh6", setup: "xss", value: 65, surface: "tarmac", notes: "Belt-driven V2.5 benefits from higher scale to feel load transfer clearly." },
      { game: "fh6", setup: "pc", value: 75, surface: "tarmac", notes: "G920 is a lower-torque wheel — push FFB Scale higher to feel road detail." },
    ],
    unverified: true,
  },
  {
    id: "fh6-vibration-scale",
    name: "Vibration Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Vibration Scale",
    },
    description:
      "Controls the intensity of high-frequency rumble effects — road texture, surface buzz, engine vibration, and wheel spin. Separate from the main steering forces.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More buzz and texture through the wheel — road surface changes feel more distinct, rumble strips bite harder.",
    decreaseEffect:
      "Smoother, quieter wheel — less texture noise, which some drivers prefer for cleaner force feedback.",
    sweetSpot:
      "40–60 on most setups. Very high values can make the wheel feel artificially rough on smooth tarmac.",
    warnings: [
      "On CSP V3 pedals with vibration motors, this setting may also influence pedal rumble — confirm in-game.",
      "Starting point — verify slider name in-game.",
    ],
    interactsWith: [
      { settingId: "fh6-ffb-scale", relationship: "FFB Scale is the master; Vibration Scale is a sub-level for texture/rumble specifically." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 50, surface: "tarmac", notes: "Balanced starting point on DD." },
      { game: "fh6", setup: "xsx", value: 60, surface: "dirt", notes: "Higher on dirt — surface texture is a key cue for grip on loose surfaces." },
      { game: "fh6", setup: "xsx", value: 55, surface: "snow", notes: "Moderate — snow is inherently slippery; vibration helps feel the loose surface." },
      { game: "fh6", setup: "pc", value: 65, surface: "tarmac", notes: "G920 benefits from higher vibration scale to compensate for lower peak torque." },
    ],
    unverified: true,
  },
  {
    id: "fh6-steering-sensitivity",
    name: "Steering Sensitivity",
    category: "in-game",
    subcategory: "steering",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Steering Sensitivity",
    },
    description:
      "Adjusts how much virtual steering angle is applied relative to physical wheel input — a sensitivity curve modifier. Does not change total lock-to-lock rotation but affects how quickly the car responds near centre.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More responsive steering near centre — the car reacts faster per degree of input, which can feel twitchy.",
    decreaseEffect:
      "Calmer, more progressive steering — requires more physical rotation for the same virtual angle, more forgiving for beginners.",
    sweetSpot:
      "50 is a reasonable neutral starting point. Direct-drive users often prefer 40–50; lower-end wheels may want 50–60 to feel more connected.",
    warnings: [
      "Not the same as steering deadzone — this is a curve shaper, not a dead-band.",
      "Starting point — verify slider name and behaviour in-game.",
    ],
    interactsWith: [
      { settingId: "fh6-steering-linearity", relationship: "Works in tandem — Sensitivity affects near-centre response, Linearity shapes the full arc." },
      { settingId: "fh6-centre-steering-deadzone", relationship: "Set deadzone first to eliminate hardware slop, then tune Sensitivity for feel." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 45, surface: "tarmac", notes: "Slightly below mid on the responsive DD base." },
      { game: "fh6", setup: "xss", value: 50, surface: "tarmac", notes: "Neutral starting point for belt-driven base." },
      { game: "fh6", setup: "pc", value: 55, surface: "tarmac", notes: "Marginally above mid to compensate for G920's lower fidelity near centre." },
    ],
    unverified: true,
  },
  {
    id: "fh6-centre-steering-deadzone",
    name: "Center Steering Deadzone",
    category: "in-game",
    subcategory: "steering",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Center Steering Deadzone",
    },
    description:
      "Creates a dead zone around the wheel's centre point where no steering input is registered. Eliminates drift caused by hardware imprecision or centering spring slop.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect:
      "Wider dead band at centre — car stays straight more easily but the wheel feels numb around straight-ahead.",
    decreaseEffect:
      "Tighter, more immediate response — any tiny movement registers as steering input.",
    sweetSpot:
      "0–5 on a quality direct-drive or belt-drive base. Only raise if the car visibly wanders on a straight road with hands off the wheel.",
    warnings: [
      "Too high makes straight-line driving feel detached and masks subtle understeer feedback.",
      "Verify the exact slider name in-game — some Forza titles call this 'Deadzone Inside'.",
    ],
    unverified: true,
  },
  {
    id: "fh6-steering-linearity",
    name: "Steering Linearity",
    category: "in-game",
    subcategory: "steering",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Steering Linearity",
    },
    description:
      "Shapes the response curve across the full steering arc. At 50 the response is linear; higher values add an exponential feel (more rotation needed to reach full lock); lower values make the curve more aggressive.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More exponential curve — small inputs near centre feel more subtle, big inputs towards lock feel progressively stronger.",
    decreaseEffect:
      "More aggressive curve — every degree of rotation has significant effect, making the car feel darty.",
    sweetSpot:
      "50 is the neutral/linear point. Wheel users typically don't need to move far from 50; small adjustments (±5–10) if the car feels over/under-responsive at the limit.",
    warnings: [
      "This setting is more impactful for controller users; wheel users at 900° SEN often need minimal adjustment.",
      "Confirm slider name and direction in-game — starting point only.",
    ],
    interactsWith: [
      { settingId: "fh6-steering-sensitivity", relationship: "Sensitivity shapes near-centre feel; Linearity shapes the full arc." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 50, surface: "tarmac", notes: "Leave at neutral — the DD's full rotation already provides natural linearity." },
      { game: "fh6", setup: "pc", value: 50, surface: "tarmac", notes: "Neutral starting point; G920 at 900° provides natural linearity through rotation." },
    ],
    unverified: true,
  },
  {
    id: "fh6-ffb-understeer",
    name: "Force Feedback Understeer",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Force Feedback Understeer",
    },
    description:
      "Controls whether the wheel lightens off (goes light) to communicate front-axle understeer. When the front tyres lose grip and wash wide, some drivers want the wheel to go noticeably light as a warning signal.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More pronounced wheel lightening during understeer — the car's push feels clearly communicated through reduced resistance.",
    decreaseEffect:
      "Less wheel lightening — understeer is less obvious through the wheel; other cues (visuals, sound) become more important.",
    sweetSpot:
      "50–70 for most drivers — enough to feel the front washing without the wheel going completely dead.",
    warnings: [
      "This setting may not be present in all Forza Horizon titles or may appear under a different label. Verify in-game.",
      "Very high values can make the wheel feel alarmingly dead at the limit.",
    ],
    interactsWith: [
      { settingId: "fh6-ffb-minimum-force", relationship: "Minimum Force sets a floor — understeer lightening may not be fully felt if Minimum Force is too high." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 60, surface: "tarmac", notes: "On the responsive DD, this is a clear and useful feedback cue." },
      { game: "fh6", setup: "xsx", value: 50, surface: "dirt", notes: "Moderate — on dirt, understeer is frequent and expected; too much lightening becomes constant." },
      { game: "fh6", setup: "pc", value: 65, surface: "tarmac", notes: "Slightly higher on the G920 to ensure the lightening is noticeable through the lower-torque base." },
    ],
    unverified: true,
  },
  {
    id: "fh6-ffb-minimum-force",
    name: "Force Feedback Minimum Force",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["fh6"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Controls → Advanced Controls → Force Feedback Minimum Force",
    },
    description:
      "Sets a floor on force feedback output. Prevents the wheel from going completely dead at low speed or during understeer by ensuring a minimum level of resistance is always present.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect:
      "Higher constant baseline resistance — wheel never goes truly light, which can improve feel on slower corners or in low-grip conditions.",
    decreaseEffect:
      "Wheel can go very light or dead — more dynamic range of feedback from heavy load to near-zero.",
    sweetSpot:
      "5–15 for most setups. Fanatec DD users often run 0–10; G920 users may benefit from 10–20 to reduce motor deadband feel.",
    warnings: [
      "Setting too high masks useful feedback — you lose the lightening feel that signals understeer.",
      "Verify slider exists and confirm name in-game — may not be present in all Forza Horizon builds.",
    ],
    interactsWith: [
      { settingId: "fh6-ffb-scale", relationship: "FFB Scale is the ceiling; Minimum Force is the floor — together they define the feedback dynamic range." },
      { settingId: "fh6-ffb-understeer", relationship: "High Minimum Force can suppress the understeer lightening effect." },
    ],
    recommendations: [
      { game: "fh6", setup: "xsx", value: 5, surface: "tarmac", notes: "Small floor to keep some feel at low speed without masking load transfer." },
      { game: "fh6", setup: "xss", value: 10, surface: "tarmac", notes: "Slightly higher on the belt-driven base to overcome any motor deadband." },
      { game: "fh6", setup: "pc", value: 15, surface: "tarmac", notes: "G920 benefits from a higher floor to ensure consistent FFB feel." },
    ],
    unverified: true,
  },
]
