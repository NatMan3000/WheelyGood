import type { Setting } from "../../types"

// ── F1 25 — in-game Vibration & Force Feedback settings ──────────────────────
// Setting names and menu paths verified against community guides (simracingsetup.com)
// and Fanatec's official F1 25 recommended settings page (fanatec.com).
// ClubSport DD (xsx) values are Fanatec-official; V2.5 (xss) and G920 (pc) values
// are estimates — Fanatec did not publish recommended settings for those bases.
// Slider ranges are approximate (community-sourced); defaults are community consensus.
// All settings flagged `unverified: true`.
// F1 25 is single-seater circuit racing; typical rotation ~360°.

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
      "Master strength control for all force feedback output. Scales every FFB effect proportionally — set this first before adjusting the sub-effects. Disabling the toggle silences all wheel forces entirely.",
    details:
      "This is the FFB volume knob for the entire signal chain — cornering load, kerb strikes, and surface texture all ride on top of whatever strength this is set to. Fanatec's official recommendation for the ClubSport DD is 100, paired with an on-wheel FF value of 75 (set on the wheel base itself). The on-wheel FF controls the actual motor torque output; the in-game value shapes the signal before it gets there.\n\nThe risk at very high values is clipping: when the strongest forces (heavy braking into a slow corner, for example) hit the hardware ceiling, every effect in that moment gets crushed to the same flat peak. You lose the graduation that tells you how loaded the tyres actually are. If the wheel feels uniformly stiff rather than communicating a range of forces, clipping is the likely cause — back off the in-game value or the on-wheel FF.",
    valueType: { kind: "numeric", min: 0, max: 150, default: 100, unit: "%" },
    increaseEffect:
      "Stronger forces from all effects — more physical load through the wheel on kerbs, braking, and cornering.",
    decreaseEffect:
      "Lighter, weaker wheel forces — easier on the arms for long stints but less physical information.",
    sweetSpot:
      "Fanatec DD: 100 in-game + FF 75 on-wheel (Fanatec-official). Fanatec V2.5: ~115–125 to compensate for lower peak torque. G920: ~120–140.",
    warnings: [
      "Clipping at very high values flattens the detail out of every effect — the wheel feels uniformly stiff rather than graduated.",
      "Verify whether this appears as a combined toggle+strength control or two separate controls in F1 25.",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects rides on top of this master strength — set master first." },
      { settingId: "f125-wheel-damper", relationship: "Wheel Damper is additive; high master + high damper can make the wheel feel heavy and unresponsive." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 100, notes: "Fanatec-recommended for the ClubSport DD. Pair with on-wheel FF 75." },
      { game: "f1-25", setup: "xss", value: 120, notes: "Estimate — Fanatec didn't publish this base. Belt-driven V2.5 benefits from more headroom to feel similar load." },
      { game: "f1-25", setup: "pc", value: 130, notes: "Estimate — Fanatec didn't publish this base. G920's lower peak torque warrants a higher master value." },
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
    details:
      "This is the setting that makes the wheel communicate what the car is doing through a corner — the weight building as you turn in, the lightening as downforce loads up at speed, the subtle shift in feel as the rear starts to move. On a direct-drive wheel like the ClubSport DD, Fanatec recommends a conservative 20 in-game. That sounds low, but the DD's high torque output means even a modest in-game value translates to a meaningful physical force — and at 20 there's still plenty of dynamic range before the signal clips.\n\nIf the wheel feels lifeless at 20, small increments work better than large ones here. At 50+ on a direct-drive base, heavy braking zones and high-speed corners can become physically fatiguing over a race distance.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 30, unit: "%" },
    increaseEffect:
      "Heavier wheel through corners — more tyre load and car balance communicated physically; harder to steer at the limit.",
    decreaseEffect:
      "Lighter wheel on track — easier to steer quickly, less tyre detail but less physical effort.",
    sweetSpot:
      "Fanatec DD: 20 (Fanatec-official). V2.5: 30–40. G920: 45–60. Single-seaters generate high downforce loads — start conservative and build.",
    warnings: [
      "Too high can cause oscillation under heavy braking or through slow chicanes.",
      "Verify slider name in-game — community consensus only.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "Master strength scales this — set master first, then fine-tune On Track Effects." },
      { settingId: "f125-understeer-enhance", relationship: "Understeer Enhance modifies the feel at the tyre limit; On Track Effects is the baseline force." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 20, notes: "Fanatec-recommended for the ClubSport DD." },
      { game: "f1-25", setup: "xss", value: 35, notes: "Estimate — Fanatec didn't publish this base. Belt-driven base is less sensitive; slightly higher for tyre load feel." },
      { game: "f1-25", setup: "pc", value: 55, notes: "Estimate — Fanatec didn't publish this base. G920 needs higher on-track effects to give meaningful corner feel." },
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
      "Sets the intensity of force feedback generated when driving over kerbs and rumble strips. F1 25 circuits have aggressive kerbs — this controls how much of that vibration reaches the wheel.",
    details:
      "F1 circuits are defined by their kerbs — from the flat, smooth sausage kerbs at Melbourne to the aggressive painted strips at Monaco and the two-tyre chicane at Monza. This setting determines how violently each one registers in your hands. On a direct-drive wheel, even a low value produces a clear physical jolt over an F1 kerb; Fanatec's official recommendation of 10 for the ClubSport DD reflects that the hardware already amplifies the signal substantially.\n\nKeeping this low also has a practical benefit: when you're trying to find the limit of how much kerb is safe to use, a subtle difference in feel is more informative than a jolting vibration that's similar whether you've clipped the edge or gone three inches too far. Too high and every kerb feels the same — violent.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 20, unit: "%" },
    increaseEffect:
      "More aggressive kerb feedback — strong vibration through the wheel when cutting or riding kerbs; helps identify how much kerb is safe.",
    decreaseEffect:
      "Softer kerb feel — kerbs and rumble strips produce less wheel vibration; cleaner feel but less warning of when you're exceeding limits.",
    sweetSpot:
      "Fanatec DD: 10 (Fanatec-official). V2.5: 20–30. G920: 30–40. F1 kerbs are already aggressive — this value compounds quickly on a DD.",
    warnings: [
      "Very high values on aggressive kerbs (e.g. Monaco chicane, Monza first chicane) can feel violent and mask the actual car behaviour.",
    ],
    interactsWith: [
      { settingId: "f125-off-track-effects", relationship: "Rumble strips are on the circuit edge; off-track effects cover going beyond them — adjust together for a consistent experience at the limit." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 10, notes: "Fanatec-recommended for the ClubSport DD." },
      { game: "f1-25", setup: "xss", value: 25, notes: "Estimate — Fanatec didn't publish this base. Slightly higher to feel kerb detail through the belt-driven base." },
      { game: "f1-25", setup: "pc", value: 35, notes: "Estimate — Fanatec didn't publish this base. G920 needs a higher value for kerb feedback to register clearly." },
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
    details:
      "In F1 25, leaving the track surface tends to be brief and consequential — either a bold kerb cut, a lock-up that drops two wheels on the grass, or a full excursion into the gravel. This setting determines how severely the wheel reacts in those moments. Fanatec's official recommendation for the ClubSport DD is 5, which is deliberately gentle — enough to register that you've left the circuit without causing a jarring jolt that could unsettle your hands on a straight-line recovery.\n\nA common mistake is setting this high for the dramatic effect. The problem is that when you genuinely lose the car and slide off on cold tyres in lap one, a violent off-track signal at the moment you most need control makes recovery harder.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 20, unit: "%" },
    increaseEffect:
      "More violent wheel reaction going off-track — strong vibration on grass or gravel serves as an immediate warning.",
    decreaseEffect:
      "Softer off-track feel — the transition from tarmac to grass is less physically obvious.",
    sweetSpot:
      "Fanatec DD: 5 (Fanatec-official). V2.5: 10–20. G920: 20–30. Enough to register clearly without causing a distracting jolt.",
    warnings: [
      "Setting very high can cause unexpected jolts when crossing circuit edges, especially on bumpy run-off areas.",
    ],
    interactsWith: [
      { settingId: "f125-rumble-strip-effects", relationship: "The pair defines the on/off-track boundary feel — tune them together." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 5, notes: "Fanatec-recommended for the ClubSport DD." },
      { game: "f1-25", setup: "xss", value: 15, notes: "Estimate — Fanatec didn't publish this base. Modest off-track signal through the belt-driven base." },
      { game: "f1-25", setup: "pc", value: 25, notes: "Estimate — Fanatec didn't publish this base. Higher to make the off-track warning noticeable on the G920." },
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
      "Adds resistance to wheel movement, smoothing out oscillation and high-frequency noise. Works at the software level — similar in effect to the on-wheel NDP (Natural Damper) setting on Fanatec hardware.",
    details:
      "This setting adds a general heaviness to the wheel — not directional force, just resistance to movement. On a direct-drive base, a tiny amount can settle the motor at speed and prevent the wheel self-oscillating on long straights. Fanatec's official recommendation of 2 for the ClubSport DD is almost imperceptible but just enough to take the edge off any high-frequency motor noise.\n\nThe important thing is not to stack this on top of a high NDP value on the wheel base itself. The in-game damper and on-wheel NDP are doing the same job — doubling up makes the wheel feel slow and heavy, which directly hurts your ability to react to oversteer. Keep one or the other low; Fanatec recommends NDP 55 on the ClubSport DD for F1 25, so the in-game value is kept near zero.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect:
      "Heavier, more damped wheel — fewer oscillations on straights, more planted feel, but detail is filtered out.",
    decreaseEffect:
      "Freer, more reactive wheel — sharper transient forces but more prone to oscillation at high speed.",
    sweetSpot:
      "Fanatec DD: 2 (Fanatec-official, with NDP 55 on-wheel). V2.5: 5–15. G920: 15–25 to reduce gear-drive oscillation.",
    warnings: [
      "Stacking high Wheel Damper with high NDP on-wheel settings makes the wheel feel heavy and unresponsive.",
      "Keep very low on direct-drive hardware to preserve FFB fidelity.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "High master + high damper compounds the heaviness — adjust together." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 2, notes: "Fanatec-recommended for the ClubSport DD. Pair with on-wheel NDP 55." },
      { game: "f1-25", setup: "xss", value: 10, notes: "Estimate — Fanatec didn't publish this base. Small amount to smooth belt-drive oscillation without killing detail." },
      { game: "f1-25", setup: "pc", value: 20, notes: "Estimate — Fanatec didn't publish this base. G920 gear drive benefits from more damping to reduce chatter." },
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
    details:
      "When an F1 car understeers — the front tyres overwhelmed and the car pushing wide instead of turning — the self-aligning torque from the tyres collapses and the wheel naturally goes light. This setting amplifies that signal. On a high-downforce car at speed, the front end grip state changes quickly and the window between \"turning\" and \"pushing\" is narrow; an enhanced understeer signal can help you identify where your braking points are on different circuits.\n\nTIP: Very high values make the wheel feel alarmingly lifeless at slow-speed hairpins where a small amount of understeer is normal and expected — every tight corner exit suddenly feels like the front has washed. Keep it moderate and use it as a calibration aid rather than an alarm.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More pronounced wheel lightening on front tyre lock or understeer — the wheel noticeably unloads as a warning signal.",
    decreaseEffect:
      "Subtler or no wheel lightening during understeer — less obvious signal that the front is washing.",
    sweetSpot:
      "30–60. Enough to feel the front washing without the wheel going dead every time you tighten a hairpin exit.",
    warnings: [
      "Very high values make the wheel feel alarmingly dead at slow-speed hairpins where some understeer is normal.",
      "Not confirmed in the F1 25 references — verify it exists in-game (may be absent or renamed).",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects is the baseline force; Understeer Enhance modifies it specifically at the grip limit." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 30, notes: "Moderate signal on the responsive DD — useful for calibrating braking zones without false alarms in hairpins." },
      { game: "f1-25", setup: "xss", value: 40, notes: "Estimate. Slightly higher to ensure the signal is felt through the belt-driven base." },
      { game: "f1-25", setup: "pc", value: 50, notes: "Estimate. G920 drivers benefit from a stronger understeer signal given lower baseline torque." },
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
      "Sets the total lock-to-lock steering rotation recognised by the game. F1 single-seaters use approximately 360° of rotation in real life. Setting this correctly ensures the in-game steering wheel matches your physical wheel turn-for-turn.",
    details:
      "An F1 car's steering rack is extremely short — real cars use around 360° lock-to-lock, roughly a full turn each way. This setting tells the game how much of your wheel's physical rotation to map to that full lock range. Fanatec's recommended SEN for F1 25 on the ClubSport DD is 360, set on the wheel base itself via the on-wheel menu. Setting both this in-game value and the on-wheel SEN to 360 ensures 1:1 correspondence — the physical and virtual steering wheels move in perfect sync.\n\nIf your wheel base is set to AUTO SEN, the game's Maximum Wheel Rotation drives the physical lock-to-lock range automatically. Either approach works — just don't set a manual SEN on the base AND a different value here, as the two values multiply and full lock becomes unreachable (or a tiny flick reaches full lock instantly).",
    valueType: { kind: "numeric", min: 180, max: 900, default: 360, unit: "°" },
    increaseEffect:
      "More physical rotation needed for full lock — steering feels slower and more precise.",
    decreaseEffect:
      "Less physical rotation for full lock — steering is faster and more direct, appropriate for an F1 car's tight rack.",
    sweetSpot:
      "360° for F1 cars — matches real-world lock. Set on-wheel SEN to 360 (or AUTO) to match. Fanatec-official for ClubSport DD.",
    warnings: [
      "If your wheel base SEN is set manually rather than AUTO, ensure the two values agree — mismatches cause double-scaling where a small physical turn steers hard.",
      "G920 max hardware rotation is 900° — setting the game to 360° will software-limit it correctly, but feel may differ from a true short-rack base.",
    ],
    interactsWith: [
      { settingId: "fanatec-dd-sen", relationship: "Leave base SEN on AUTO and control rotation here, or set both to 360° — never set them to different values." },
    ],
    recommendations: [
      { game: "f1-25", setup: "xsx", value: 360, notes: "Fanatec-recommended for the ClubSport DD. Set on-wheel SEN to 360 to match." },
      { game: "f1-25", setup: "xss", value: 360, notes: "Same — 360° matches the F1 car; set base SEN on AUTO or 360." },
      { game: "f1-25", setup: "pc", value: 360, notes: "G920 is software-limited to 360° by the game setting — feels more direct than default 900°." },
    ],
    unverified: true,
  },
]
