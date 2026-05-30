import type { Setting } from "../../types"

// ── F1 25 — in-game Vibration & Force Feedback settings ──────────────────────
// Setting names and menu paths verified against community guides (simracingsetup.com)
// and Fanatec's official F1 25 recommended settings page (fanatec.com).
// ClubSport DD (xsx) values are Fanatec-official; V2.5 (xss) and G920 (pc) values
// are estimates — Fanatec did not publish recommended settings for those bases.
// Slider ranges are approximate (community-sourced); defaults are community consensus.
// All settings flagged `unverified: true`.
// F1 25 is single-seater circuit racing; typical rotation ~360°.
//
// FFB mechanics grounded in research/f1-25-ffb-explained.md (Driver61, SimRacingSetup,
// Brian Koponen, RacingGames.gg, Thrustmaster technical docs, EA official sources).

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
      "Master gain for all force feedback output — including the core steering weight you feel loading up through a corner. Scales every FFB effect proportionally. Disabling the toggle silences all wheel forces entirely.",
    details:
      "This is the FFB volume knob for the entire signal chain. Critically, it controls the primary steering weight — the self-aligning torque (SAT) that builds as you turn into a corner and the front tyres load up. Codemasters explicitly added SAT to the overall FFB calculation in an F1 22 patch, and it has been part of the model ever since. Everything else — kerb strikes, surface texture — rides on top of this master signal.\n\nFanatec's official recommendation for the ClubSport DD is 100 in-game paired with on-wheel FF 75. The on-wheel FF controls the actual motor torque output; the in-game value shapes the signal before it gets there.\n\nThe risk at high values is clipping: when the strongest forces hit the hardware ceiling, the signal flatlines at its peak rather than continuing to build. What this means in practice is that the hardest corners — where the wheel should feel heaviest and most informative — go paradoxically numb and flat. If the wheel stops communicating a range of load through a fast sequence and instead feels uniformly dead at the apex, clipping is the cause. Back off the in-game value or the on-wheel FF until the graduation returns.",
    valueType: { kind: "numeric", min: 0, max: 150, default: 100, unit: "%" },
    increaseEffect:
      "Stronger forces across everything — heavier steering through corners, more physical kerb and surface feedback. Too high and clipping makes the heaviest corners go numb/flat.",
    decreaseEffect:
      "Lighter, weaker wheel forces — easier on the arms for long stints but less physical information, including less cornering weight.",
    sweetSpot:
      "Fanatec DD: 100 in-game + FF 75 on-wheel (Fanatec-official). Fanatec V2.5: ~115–125 to compensate for lower peak torque. G920: ~120–140.",
    warnings: [
      "Clipping at high values makes heavy corners feel numb/flat rather than graduated — the wheel stops building force and just sits at a ceiling.",
      "Verify whether this appears as a combined toggle+strength control or two separate controls in F1 25.",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects is a texture/vibration layer that adds on top of the steering signal this controls — set master first." },
      { settingId: "f125-wheel-damper", relationship: "Wheel Damper is additive artificial friction; high master + high damper compounds heaviness and masks the true FFB signal." },
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
      "Secondary road-surface texture and vibration layer — communicates bumps, track marbles, kerb-adjacent undulations, and general road imperfections through the wheel. This is NOT the source of cornering weight or steering load.",
    details:
      "A common misconception is that On Track Effects is the primary cornering force slider. It is not — the cornering weight you feel building through a turn (self-aligning torque) comes from the master Vibration & Force Feedback Strength setting. On Track Effects is a separate channel that overlays road-surface texture: bumps, marbles, undulations, and the micro-vibrations that occur as tyres approach saturation. Multiple independent sources confirm this — Driver61 (F1 2021) describes it explicitly as \"the FFB strength provided by bumps, undulations, and changes in road surface texture.\"\n\nSetting it to zero would not make the wheel feel weightless in corners — the steering load would remain. You'd just lose the surface buzz layered on top of it.\n\nAs a side effect, tyre saturation does produce micro-vibrations that can signal grip-limit chatter through this channel. But that's a vibration warning, not the load itself. Pro esports drivers often run this at zero — they prefer reading the car through the clean cornering force rather than through artificial texture overlay.\n\nTIP: On a direct-drive base, even 20 produces meaningful texture. Too high and the constant buzz drowns out the steering-load signal, making it harder to read the tyres rather than easier. Note that F1 25 also has separate Steering/Throttle/Brake Linearity, Deadzone, and Saturation calibration sliders under Settings → Controls → Calibration — those are input-mapping controls, not FFB.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 30, unit: "%" },
    increaseEffect:
      "More texture and vibration through the wheel over bumps, marbles, and rough surface sections. Does not increase cornering weight or steering load.",
    decreaseEffect:
      "Smoother, quieter wheel over surface imperfections. Cornering weight is unaffected — the wheel still loads up through corners, you just won't feel the surface overlay.",
    sweetSpot:
      "Fanatec DD: 20 (Fanatec-official). V2.5: 30–40. G920: 45–60. Start conservative — too high creates noise that masks the cornering signal.",
    warnings: [
      "Too high drowns out the base cornering signal with surface noise, making tyre state harder to read.",
      "Verify slider name in-game — community consensus only.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "Master Strength controls the cornering weight; On Track Effects is a texture layer that sits alongside it — not the primary force." },
      { settingId: "f125-understeer-enhance", relationship: "Understeer Enhance modifies the wheel-lightening signal at the grip limit; On Track Effects is a separate texture/vibration channel." },
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
      "Dedicated vibration channel for kerb and rumble-strip contact — separate from On Track Effects. When a tyre rides over a painted rumble strip or kerb, this channel fires a buzz or thump through the wheel. It is an artificial effect: in real F1, kerb vibrations are felt through the seat and chassis, not the steering column.",
    details:
      "F1 circuits are defined by their kerbs — from the flat sausage kerbs at Melbourne to the aggressive painted strips at Monaco and the Monza first chicane. This setting determines how violently each one registers in your hands. Because it is a separate channel from On Track Effects, you can dial kerb feedback independently from general road texture.\n\nOn a direct-drive wheel, even a low value produces a clear physical jolt over an F1 kerb; Fanatec's official recommendation of 10 for the ClubSport DD reflects that the hardware already amplifies the signal substantially.\n\nKeeping this modest also has a practical benefit: when you're trying to find the limit of how much kerb is safe to use, a graduated feel is more informative than a uniform violent jolt regardless of how far over the edge you are. Too high and every kerb feels the same — aggressive.",
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
      "Vibration and texture channel for when the car leaves the racing surface — grass, gravel, and run-off areas. Texture only: the car physics still apply regardless of this setting; it only changes what you feel in your hands.",
    details:
      "In F1 25, leaving the track surface tends to be brief and consequential — either a bold kerb cut, a lock-up that drops two wheels on the grass, or a full excursion into the gravel. This setting determines how much texture and vibration the wheel produces in those moments. It is not a force that resists your inputs — just environmental texture feedback. Fanatec's official recommendation for the ClubSport DD is 5, which is deliberately gentle — enough to register that you've left the circuit without causing a jarring jolt that could unsettle your hands on a straight-line recovery.\n\nA common mistake is setting this high for the dramatic effect. The problem is that when you genuinely lose the car and slide off on cold tyres in lap one, a violent off-track vibration at the moment you most need control makes recovery harder.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 20, unit: "%" },
    increaseEffect:
      "More vibration and texture when off-track — grass and gravel produce a stronger buzz through the wheel as a warning.",
    decreaseEffect:
      "Less off-track texture — the transition from tarmac to grass is less physically obvious, though car physics are unaffected.",
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
      "Velocity-dependent artificial friction — the faster the wheel is moving, the more it resists. Suppresses oscillation and makes the wheel feel heavier, but masks the true FFB signal rather than simulating tyre forces. Best kept very low on direct-drive wheels.",
    details:
      "Wheel Damper is not a tyre physics effect. It is a hardware-level damper effect (as described in Thrustmaster's technical documentation: \"controls how the wheel will react when it's moving — usually used as dynamic friction\") layered on top of — and potentially obscuring — the self-aligning torque signal that comes from the physics model. Every unit you add makes the wheel heavier and slower to move, which has nothing to do with what the tyres are doing.\n\nAt low values it can be useful: it prevents the wheel oscillating on straights and gives a sense of weight at slow speeds and when stopped. Fanatec's official recommendation of 2 for the ClubSport DD is almost imperceptible but just enough to settle the high-torque motor.\n\nOn a gear-driven wheel like the G920, more damper can calm the mechanical chatter inherent in the drive system — but you're trading FFB detail for smoothness. On a DD, that trade is almost never worth making. The important thing is not to stack this on top of a high NDP on the wheel base — the in-game damper and on-wheel NDP are doing the same job, and doubling up makes the wheel feel sluggish and unresponsive exactly when you need to catch oversteer fast.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0, unit: "%" },
    increaseEffect:
      "Heavier, slower wheel — oscillation on straights is suppressed, but the artificial friction masks the true tyre-derived FFB signal underneath.",
    decreaseEffect:
      "Freer, more reactive wheel — sharper transient forces and better fidelity to the actual physics signal, but more prone to oscillation at high speed.",
    sweetSpot:
      "Fanatec DD: 2 (Fanatec-official, with NDP 55 on-wheel). V2.5: 5–15. G920: 15–25 to reduce gear-drive oscillation.",
    warnings: [
      "This is artificial friction — it masks the tyre-derived FFB rather than simulating it. Keep as low as possible, especially on direct-drive hardware.",
      "Stacking high Wheel Damper with high NDP on-wheel settings makes the wheel heavy and unresponsive.",
    ],
    interactsWith: [
      { settingId: "f125-ffb-master", relationship: "High master + high damper compounds heaviness and degrades FFB fidelity — adjust together, keeping damper low." },
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
      "Exaggerates the wheel going dramatically lighter when the front tyres lose grip and the car understeers. An artificial amplification of the natural SAT drop at the grip limit — a deliberate warning signal rather than a simulation.",
    details:
      "When an F1 car understeers, the physics are real: self-aligning torque collapses as the front tyres exceed their peak slip angle, and the wheel naturally goes lighter. Understeer Enhance artificially exaggerates that lightening effect — when you push past front grip, the wheel doesn't just soften, it goes dramatically light, almost like power steering has suddenly engaged.\n\nThis setting was removed in F1 23 but reinstated by F1 25 (confirmed across multiple F1 25 guides including f125game.com, briankoponen.com, and simstaff.net). It is most useful for gear-driven wheels like the G920, which have lower torque resolution and may not communicate the natural SAT drop clearly enough to be readable. Direct-drive users on the ClubSport DD often leave it off entirely — the DD already conveys the natural grip-loss lightening with enough force that the artificial exaggeration adds more alarm than information.\n\nTIP: Very high values make the wheel feel alarmingly lifeless at slow-speed hairpins where a small amount of understeer is normal and expected — every tight corner exit feels like the front has washed. Keep it moderate and use it as a calibration aid rather than an alarm.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect:
      "More dramatic wheel lightening during understeer — the wheel goes noticeably, artificially light as a clear warning that the front is washing.",
    decreaseEffect:
      "Subtler or no exaggerated lightening — understeer still produces some wheel lightening from the physics model, but the artificial amplification is reduced or absent.",
    sweetSpot:
      "DD: 0–30 (DD already conveys natural SAT drop). V2.5: 30–45. G920: 40–60 (gear-driven wheels benefit more from the exaggerated signal).",
    warnings: [
      "Very high values make the wheel feel alarmingly dead at slow-speed hairpins where some understeer is normal — every tight exit becomes a false alarm.",
    ],
    interactsWith: [
      { settingId: "f125-on-track-effects", relationship: "On Track Effects is a texture/vibration layer; Understeer Enhance is a separate signal that modifies wheel loading at the grip limit." },
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
      "Input mapping only — sets the total lock-to-lock steering rotation the game recognises. Has no effect on force feedback signals whatsoever. Setting this correctly ensures the in-game steering wheel matches your physical wheel turn-for-turn.",
    details:
      "An F1 car's steering rack is extremely short — real cars use around 360° lock-to-lock, roughly a full turn each way. This setting tells the game how much of your wheel's physical rotation to map to that full lock range. It is purely an input-mapping control; it does not alter the FFB signal in any way. This is separate from the Calibration settings (under Settings → Controls → Calibration), which handle steering deadzone, linearity, and saturation — also input-mapping controls, not FFB.\n\nFanatec's recommended SEN for F1 25 on the ClubSport DD is 360, set on the wheel base itself via the on-wheel menu. Setting both this in-game value and the on-wheel SEN to 360 ensures 1:1 correspondence — the physical and virtual steering wheels move in perfect sync.\n\nIf your wheel base is set to AUTO SEN, the game's Maximum Wheel Rotation drives the physical lock-to-lock range automatically. Either approach works — just don't set a manual SEN on the base AND a different value here, as the two values multiply and full lock becomes unreachable (or a tiny flick reaches full lock instantly).",
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
