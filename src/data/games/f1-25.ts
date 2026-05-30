import type { Setting } from "../../types"

// ── SEED DATASET — F1 25 in-game Vibration & Force Feedback settings ──
// DRAFT values authored by Kai based on F1 2x series conventions.
// Nathan to verify every setting name, slider range, on/off toggle behaviour,
// and menu path against the actual in-game menus before treating this as truth.
// All settings flagged `unverified: true`.
// F1 25 is single-seater circuit racing; typical rotation ~360–400°.

export const f125Settings: Setting[] = [
  {
    id: "f125-ffb-master",
    name: "Vibration & Force Feedback",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Vibration & Force Feedback",
    },
    description:
      "Master toggle and strength control for all force feedback output. In the F1 series this typically appears as an on/off toggle at the top level, with a strength value beneath it. Disabling it silences all wheel forces; strength scales every FFB effect proportionally.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Stronger forces from all effects — more physical load through the wheel on kerbs, braking, and cornering.",
    decreaseEffect:
      "Lighter, weaker wheel forces — easier on the arms for long stints but less physical information.",
    sweetSpot:
      "Fanatec DD: 40–55 to avoid clipping; Fanatec V2.5: 55–70; G920: 70–85. Single-seaters generate high downforce loads — dial back if the wheel feels harsh under braking.",
    warnings: [
      "Clipping at very high values flattens the detail out of every effect — the wheel feels uniformly stiff.",
      "Verify whether this is a combined toggle+strength or two separate controls in F1 25.",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects rides on top of this master strength — set master first." },
      { settingId: "f125-wheel-damper", relationship: "Wheel Damper is additive; high master + high damper can make the wheel feel heavy and unresponsive." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 50, notes: "Starting point on ClubSport DD — adjust after a few laps." },
      { game: "f1-25", setup: "xss", value: 65, notes: "Belt-driven V2.5 benefits from more headroom." },
      { game: "f1-25", setup: "pc", value: 75, notes: "G920's lower peak torque warrants a higher master value." },
    ],
    unverified: true,
  },
  {
    id: "f125-on-track-effects",
    name: "On Track Effects",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → On Track Effects",
    },
    description:
      "Controls the strength of general in-lap force feedback: steering weight, tyre load, suspension movement, and the push-pull of the car through corners. The primary 'road feel' slider in F1 25.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "Heavier wheel through corners — more tyre load and car balance communicated physically; harder to steer at the limit.",
    decreaseEffect:
      "Lighter wheel on track — easier to steer quickly, less tyre detail but less physical effort.",
    sweetSpot:
      "50–70 for most setups. In a single-seater with high downforce, forces can be significant — start conservative and build up.",
    warnings: [
      "Too high can cause oscillation under heavy braking or through slow chicanes.",
      "Verify slider name in-game — starting point only.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "Master strength scales this — set master first, then fine-tune On Track Effects." },
      { settingId: "f125-understeer-enhance", relationship: "Understeer Enhance modifies the feel at the tyre limit; On Track Effects is the baseline force." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 55, notes: "Responsive base — moderate starting point to feel the car without arm fatigue." },
      { game: "f1-25", setup: "xss", value: 65, notes: "Belt-driven base is less sensitive; higher value helps feel the tyre loads." },
      { game: "f1-25", setup: "pc", value: 70, notes: "G920 needs higher on-track effects to give meaningful corner feel." },
    ],
    unverified: true,
  },
  {
    id: "f125-rumble-strip-effects",
    name: "Rumble Strip Effects",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Rumble Strip Effects",
    },
    description:
      "Sets the intensity of force feedback generated when driving over kerbs and rumble strips. F1 25 circuits have aggressive kerbs — this setting controls how much of that vibration reaches the wheel.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More aggressive kerb feedback — strong vibration through the wheel when cutting or riding kerbs; helps identify how much kerb is safe.",
    decreaseEffect:
      "Softer kerb feel — kerbs and rumble strips produce less wheel vibration; cleaner feel but less warning of when you're exceeding limits.",
    sweetSpot:
      "50–70. F1 circuits have many aggressive kerbs; setting this well helps with consistent kerb-cutting decisions.",
    warnings: [
      "Very high values on aggressive kerbs (e.g. Monaco chicane, Monza first chicane) can feel violent and mask the actual car behaviour.",
    ],
    interactsWith: [
      { settingId: "f125-off-track-effects", relationship: "Rumble strips are on the circuit edge; off-track effects cover going beyond them — adjust together for a consistent experience at the limit." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 60, notes: "DD conveys kerb impacts well — this value gives clear feedback without being harsh." },
      { game: "f1-25", setup: "xss", value: 65, notes: "Slightly higher to feel kerb detail through the belt-driven base." },
      { game: "f1-25", setup: "pc", value: 70, notes: "G920 needs a higher value for kerb feedback to register clearly." },
    ],
    unverified: true,
  },
  {
    id: "f125-off-track-effects",
    name: "Off Track Effects",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Off Track Effects",
    },
    description:
      "Controls the strength of force feedback when the car leaves the circuit surface — grass, gravel, and run-off areas. Higher values give a pronounced physical warning when you go off.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More violent wheel reaction going off-track — strong vibration on grass or gravel serves as an immediate warning.",
    decreaseEffect:
      "Softer off-track feel — the transition from tarmac to grass is less physically obvious.",
    sweetSpot:
      "50–65. Enough to feel clearly different from on-track, but not so violent that a brief excursion off-line hurts your wrists.",
    warnings: [
      "Setting very high can cause unexpected jolts when crossing circuit edges, especially on bumpy run-off areas.",
    ],
    interactsWith: [
      { settingId: "f125-rumble-strip-effects", relationship: "The pair defines the on/off-track boundary feel — tune them together." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 55, notes: "Clear off-track signal without over-reacting to brief edge-cutting." },
      { game: "f1-25", setup: "pc", value: 65, notes: "Higher to make the off-track warning noticeable on the G920." },
    ],
    unverified: true,
  },
  {
    id: "f125-wheel-damper",
    name: "Wheel Damper",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Wheel Damper",
    },
    description:
      "Adds resistance to wheel movement, smoothing out oscillation and high-frequency noise. Similar in effect to the on-wheel NDP/NFR settings on Fanatec hardware — works at the software level.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect:
      "Heavier, more damped wheel — fewer oscillations on straights, more planted feel, but detail is filtered out.",
    decreaseEffect:
      "Freer, more reactive wheel — sharper transient forces but more prone to oscillation at high speed.",
    sweetSpot:
      "0–20 on Fanatec hardware (the on-wheel NDP/NFR already handle this). G920 users may need 10–30 to reduce gear-drive oscillation.",
    warnings: [
      "Stacking high Wheel Damper with high NDP/NFR on-wheel settings makes the wheel feel heavy and unresponsive.",
      "Keep low on direct-drive hardware to preserve FFB fidelity.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "High master + high damper compounds the heaviness — adjust together." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 5, notes: "DD has its own damping via NDP — keep in-game damper near zero." },
      { game: "f1-25", setup: "xss", value: 10, notes: "Small amount to smooth belt-drive oscillation without killing detail." },
      { game: "f1-25", setup: "pc", value: 20, notes: "G920 gear drive benefits from more damping to reduce chatter." },
    ],
    unverified: true,
  },
  {
    id: "f125-understeer-enhance",
    name: "Understeer Enhance",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Understeer Enhance",
    },
    description:
      "Amplifies the lightening of the wheel that occurs when the front tyres lose grip and the car understeers. Makes the 'wheel goes light' signal more pronounced as a tyre limit warning.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More pronounced wheel lightening on front tyre lock or understeer — the wheel noticeably unloads as a warning signal.",
    decreaseEffect:
      "Subtler or no wheel lightening during understeer — less obvious signal that the front is washing.",
    sweetSpot:
      "50–70. F1 single-seaters are heavily aero-dependent — the car's grip characteristics change significantly with speed; understeer feedback helps calibrate braking points.",
    warnings: [
      "Very high values make the wheel feel alarmingly dead at slow-speed hairpins where some understeer is normal.",
      "Verify this setting exists in F1 25 — it may be named differently or combined with another slider.",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects is the baseline force; Understeer Enhance modifies it specifically at the grip limit." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 60, notes: "Clear lightening on the responsive DD — useful for calibrating braking zones." },
      { game: "f1-25", setup: "xss", value: 65, notes: "Slightly higher to ensure the signal is felt through the belt-driven base." },
      { game: "f1-25", setup: "pc", value: 70, notes: "G920 drivers benefit from a stronger understeer signal." },
    ],
    unverified: true,
  },
  {
    id: "f125-max-wheel-rotation",
    name: "Maximum Wheel Rotation",
    category: "in-game",
    subcategory: "steering",
    hardware: ["fanatec-dd", "fanatec-v25", "logitech-g920"],
    games: ["f1-25"],
    platform: ["all"],
    location: {
      access: "in-game",
      path: "Settings → Vibration & Force Feedback → Maximum Wheel Rotation",
    },
    description:
      "Sets the total lock-to-lock steering rotation recognised by the game. F1 single-seaters use approximately 360–400° of rotation in real life. Setting this correctly ensures the in-game steering wheel matches your physical wheel turn-for-turn.",
    valueType: { kind: "numeric", min: 180, max: 900, default: 360, unit: "°" },
    increaseEffect:
      "More physical rotation needed for full lock — steering feels slower and more precise, better matched to road car SEN settings.",
    decreaseEffect:
      "Less physical rotation for full lock — steering is faster and more direct, appropriate for an F1 car's tight rack.",
    sweetSpot:
      "360° is a solid starting point for F1 cars. Some drivers prefer 320–380°. Must match or complement your wheel base SEN setting (leave base on AUTO and let this setting drive the rotation).",
    warnings: [
      "If your physical wheel base SEN is set manually rather than AUTO, ensure the two values agree — mismatches cause double-scaling where a small physical turn steers hard.",
      "G920 max hardware rotation is 900° — setting the game to 360° will software-limit it correctly, but feel may differ from a true short-rack base.",
      "Starting point — confirm the exact range and default for F1 25 in-game.",
    ],
    interactsWith: [
      { settingId: "fanatec-dd-sen", relationship: "Leave base SEN on AUTO and control rotation here; setting both manually can double-scale the steering." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 360, notes: "Match the F1 car's ~360° real-world rack — leave base SEN on AUTO." },
      { game: "f1-25", setup: "xss", value: 360, notes: "Same — 360° matches the car; base SEN on AUTO." },
      { game: "f1-25", setup: "pc", value: 360, notes: "G920 is software-limited to 360° by the game setting — feels more direct than default 900°." },
    ],
    unverified: true,
  },
]
