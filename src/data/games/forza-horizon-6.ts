import type { Setting } from "../../types"

// ── Forza Horizon 6 — Advanced Wheel Settings (in-game) ───────────────
// Names + behaviours VERIFIED against the FULL official Forza Support
// article "Forza Horizon 6 on Wheel: Advanced Wheel Tuning". See
// research/fh6-wheel-settings.md.
// Values were left draft ONLY because Forza does not publish exact slider
// ranges/defaults — names, descriptions and tuning direction are official.
// (Draft flag cleared 2026-05-31, see docs/unverified-settings.md.)
// Menu: Settings → Advanced Controls (wheel must be connected).
//
// Per the official article, FH6 has NO in-game "Steering Rotation" slider
// (rotation is set by the wheel driver / on-wheel SEN) and NO "Off-Road Feel
// Scale" — both were removed after sourcing the article. Per-pedal axis
// deadzones (Acceleration/Deceleration/Clutch/Handbrake — Inside/Outside/
// Invert) also exist but are rarely adjusted, so they are not catalogued here.

const ALL_HW: Setting["hardware"] = ["fanatec-dd", "fanatec-v25", "logitech-g920"]
const ADVANCED = "Settings → Advanced Controls"

export const forzaHorizon6Settings: Setting[] = [
  {
    id: "fh6-ffb-scale",
    name: "Force Feedback Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Force Feedback Scale` },
    description:
      "Overall FFB strength — scales ALL forces sent to the wheel (including spring and damper). The default is a neutral value chosen to generally avoid clipping; it does NOT scale vibration.",
    details:
      "Think of this as the master volume for everything your wheel physically feels — cornering load, kerb strikes, and the weight of the car. The danger is clipping: if you push it too high, the strongest forces (hard cornering in a heavy GT car, for example) hit the hardware ceiling and every other force in that moment gets crushed to the same flat peak. You lose the detail that tells you how hard you're actually loading the tyre.\n\nTIP: Start at the default. If forces feel genuinely weak on your wheel, raise it in small steps and test with a high-downforce car at high speed — that's where clipping shows up first. Back off as soon as strong corners feel uniformly \"hard\" rather than graduated.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Stronger forces — more weight, but you risk saturating/clipping in high-torque situations and losing fidelity.",
    decreaseEffect: "Lighter forces — calmer wheel, less fatigue, less chance of clipping.",
    sweetSpot: "Start at the neutral default; raise carefully only if forces feel weak, and back off if strong corners clip.",
    warnings: ["Possible to saturate forces and clip the wheel — increase carefully. Does not scale vibration."],
    interactsWith: [
      { settingId: "fh6-ffb-load-sensitivity", relationship: "Lowering Load Sensitivity widens dynamic range when FFB Scale is pushed high." },
    ],
  },
  {
    id: "fh6-steering-assist",
    name: "Steering (Normal vs Simulation)",
    category: "in-game",
    subcategory: "steering",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: "Settings → Difficulty / Assists → Steering" },
    description:
      "Normal layers assists that alter inputs and vehicle dynamics; Simulation turns them off. On a wheel the INPUT layers are always off regardless — but Normal still influences the car's yaw inertia to stay stable, which can make FFB feel sharper and the car less agile but more planted.",
    details:
      "When you're on a wheel, Forza already strips the input-smoothing assists away — your hands are always talking directly to the car. What Normal still does is quietly manipulate the car's yaw momentum, making it resist spinning more than physics alone would. The side effect is that FFB can feel artificially crisp and \"snappy\" because the car's rotation is being subtly corrected underneath you.\n\nTIP: Switch to Simulation for the most honest driving experience. If the car feels nervous and unpredictable in Simulation — especially in loose conditions or at the entry to fast corners — Normal can act as a safety net without affecting how you steer.",
    valueType: { kind: "enum", options: ["Simulation", "Normal"], default: "Normal" },
    increaseEffect: "Normal — more stable, FFB can feel sharper; car is a touch less agile but easier to control.",
    decreaseEffect: "Simulation — assists off, the most direct/authentic behaviour; less stability net.",
    sweetSpot: "Try Simulation on a wheel for authenticity; Normal if the car feels nervous.",
  },
  {
    id: "fh6-center-spring-scale",
    name: "Center Spring Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Center Spring Scale` },
    description:
      "Dynamic self-centering force (caster, KPI, scrub radius). It ramps DOWN with speed, slip and cornering load so the tyres' own align torque takes over when you push. Forza explicitly recommends leaving it alone or turning it DOWN.",
    details:
      "This is the force that pulls the wheel back to straight when you're not pressing hard on the tyres. The critical thing to understand is that it backs off on purpose as you corner harder — by design, the tyres' own self-aligning torque is supposed to take over and tell you what they're doing. If you crank Center Spring too high, you overwhelm that tyre signal. The wheel just wants to go straight at all times, and you lose the ability to feel the front end loading up or washing out.\n\nTIP: Leave it at default or lower it. On the G920 especially, the lower output motor means center spring competes more aggressively with tyre feel — bring it down to around 20 and the wheel will communicate a lot more about what the front axle is actually doing.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Stronger centering — but too high effectively cancels dynamic FFB: you only feel the wheel self-centering, not the tyres.",
    decreaseEffect: "Lighter centering — more genuine tyre feel; too low can cause steering oscillation.",
    sweetSpot: "Leave at default or turn DOWN. On a G920/G29, turn it down to recover tyre feel.",
    warnings: ["Do not turn up significantly — it masks the dynamic align torque you want to feel."],
    recommendations: [
      { game: "fh6", setup: "pc", value: 20, notes: "G920: low center spring recovers tyre feel (per Forza's tip)." },
    ],
  },
  {
    id: "fh6-wheel-damper-scale",
    name: "Wheel Damper Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Wheel Damper Scale` },
    description:
      "Scales resistance to wheel movement (mechanical friction). Dynamic — reduces as the tyres slip to preserve detail. Direct-drive wheels benefit from some; low-torque wheels (G920/G29) want little to none.",
    details:
      "Every real car steering rack has some friction — this simulates that. The feel is a general resistance rather than a directional force: the wheel doesn't want to move quickly. At useful levels it helps settle a direct-drive wheel that might otherwise oscillate (the motor fighting itself), and gives a sense of mechanical weight. The problem with too much is that it slows your reaction speed and starts burying the more subtle signals — when the car begins to oversteer you need to catch it fast, and a heavy, sluggish wheel makes that harder.\n\nTIP: On a direct-drive base like the ClubSport DD, a modest amount tames the high-torque motor. On the G920, the belt-drive already adds its own friction — adding more on top smothers what little tyre detail the lower-powered motor can produce. Keep it near zero.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Heavier wheel — settles oscillation, but slows wheel velocity (hurts drift reaction) and too high overpowers under/oversteer feel.",
    decreaseEffect: "Lighter, faster wheel — quicker for drifting and more detail; too low may oscillate.",
    sweetSpot: "Some damper on a DD; little to none on the G920.",
    recommendations: [
      { game: "fh6", setup: "pc", value: 0, notes: "G920: little to no damper — Forza recommends turning it down for more tyre feel." },
      { game: "fh6", setup: "xsx", value: 30, notes: "DD benefits from a touch of damper to settle the strong motor." },
    ],
  },
  {
    id: "fh6-mechanical-trail-scale",
    name: "Mechanical Trail Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Mechanical Trail Scale` },
    description:
      "Scales mechanical trail ('caster feel') — a smooth, strong force that turns the wheels in the direction of travel. Excellent for drifters but tends to OVERPOWER lockup and understeer feel.",
    details:
      "Caster geometry makes the front wheels want to trail behind the steering axis — it's the same reason a shopping trolley wheel follows the direction of travel. In FFB terms, mechanical trail creates a smooth, assertive pull that keeps the wheel flowing in the direction the car is going. For drifting, that's gold: the wheel gives you strong, fluid feedback as the car swings and you can feel the angle change clearly.\n\nThe catch for grip driving is that this same force is always pulling the wheel toward \"straight ahead\" with some authority, which means when the front tyres actually wash out into understeer — or a wheel locks under braking — the mechanical trail force can mask what's happening. Lower it if you find understeer sneaks up on you without warning.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Smoother, faster following force with less fidelity — great for drifting, but masks understeer/lockup cues.",
    decreaseEffect: "Less follow force — understeer and lockup come through more clearly.",
    sweetSpot: "Lower it if you can't feel the front washing out; raise it for drift stability.",
  },
  {
    id: "fh6-ffb-minimum-force",
    name: "Force Feedback Minimum Force",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Force Feedback Minimum Force` },
    description:
      "Despite the name, this scales PNEUMATIC TRAIL — the dynamic lever-arm from tyre deformation. It drops as the tyre slips, which is how you feel the onset of understeer or brake lockup. Can be peaky right at the edge of traction.",
    details:
      "The name \"minimum force\" is genuinely misleading — this doesn't set a floor for FFB strength. What it actually controls is pneumatic trail: the distance between the tyre contact patch's geometric centre and the point where the resultant grip force actually acts. When the tyre is working well, that gap is meaningful and creates a strong self-aligning torque. As the tyre starts to slip and deform, the gap collapses — and your wheel goes light. That lightening IS the warning signal for understeer or a locking front wheel.\n\nTIP: This is one of the most information-dense settings in the menu. If you raise it too high, the transition to grip-loss feels sharp and abrupt — the wheel suddenly unloads like a switch. Lower it slightly for a smoother, more progressive warning that gives you time to react.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Stronger slip/limit cue — clearer feel for the traction edge, but a sharper, peakier sensation at the limit.",
    decreaseEffect: "Reduces tyre-deformation effects — smoother at the limit, but the onset-of-slip cue gets quieter.",
    sweetSpot: "Enough to feel the traction limit clearly without harsh peaks at the edge of grip.",
  },
  {
    id: "fh6-ffb-load-sensitivity",
    name: "Load Sensitivity",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Load Sensitivity` },
    description:
      "Scales the medium-frequency align-torque forces from road elevation, oscillations and bounces. Lowering it gives a smoother experience at the cost of fidelity (and adds headroom when FFB Scale is high).",
    details:
      "Where Road Feel Scale handles the high-frequency surface texture (the buzz and crunch), Load Sensitivity works at a slightly lower frequency — the forces generated as the car bounces over elevation changes, crests, compression zones, and mid-corner undulations. More of it means the wheel is constantly reacting to the road's shape as well as the tyres' grip state.\n\nTIP: This is the main tuning tool when the wheel feels \"busy\" or fatiguing over long runs. Lowering it smooths out the constant mid-corner movement without touching your cornering forces or kerb feel. It's also useful headroom management: if you've pushed FFB Scale up and are getting close to clipping, bringing Load Sensitivity down creates more room before the signal saturates.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "More mid-frequency movement — busier, more 'alive' wheel over undulating road.",
    decreaseEffect: "Smoother wheel — calmer over bumps, with headroom for a higher FFB Scale.",
    sweetSpot: "Lower it if the wheel feels noisy/busy or you're running a high FFB Scale.",
  },
  {
    id: "fh6-road-feel-scale",
    name: "Road Feel Scale",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Road Feel Scale` },
    description:
      "Scales the higher-frequency load inputs from road surface and bumps. Amplifies kerbs and rough surfaces WITHOUT affecting the low-frequency aligning torque (cornering feel).",
    details:
      "Road Feel Scale targets the sharp, fast forces that come from the tyre reacting to the actual road surface — kerb strikes, gravel patches, rough tarmac transitions, expansion joints. Crucially, it operates independently from the forces that tell you about cornering load and tyre grip. That means you can dial in as much or as little surface texture as you like without altering how the car communicates its handling state.\n\nTIP: If you're on a direct-drive wheel, road feel can be quite intense at default. It's a flavour setting — raise it if you want the wheel to feel alive and tactile over varied surfaces, lower it if the constant texture is distracting from the actual driving. On the G920, the lower torque means surface feel is naturally subdued and you may want to raise this to compensate.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "More kerb and surface texture through the wheel — cornering forces unchanged.",
    decreaseEffect: "Smoother, less buzzy wheel over rough surfaces — cornering forces unchanged.",
    sweetSpot: "To taste — raise for more texture, lower if it feels gritty/noisy.",
  },
  {
    id: "fh6-vibration-scale",
    name: "Vibration Scale",
    category: "in-game",
    subcategory: "vibration",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Vibration Scale` },
    description:
      "Intensity of tactile vibration signals — you feel it when overusing the tyres or in a collision. Distinct from Road Feel: turning Vibration down does NOT reduce the physical FFB road forces.",
    details:
      "Vibration Scale controls a separate layer of feedback that's more like a notification system than a physics signal. When you're pushing the tyres into heavy wheelspin, sustained understeer, or you tag a barrier, the wheel buzzes to reinforce that moment. It is entirely independent from the load-based forces that the rest of the FFB settings control.\n\nTIP: Some drivers love the tactile reinforcement — especially on a belt-drive wheel where load-based forces are less detailed. Others find it distracting or artificial once they're used to reading tyre state from the steering forces alone. Try turning it down to 20–30 first; if you stop noticing it's gone, you didn't need it.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50, unit: "%" },
    increaseEffect: "Stronger buzz signals for tyre overuse and collisions.",
    decreaseEffect: "Quieter tactile signals — physical FFB forces unaffected.",
    sweetSpot: "To taste; reduce if vibration feels gimmicky.",
  },
  {
    id: "fh6-steering-sensitivity",
    name: "Steering Sensitivity",
    category: "in-game",
    subcategory: "steering",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Steering Sensitivity` },
    description:
      "Adjusts the RATIO between your wheel's degree of rotation and the car's front-wheel steering (with a soft lock). Higher = more responsive (lower ratio); lower = less responsive (higher ratio). Forza's strong advice: set rotation on your WHEEL software/hardware and only touch this if your wheel can't set rotation — changing both at once causes erratic steering.",
    details:
      "If your wheel has 540° of physical rotation and you want the car to reach full lock somewhere in that range, this setting controls the ratio between your physical input and the car's actual steering angle. Raising it means less wheel travel to reach full lock — quicker, more reactive steering but harder to make precise small corrections. Lowering it gives you more wheel travel per degree of steering, which sounds like more control but can make the car feel lazily unresponsive, especially in chicanes.\n\nTIP: The correct workflow is to set your wheel's rotation angle in Fanatec Wheel Property Page or Logitech G HUB first, then only touch Steering Sensitivity in-game if necessary. If you adjust both simultaneously, the combined ratio becomes unpredictable and you can end up with a setup that feels fine straight-ahead but reaches full lock with a tiny flick, or requires full rotation for modest corners. Pick one control point.",
    valueType: { kind: "numeric", min: 0, max: 1, step: 0.05, default: 0.5 },
    increaseEffect: "More responsive — steering ratio decreases, less wheel movement to turn the car.",
    decreaseEffect: "Less responsive — steering ratio increases, more wheel movement for the same turn.",
    sweetSpot: "Leave neutral and set rotation on the wheel/driver; only adjust here if the wheel offers no rotation control.",
    warnings: ["Changing wheel rotation (software/hardware) AND this slider together can cause erratic steering — change one, not both."],
  },
  {
    id: "fh6-steering-linearity",
    name: "Steering Linearity",
    category: "in-game",
    subcategory: "steering",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Steering Linearity` },
    description:
      "Shapes the mapping curve between physical input and in-game steering. 50 = linear. Lower = more accuracy near centre (less near lock); higher = more accuracy near lock (less near centre). Full lock is always reached either way.",
    details:
      "At 50 (linear), each degree of wheel rotation produces the same degree of steering response across the full range. Below 50, the response curve is compressed near centre — small corrections around straight-ahead are more forgiving, but as you approach full lock, the remaining steering travel is squashed into a smaller physical movement. Above 50, the opposite: the centre is twitchy but you have a long, precise travel range near full lock, which can help with drifting and hairpins.\n\nTIP: Most wheel users should stay at 50. Non-linear curves were originally designed to compensate for gamepads and their small analog stick range. On a wheel you have 540° or more of travel — a linear response uses all of it well. If you find the centre feels nervous when holding a motorway straight, check deadzone settings before touching linearity.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 50 },
    increaseEffect: "Above 50 — more precision near full lock, twitchier near centre.",
    decreaseEffect: "Below 50 — more precision near centre, less near lock.",
    sweetSpot: "50 (linear) for a 1:1 feel; most wheel users leave it here.",
  },
  {
    id: "fh6-steering-deadzone-inside",
    name: "Steering Axis Deadzone Inside",
    category: "in-game",
    subcategory: "deadzone",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Steering Axis Deadzone Inside` },
    description:
      "Inner (centre) steering deadzone — how far the wheel moves before the car turns. Any value above zero creates a dead area at centre. Only raise it if you can't hold a straight line.",
    details:
      "The inner deadzone creates a window around the straight-ahead position where moving the wheel does nothing. It exists to compensate for potentiometer drift or axis noise — if your wheel has a subtle wander that causes the car to slowly drift on a straight when you're holding the wheel still, a small inner deadzone kills that noise.\n\nTIP: If your wheel is healthy, this should be 0. Any deadzone you add is a gap in your feedback loop — the car isn't responding while you're making corrections in that range, which is exactly where precise small adjustments matter most. Raise it only to cure a genuine self-steering fault, and use the minimum value that fixes the problem.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0 },
    increaseEffect: "More wheel movement needed before the car responds — kills a twitchy/self-steering centre.",
    decreaseEffect: "More immediate response off-centre.",
    sweetSpot: "0 for a healthy wheel; raise a few points only to cure centre wander.",
  },
  {
    id: "fh6-steering-deadzone-outside",
    name: "Steering Axis Deadzone Outside",
    category: "in-game",
    subcategory: "deadzone",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Steering Axis Deadzone Outside` },
    description:
      "Outer steering deadzone — the larger it is, the less of your outermost steering travel the game recognises (full lock reached before the wheel's physical limit).",
    details:
      "The outer deadzone clips the far end of your steering travel. At 0, the game maps your wheel's physical limit to full in-game lock. As you raise it, full lock is reached progressively earlier — meaning the last portion of your wheel's physical rotation doesn't do anything extra in-game.\n\nTIP: This is rarely useful and almost always left at 0. One scenario where it helps: if your wheel is set to a large rotation angle (e.g. 1080° for a truck) and the car reaches full lock well before the physical end of travel, the outer deadzone can tidy up that mismatch. On a correctly configured setup, leave it at 0.",
    valueType: { kind: "numeric", min: 0, max: 100, default: 0 },
    increaseEffect: "Reaches full in-game lock with less physical rotation at the extremes.",
    decreaseEffect: "Uses the full outer travel of the wheel for steering.",
    sweetSpot: "0 for most; raise only if full lock feels hard to reach.",
  },
  {
    id: "fh6-steering-axis-invert",
    name: "Steering Axis Invert",
    category: "in-game",
    subcategory: "steering",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Steering Axis Invert` },
    description: "Reverses the direction you turn the wheel to steer. Almost never needed on a normal wheel.",
    details:
      "This flips left and right steering entirely. The only practical use case is correcting a mis-wired or firmware-glitched wheel where turning right physically causes the car to go left. If that's not happening to you, this toggle does nothing useful and enabling it by accident would make the car completely undriveable.\n\nTIP: Leave this OFF. If you're troubleshooting a steering issue, check cable connections and wheel firmware before reaching for this setting.",
    valueType: { kind: "enum", options: ["OFF", "ON"], default: "OFF" },
    increaseEffect: "ON — steering direction reversed.",
    decreaseEffect: "OFF — normal steering direction.",
    sweetSpot: "OFF.",
  },
  {
    id: "fh6-invert-ffb",
    name: "Invert Force Feedback",
    category: "in-game",
    subcategory: "force-feedback",
    hardware: ALL_HW,
    games: ["fh6"],
    platform: ["all"],
    location: { access: "in-game", path: `${ADVANCED} → Invert Force Feedback` },
    description: "Reverses FFB direction (needed for some wheel makes). Toggle this if your wheel pulls INTO the turn instead of resisting it.",
    details:
      "In normal operation, the wheel resists your input as the car corners — it gets heavier as you turn in, replicating the tyre loading up. With the wrong FFB polarity, that force reverses: the wheel actively pulls itself further into the turn rather than pushing back. It feels bizarre immediately, like the wheel is fighting you toward the apex rather than making you work for it.\n\nTIP: Leave this OFF for Fanatec and Logitech hardware — both are wired correctly for Forza out of the box. If you're using a less common wheel and the FFB feels like it's helping rather than resisting your steering inputs, toggle this ON.",
    valueType: { kind: "enum", options: ["OFF", "ON"], default: "OFF" },
    increaseEffect: "ON — flips force direction; correct for a wheel that self-steers the wrong way.",
    decreaseEffect: "OFF — normal direction (correct for almost all wheels).",
    sweetSpot: "OFF unless your wheel clearly fights the wrong way.",
  },
]
