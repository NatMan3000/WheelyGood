import type { CarArea, Symptom } from "../../types"

// ── Troubleshooter symptom library ──────────────────────────────────────
// Each symptom maps a driver experience to ordered fix steps using REAL
// setting ids from the hardware/ and games/ data modules.
// Priority 1 = try first (highest impact / easiest change).
// hardware[] / game[] restrict a fix to hardware or games where the
// setting actually exists.

export const symptoms: Symptom[] = [
  // ── STEERING ──────────────────────────────────────────────────────────

  {
    id: "steering-too-heavy",
    name: "Steering Too Heavy / Fatiguing",
    description:
      "The wheel requires too much physical effort to turn. Arms tire quickly, especially on long sessions or under heavy braking. Hard to make quick corrections.",
    area: "steering",
    fixes: [
      {
        settingId: "fanatec-dd-ff",
        direction: "decrease",
        priority: 1,
        explanation:
          "FF is the master volume for wheel forces on the ClubSport DD. Reducing it directly lowers the physical effort required without losing the relative shape of the feedback.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-ff",
        direction: "decrease",
        priority: 1,
        explanation:
          "FF is the master force volume on the V2.5. Because the belt motor already peaks lower than a DD, reduce in small steps (5–10%) to find a sustainable weight.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "logitech-g920-ffb-strength",
        direction: "decrease",
        priority: 1,
        explanation:
          "The G920 peaks at 2.3Nm — high FFB mainly adds gear buzz, not useful force. Reducing it lightens the wheel and also reduces the mechanical notchiness.",
        hardware: ["logitech-g920"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 2,
        explanation:
          "In-game FFB Scale is a second multiplier on top of the base's FF. If both are high you're double-boosting — reduce FFB Scale first on FH6 to establish the right ceiling.",
        game: ["fh6"],
      },
      {
        settingId: "f125-ffb-master",
        direction: "decrease",
        priority: 2,
        explanation:
          "F1 25's master FFB strength drives all effect channels. Single-seaters generate high downforce loads — even modest master values can feel arm-pumping through fast corners.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-dd-nfr",
        direction: "decrease",
        priority: 3,
        explanation:
          "Natural Friction adds constant mechanical resistance on top of force feedback. If it's non-zero on the DD it silently adds weight at all times — reducing it removes that baseline drag.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-for",
        direction: "decrease",
        priority: 3,
        explanation:
          "FOR scales the sustained cornering-load component specifically. If corners feel heavy but straights are fine, FOR is the more targeted dial than FF.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["ffb-clipping"],
  },

  {
    id: "steering-too-light",
    name: "Steering Too Light / No Feel",
    description:
      "The wheel feels vague and numb. Little resistance when cornering, minimal feedback from the road. Hard to judge how much grip is available.",
    area: "steering",
    fixes: [
      {
        settingId: "fanatec-dd-ff",
        direction: "increase",
        priority: 1,
        explanation:
          "FF is the master force volume. Increasing it is the fastest way to add physical weight and road feel on the ClubSport DD.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-ff",
        direction: "increase",
        priority: 1,
        explanation:
          "The belt-driven V2.5 often needs FF higher than a DD to achieve comparable feel. Increase in 5–10 step increments and check for clipping (uniform stiff feeling = too high).",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "logitech-g920-ffb-strength",
        direction: "increase",
        priority: 1,
        explanation:
          "The G920's low peak torque means higher FFB values are needed for meaningful feedback. Increase until the wheel feels communicative — stop before it sounds harsh/buzzy.",
        hardware: ["logitech-g920"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "increase",
        priority: 2,
        explanation:
          "FH6's in-game FFB Scale multiplies all forces sent to the wheel. If the base FF is set conservatively, raise this to add body to the feedback.",
        game: ["fh6"],
      },
      {
        settingId: "fh6-ffb-minimum-force",
        direction: "increase",
        priority: 3,
        explanation:
          "Minimum Force sets a floor so the wheel never goes completely dead. A small value (5–15) ensures there's always some resistance, even at low speed or during understeer.",
        game: ["fh6"],
      },
      {
        settingId: "f125-ffb-master",
        direction: "increase",
        priority: 2,
        explanation:
          "The F1 25 master strength controls the overall weight of all wheel forces. Increase to add physical substance to cornering and braking loads.",
        game: ["f1-25"],
      },
      {
        settingId: "f125-on-track-effects",
        direction: "increase",
        priority: 3,
        explanation:
          "On Track Effects is the primary road-feel slider in F1 25. Increasing it adds tyre load and suspension feel through corners without affecting kerb or off-track channels.",
        game: ["f1-25"],
      },
    ],
    relatedSymptoms: ["ffb-clipping", "cant-feel-grip-limit"],
  },

  {
    id: "steering-dead-centre",
    name: "Dead Spot in the Centre of Steering",
    description:
      "Around the straight-ahead position the wheel feels loose or unresponsive — small inputs produce no car movement. Makes high-speed lane changes and small corrections feel disconnected.",
    area: "steering",
    fixes: [
      {
        settingId: "fh6-steering-deadzone-inside",
        direction: "decrease",
        priority: 1,
        explanation:
          "Steering Axis Deadzone Inside creates this dead band around centre. Most quality wheel bases need 0; anything higher introduces the numb-centre feeling. Reduce to the minimum needed to keep the car from wandering on a straight.",
        game: ["fh6"],
      },
      {
        settingId: "fh6-steering-sensitivity",
        direction: "increase",
        priority: 2,
        explanation:
          "Steering Sensitivity shapes the near-centre response curve. Increasing it makes the car react more promptly to small inputs off centre, reducing the sensation of a dead spot even when deadzone is small.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-dd-nfr",
        direction: "decrease",
        priority: 3,
        explanation:
          "Natural Friction creates constant resistance to wheel movement. High NFR makes it feel like the wheel 'sticks' at centre — reducing it lets small forces push the wheel more freely, making low-force centred feedback clearer.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["steering-too-light"],
  },

  {
    id: "steering-oscillates",
    name: "Wheel Oscillates on Straights",
    description:
      "The wheel shakes or oscillates back and forth on its own during straight-line driving, especially at high speed. Can feel like the wheel is fighting itself. Tiring and makes precise steering difficult.",
    area: "steering",
    fixes: [
      {
        settingId: "fanatec-dd-ndp",
        direction: "increase",
        priority: 1,
        explanation:
          "Natural Damper is the primary fix for DD oscillation — it adds resistance to wheel movement that kills the feedback loop causing the shake. Start at 5–10 and increase until oscillation stops; stop before the wheel feels numb.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "decrease",
        priority: 2,
        explanation:
          "Force Effect Intensity sharpens the FFB signal. A very high FEI can amplify high-frequency noise into oscillation — reducing it smooths the signal and can break the feedback loop.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-dd-ff",
        direction: "decrease",
        priority: 3,
        explanation:
          "Oscillation worsens with more force. If NDP and FEI adjustments aren't enough, reducing overall FF lowers the energy available to sustain the oscillation cycle.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "f125-wheel-damper",
        direction: "increase",
        priority: 1,
        explanation:
          "F1 25's in-game Wheel Damper adds software-level damping. In F1 25's high-downforce environment, oscillation on straights is common — a small in-game damper value (5–15) can settle the wheel without dulling cornering feel.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-v25-dpr",
        direction: "increase",
        priority: 2,
        explanation:
          "The V2.5's DPR damper setting adds resistance to wheel movement at the hardware level. Increasing it slightly (away from 0) can damp oscillation caused by the belt mechanism's resonance.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "logitech-g920-centering-spring",
        direction: "decrease",
        priority: 2,
        explanation:
          "On the G920, a too-strong centering spring can cause the gear mechanism to hunt back and forth around centre. Reducing the centering spring value settles this oscillation.",
        hardware: ["logitech-g920"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 3,
        explanation:
          "Oscillation is often driven by clipping — the signal is too hot and creates a feedback loop. Reducing in-game FFB Scale lowers the peak forces and can eliminate the condition.",
        game: ["fh6"],
      },
    ],
    relatedSymptoms: ["ffb-clipping"],
  },

  {
    id: "steering-delayed-response",
    name: "Steering Has Delayed / Laggy Response",
    description:
      "There is a noticeable delay between turning the wheel and the car responding, or between the road event happening and the wheel communicating it. Makes the car feel detached and reactions imprecise.",
    area: "steering",
    fixes: [
      {
        settingId: "fanatec-dd-int",
        direction: "decrease",
        priority: 1,
        explanation:
          "FFB Interpolation smooths between signal updates by adding deliberate latency. On a DD the signal is already clean — keeping INT at 0–2 eliminates this self-imposed lag.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-dd-ndp",
        direction: "decrease",
        priority: 2,
        explanation:
          "Natural Damper resists wheel movement, which can make fast transient responses feel sluggish. If NDP is elevated for oscillation control, check whether it is creating perceptible lag in response.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fh6-steering-sensitivity",
        direction: "increase",
        priority: 2,
        explanation:
          "In FH6, steering sensitivity shapes how quickly the car responds near centre. A higher value makes the car more immediately reactive to input, reducing the perception of lag.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-v25-dpr",
        direction: "decrease",
        priority: 2,
        explanation:
          "The V2.5's DPR damper adds inertia/drag to wheel movement. If elevated, it can make the wheel feel slow to respond to steering inputs — reduce to restore reactivity.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["steering-dead-centre"],
  },

  {
    id: "ffb-cuts-out",
    name: "FFB Cuts Out Mid-Session",
    description:
      "Force feedback disappears entirely or becomes very weak partway through a session and doesn't come back. The wheel may still steer but feels completely dead. Requires restarting the game or session to restore.",
    area: "steering",
    fixes: [
      {
        settingId: "fanatec-dd-ff",
        direction: "decrease",
        priority: 1,
        explanation:
          "Running FF too high for extended periods causes the DD's thermal protection to activate, cutting FFB to protect the motor coils. Reducing FF — especially for longer sessions — keeps the motor below the thermal threshold.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 2,
        explanation:
          "High in-game FFB Scale combined with high base FF can push the motor into sustained high-load operation. Reducing this takes load off the motor and extends time before any thermal event.",
        game: ["fh6"],
      },
      {
        settingId: "f125-ffb-master",
        direction: "decrease",
        priority: 2,
        explanation:
          "F1 25's high-downforce cornering can sustain heavy constant loads on the motor. Reducing the master strength lowers the sustained thermal load during long stints.",
        game: ["f1-25"],
      },
    ],
    relatedSymptoms: ["steering-too-heavy"],
  },

  // ── GRIP & HANDLING — FRONT (understeer) ─────────────────────────────

  {
    id: "understeer-front-pushes",
    name: "Understeer — Front Pushes Wide",
    description:
      "The front of the car doesn't follow the steering direction and washes wide of the apex. Steering more doesn't help — the car just ploughs straight on. Common when entering corners too fast or too aggressively.",
    area: "front",
    fixes: [
      {
        settingId: "fh6-mechanical-trail-scale",
        direction: "decrease",
        priority: 1,
        explanation:
          "FH6 has no 'FFB Understeer' setting — understeer feel comes from Mechanical Trail Scale, which controls how light the wheel goes when the front washes out. Lowering it lets that lightening come through more clearly, giving earlier warning that the front is pushing wide.",
        game: ["fh6"],
      },
      {
        settingId: "f125-understeer-enhance",
        direction: "increase",
        priority: 1,
        explanation:
          "Understeer Enhance amplifies the wheel-lightening that occurs when front grip is exceeded. Increasing it makes the signal earlier and more obvious, helping you sense understeer before it becomes a push.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "Higher FEI sharpens the FFB signal, making fine grip-limit feedback crisper and more immediate. If the front-loss signal feels gradual and hard to read, more FEI makes it more distinct.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "The V2.5's belt motor softens the signal compared to a DD. Increasing FEI recovers crispness and makes the front-grip-limit transition sharper and more readable.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fh6-ffb-minimum-force",
        direction: "decrease",
        priority: 3,
        explanation:
          "If Minimum Force is too high, it prevents the wheel from going light during understeer. Reducing it gives the understeer-lightening effect more room to communicate — the dynamic range between grip and no-grip becomes wider.",
        game: ["fh6"],
      },
    ],
    relatedSymptoms: ["cant-feel-grip-limit"],
  },

  {
    id: "cant-feel-grip-limit",
    name: "Can't Feel the Grip Limit",
    description:
      "The transition from grip to sliding happens with no warning through the wheel. Hard to know when the tyres are at their limit — the car suddenly snaps or pushes wide with no build-up of feedback.",
    area: "front",
    fixes: [
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "FEI sharpens the definition of every effect at the base level. Near-limit feedback involves subtle changes in self-aligning torque — increasing FEI makes these micro-changes crisper and more readable.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "Belt-driven motor softens the signal — raising FEI recovers the crispness that reveals grip limit transitions.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fh6-ffb-minimum-force",
        direction: "increase",
        priority: 2,
        explanation:
          "FFB Minimum Force scales pneumatic trail — the slip/limit cue that drops as the tyre lets go. Raising it makes the onset-of-grip-loss easier to feel, so you can sense the limit before you exceed it.",
        game: ["fh6"],
      },
      {
        settingId: "f125-understeer-enhance",
        direction: "increase",
        priority: 2,
        explanation:
          "Raising Understeer Enhance in F1 25 amplifies the signal that communicates front tyre saturation — the key cue for knowing you're at the limit.",
        game: ["f1-25"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 3,
        explanation:
          "If FFB is clipping (too strong at the top end), all the near-limit detail is crushed together at maximum output. Reducing scale un-clips the signal and restores the gradient of forces leading up to the limit.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-dd-ff",
        direction: "decrease",
        priority: 3,
        explanation:
          "Same clip-removal logic as above — if the DD FF is too high, the grip-limit gradient is lost in clipping. Reducing FF restores resolution in the near-limit zone.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["understeer-front-pushes", "ffb-clipping"],
  },

  // ── GRIP & HANDLING — REAR (oversteer / snap) ────────────────────────

  {
    id: "oversteer-rear-slides",
    name: "Oversteer — Rear Slides Out",
    description:
      "The rear of the car steps out progressively when cornering or accelerating. The back end slides wide, requiring counter-steer to catch it. Controllable but persistent — the car wants to rotate more than desired.",
    area: "rear",
    fixes: [
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "Sharper FEI means the load transfer through the wheel communicates the rear slide earlier and more distinctly. The faster you sense the rear stepping out, the smaller the correction you need.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "FEI sharpens the belt-drive signal, making the transition from grip to slide more distinct. Earlier sensing means smaller counter-steer corrections.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 2,
        explanation:
          "If FFB is clipping, the wheel force is already at maximum before the rear actually slides — you get no escalating warning. Reducing FFB Scale un-clips the signal so you feel the rear progressively loading up before it breaks away.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-v25-dri",
        direction: "decrease",
        priority: 3,
        explanation:
          "DRI (Drift Mode) adds or reduces centering force. Positive DRI values snap the wheel back aggressively, which can mask the sustained counter-steer feel needed to manage rear-end slides. Reducing DRI (towards OFF) gives more neutral wheel behaviour during a slide.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["snap-oversteer", "spinning-corner-exit"],
  },

  {
    id: "snap-oversteer",
    name: "Snap Oversteer — Rear Breaks Away Instantly",
    description:
      "The rear loses grip with no warning and snaps sideways very quickly, giving little time to react. Often happens mid-corner or under trail-braking. Very hard to catch — results in a spin most of the time.",
    area: "rear",
    fixes: [
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "Snap oversteer is often a feedback problem — by the time you feel the rear going, it's already committed. Maximum FEI makes the micro-signals before the snap sharper and earlier, giving you a few extra milliseconds to react.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-dd-ndp",
        direction: "decrease",
        priority: 2,
        explanation:
          "If NDP is elevated, it slows wheel movement — meaning when you try to apply counter-steer after a snap, the wheel resists your correction. Reducing NDP lets you make fast reactive inputs to catch the rear.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 1,
        explanation:
          "The sharper the belt-drive signal, the earlier you detect the rear breaking away. Increase FEI to maximise the warning window before a snap becomes unrecoverable.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 2,
        explanation:
          "Clipped FFB compresses all forces to the same maximum — you feel no difference between 80% slip and 100% slip. Reducing scale restores the graduated signal that warns you before the full snap.",
        game: ["fh6"],
      },
      {
        settingId: "f125-on-track-effects",
        direction: "increase",
        priority: 3,
        explanation:
          "Higher on-track effects in F1 25 makes the suspension and tyre load changes more physically pronounced. More physical information through the wheel about rear balance helps earlier detection of impending snap.",
        game: ["f1-25"],
      },
    ],
    relatedSymptoms: ["oversteer-rear-slides", "spinning-corner-exit"],
  },

  {
    id: "spinning-corner-exit",
    name: "Spinning on Corner Exit",
    description:
      "The car spins when accelerating out of corners. Applying throttle too aggressively causes the rear to step out and the car to spin, especially in rear-wheel drive cars or on low-grip surfaces.",
    area: "rear",
    fixes: [
      {
        settingId: "csp-v3-throttle-vibration",
        direction: "increase",
        priority: 1,
        explanation:
          "The CSP V3 throttle has a vibration motor that fires on wheelspin. Increasing this makes wheelspin immediately and physically obvious under your right foot — the buzz tells you to ease off before the spin commits.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "increase",
        priority: 1,
        explanation:
          "The V2.5's SHO setting controls shock/vibration intensity including the wheelspin channel. Increasing it gives a stronger tactile signal of rear traction loss through the wheel, helping you sense wheelspin earlier.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fh6-vibration-scale",
        direction: "increase",
        priority: 2,
        explanation:
          "FH6 Vibration Scale governs the rumble/texture channel including wheelspin feedback. Increasing it makes the wheel buzz more strongly when the rear tyres are slipping, prompting earlier throttle lift.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 3,
        explanation:
          "Sharper FEI on the DD makes the brief loading change at the rear (just before the spin) more immediately detectable through the wheel. More precise feedback allows earlier, smaller corrections.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["oversteer-rear-slides", "snap-oversteer"],
  },

  // ── BRAKING ───────────────────────────────────────────────────────────

  {
    id: "brakes-lock-too-easily",
    name: "Wheels Lock Too Easily",
    description:
      "Brakes lock under moderate pressure. Hard to brake at the limit without the ABS firing constantly, or the car skipping under braking. Even careful inputs trigger lock-up.",
    area: "brakes",
    fixes: [
      {
        settingId: "csp-v3-brf",
        direction: "increase",
        priority: 1,
        explanation:
          "BRF sets how much physical force equals 100% brake input on the load-cell pedal. Increasing it means you have to press harder to reach full braking — you naturally apply less force by default, reducing lock-up risk and giving more modulation range below 100%.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brf",
        direction: "increase",
        priority: 1,
        explanation:
          "Same load-cell principle as the CSP V3: increasing BRF raises the physical force required for 100% input. More pedal travel before lock-up, better trail-braking modulation.",
        hardware: ["csl-elite-pedals-v2"],
      },
      {
        settingId: "logitech-g920-brake-linearity",
        direction: "decrease",
        priority: 1,
        explanation:
          "The G920 brake uses a rubber buffer that becomes progressively harder to press. Reducing in-game brake linearity/sensitivity shifts the ramp point deeper in pedal travel — more initial pedal movement is needed before high brake force registers, reducing accidental lock-ups from light pedal touches.",
        hardware: ["logitech-g920"],
      },
      {
        settingId: "csp-v3-brake-vibration",
        direction: "increase",
        priority: 2,
        explanation:
          "Increasing the ABS vibration on the CSP V3 brake pedal makes the ABS activation signal louder and more obvious under your foot — you feel the threshold and can ease off before a full lock.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "fanatec-v25-bli",
        direction: "increase",
        priority: 2,
        explanation:
          "On the V2.5 setup (with CSL Elite pedals that have no pedal vibration), the ABS signal comes through the wheel. Increasing this setting makes the wheel pulse more strongly when ABS fires — a clearer cue to release brake pressure.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["brake-too-grabby", "no-abs-feel"],
  },

  {
    id: "cant-reach-full-brake-force",
    name: "Can't Reach Full Braking Force",
    description:
      "Even pressing the brake pedal as hard as possible, the in-game braking percentage never reaches 100%. Late braking points feel inadequate. Lap times suffer from insufficient braking force.",
    area: "brakes",
    fixes: [
      {
        settingId: "csp-v3-brf",
        direction: "decrease",
        priority: 1,
        explanation:
          "BRF is too high — you're physically unable to apply enough force to reach 100% on the load cell. Reducing BRF lowers the force required for maximum braking so you can actually use the full brake range.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brf",
        direction: "decrease",
        priority: 1,
        explanation:
          "Same issue: BRF is too high for your leg strength. Reducing it means full pedal force registers as 100% input. Dial down until a very firm but achievable press hits 100%.",
        hardware: ["csl-elite-pedals-v2"],
      },
      {
        settingId: "csp-v3-brake-performance-kit",
        direction: "decrease",
        priority: 2,
        explanation:
          "The physical elastomer firmness limits how much compression you can achieve under max force. If you're using a hard Performance Kit elastomer and can't reach 100%, swap to a softer elastomer (and re-tune BRF accordingly).",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brake-performance-kit",
        direction: "decrease",
        priority: 2,
        explanation:
          "A hard elastomer may be physically stopping you from compressing far enough for 100% input. Try a softer kit and retune BRF.",
        hardware: ["csl-elite-pedals-v2"],
      },
      {
        settingId: "logitech-g920-brake-linearity",
        direction: "increase",
        priority: 1,
        explanation:
          "On the G920, increasing brake linearity/sensitivity shifts the force ramp point earlier in pedal travel — you hit 100% brake input with less total pedal travel, making full braking more accessible.",
        hardware: ["logitech-g920"],
      },
    ],
    relatedSymptoms: ["brakes-lock-too-easily"],
  },

  {
    id: "brake-too-grabby",
    name: "Brakes Too Grabby / Over-Sensitive",
    description:
      "The lightest touch on the brake pedal produces heavy braking. Very hard to modulate — trail-braking is near-impossible. The car decelerates more than intended from gentle pedal pressure.",
    area: "brakes",
    fixes: [
      {
        settingId: "csp-v3-brf",
        direction: "increase",
        priority: 1,
        explanation:
          "A low BRF means even light load-cell pressure sends a high percentage brake signal. Increasing BRF spreads the braking range over more physical force — light touches produce proportionally less braking, restoring modulation.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brf",
        direction: "increase",
        priority: 1,
        explanation:
          "Same fix: increase BRF so you need more leg force for a given brake percentage. Grabby feel = BRF set too low for your pedal technique.",
        hardware: ["csl-elite-pedals-v2"],
      },
      {
        settingId: "logitech-g920-brake-linearity",
        direction: "decrease",
        priority: 1,
        explanation:
          "Reducing brake sensitivity on the G920 moves the force ramp deeper into pedal travel — you need more pedal movement before significant braking registers, reducing the hair-trigger feel.",
        hardware: ["logitech-g920"],
      },
    ],
    relatedSymptoms: ["brakes-lock-too-easily", "brake-mushy"],
  },

  {
    id: "brake-mushy",
    name: "Brakes Mushy / No Bite Point",
    description:
      "The brake pedal feels soft and vague with no clear point where braking really engages. Hard to be consistent lap to lap because there's no reference point to build muscle memory from.",
    area: "brakes",
    fixes: [
      {
        settingId: "csp-v3-brake-performance-kit",
        direction: "increase",
        priority: 1,
        explanation:
          "The physical elastomer firmness defines the pedal feel. Swapping to a harder Performance Kit elastomer creates a clearer resistance wall — a more defined bite point that is much easier to find consistently. Always retune BRF after swapping elastomers.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brake-performance-kit",
        direction: "increase",
        priority: 1,
        explanation:
          "A harder elastomer on the CSL Elite V2 creates a firmer, more defined engagement point. The mushy feel comes from the standard elastomer being too soft for your preferred driving style.",
        hardware: ["csl-elite-pedals-v2"],
      },
      {
        settingId: "csp-v3-brf",
        direction: "increase",
        priority: 2,
        explanation:
          "Higher BRF means more physical force is needed before the signal ramps up significantly. This creates a more progressive pedal response — the pedal resists more before 'giving', making the bite point feel firmer and more defined.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "csl-elite-pedals-v2-brf",
        direction: "increase",
        priority: 2,
        explanation:
          "Same principle — higher BRF creates a firmer, more progressive feel and a clearer threshold point on a load-cell pedal.",
        hardware: ["csl-elite-pedals-v2"],
      },
    ],
    relatedSymptoms: ["cant-reach-full-brake-force"],
  },

  {
    id: "no-abs-feel",
    name: "No ABS Feel Through the Pedal",
    description:
      "When ABS triggers under braking there is no tactile sensation — you can't tell through your foot that the brakes are locking. Hard to modulate at the limit because the threshold is invisible.",
    area: "brakes",
    fixes: [
      {
        settingId: "csp-v3-brake-vibration",
        direction: "increase",
        priority: 1,
        explanation:
          "The CSP V3's brake vibration motor fires when ABS activates. If it's set too low you won't feel it. Increase until the ABS pulse is clearly detectable under your foot without being uncomfortably strong.",
        hardware: ["csp-v3"],
      },
      {
        settingId: "fanatec-v25-bli",
        direction: "increase",
        priority: 1,
        explanation:
          "The V2.5 ABS setting drives the wheel's vibration when ABS fires. On the XSS setup with CSL Elite pedals (no pedal vibration), this wheel feedback is your only tactile ABS signal — increase it until clearly noticeable.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "increase",
        priority: 2,
        explanation:
          "SHO controls overall shock/vibration intensity on the V2.5. ABS vibration rides on this channel — if SHO is too low the ABS pulse is muted even when the ABS value is high.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["brakes-lock-too-easily"],
  },

  // ── SURFACE & TEXTURE ─────────────────────────────────────────────────

  {
    id: "cant-feel-road-kerbs",
    name: "Can't Feel Road Surface or Kerbs",
    description:
      "The wheel is smooth and silent regardless of surface. Tarmac, dirt, and kerbs all feel identical. No texture, no bumps through the wheel. Hard to judge where you are on the circuit or what surface the car is on.",
    area: "steering",
    fixes: [
      {
        settingId: "fh6-vibration-scale",
        direction: "increase",
        priority: 1,
        explanation:
          "FH6 Vibration Scale controls the high-frequency texture channel — road surface, bumps, and kerb rumble all come through here. Increasing it is the most direct way to add surface feel to the wheel.",
        game: ["fh6"],
      },
      {
        settingId: "f125-rumble-strip-effects",
        direction: "increase",
        priority: 1,
        explanation:
          "F1 25's Rumble Strip Effects controls how strongly kerbs and circuit edges transmit through the wheel. If kerbs feel invisible, this is the primary setting to raise.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "FEI sharpens all effects at the hardware level. Texture signals are high-frequency and fine — higher FEI ensures these small events aren't smoothed away before they reach the driver.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "The belt motor softens fine detail. Increasing FEI on the V2.5 recovers surface texture crispness that the belt mechanism otherwise dampens.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "increase",
        priority: 3,
        explanation:
          "SHO on the V2.5 amplifies the shock/vibration channel which carries road texture alongside wheelspin and bump events. Increasing it adds physical texture to the wheel feel.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["kerbs-feel-weak", "no-tarmac-vs-dirt-difference"],
  },

  {
    id: "off-road-vibration-too-intense",
    name: "Off-Road Vibration Too Intense",
    description:
      "When driving on dirt, gravel, or grass the wheel vibrates violently. The constant heavy rumble is tiring, makes the car feel uncontrollable, and drowns out useful grip and steering feedback.",
    area: "overall",
    fixes: [
      {
        settingId: "fh6-vibration-scale",
        direction: "decrease",
        priority: 1,
        explanation:
          "FH6's Vibration Scale directly controls surface vibration intensity. Reducing it lowers the amplitude of off-road rumble while preserving the relative difference between surfaces.",
        game: ["fh6"],
      },
      {
        settingId: "f125-off-track-effects",
        direction: "decrease",
        priority: 1,
        explanation:
          "F1 25's Off Track Effects specifically governs force when the car leaves the circuit. If going off-road produces violent jolts, this is the targeted slider to reduce.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "decrease",
        priority: 2,
        explanation:
          "SHO amplifies all vibration/shock events — reducing it lowers the peak intensity of off-road bumps reaching the wheel.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "decrease",
        priority: 3,
        explanation:
          "High FEI on the DD makes every event sharper and more jarring. Reducing it slightly smooths the rough edges off severe off-road vibration without losing major texture cues.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["cant-feel-road-kerbs"],
  },

  {
    id: "kerbs-feel-weak",
    name: "Kerbs Feel Weak / Barely Noticeable",
    description:
      "Driving over kerbs and rumble strips produces little or no sensation through the wheel. Hard to know how much kerb you're using, which makes circuit-edge decisions less precise.",
    area: "steering",
    fixes: [
      {
        settingId: "f125-rumble-strip-effects",
        direction: "increase",
        priority: 1,
        explanation:
          "Rumble Strip Effects is the dedicated kerb feedback channel in F1 25. Increase it until kerbs produce a distinct, noticeable vibration — stop before it feels violent on aggressive circuit kerbs.",
        game: ["f1-25"],
      },
      {
        settingId: "fh6-vibration-scale",
        direction: "increase",
        priority: 1,
        explanation:
          "FH6 routes kerb feel through the Vibration Scale channel. Increasing it makes rumble strips and kerb edges more distinctly physical.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "Higher FEI sharpens the crisp kerb-impact events that the game sends. If kerb impacts feel vague rather than absent, FEI gives them clearer definition.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "Increasing FEI on the V2.5 recovers the crispness of kerb-edge impacts that the belt mechanism softens.",
        hardware: ["fanatec-v25"],
      },
    ],
    relatedSymptoms: ["cant-feel-road-kerbs"],
  },

  {
    id: "no-tarmac-vs-dirt-difference",
    name: "No Difference Between Tarmac and Dirt",
    description:
      "Tarmac and loose surfaces feel identical through the wheel. No change in vibration or resistance when transitioning between surfaces. Especially noticeable in games with mixed-surface stages or environments (Forza Horizon off-road sections).",
    area: "overall",
    fixes: [
      {
        settingId: "fh6-vibration-scale",
        direction: "increase",
        priority: 1,
        explanation:
          "FH6 communicates surface type primarily through the Vibration Scale channel. Low values flatten the difference. Increasing it amplifies the contrast between smooth tarmac and textured loose surfaces.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "increase",
        priority: 2,
        explanation:
          "SHO amplifies the shock/vibration channel that carries surface-type information. Higher SHO means more physical difference between on-road and off-road surface textures.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 2,
        explanation:
          "Sharper FEI means the different texture frequencies from tarmac vs dirt are rendered more distinctly. If both feel smooth, higher FEI may reveal the texture difference that was being filtered.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["cant-feel-road-kerbs", "off-road-vibration-too-intense"],
  },

  // ── GENERAL ───────────────────────────────────────────────────────────

  {
    id: "ffb-clipping",
    name: "FFB Feels Identical Everywhere (Clipping)",
    description:
      "All force feedback feels the same — whether taking a gentle bend or hitting a kerb hard, the wheel gives the same maximum resistance. There's no gradient of forces; everything is stuck at the top. Feedback has become uninformative.",
    area: "overall",
    fixes: [
      {
        settingId: "fanatec-dd-ff",
        direction: "decrease",
        priority: 1,
        explanation:
          "When FF is too high, the strongest forces clip at the motor's physical limit and the weaker forces are proportionally crushed. Reducing FF gives the signal headroom — gentle forces are light, strong forces are heavy, and you feel the gradient again.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fh6-ffb-scale",
        direction: "decrease",
        priority: 1,
        explanation:
          "In-game FFB Scale is often the cause of clipping. If the scale is too high the strongest forces saturate the output and all subtler forces are lost. Reduce until the wheel is clearly lighter in gentle corners and heavier over kerbs.",
        game: ["fh6"],
      },
      {
        settingId: "fanatec-v25-ff",
        direction: "decrease",
        priority: 1,
        explanation:
          "Reducing FF on the V2.5 restores dynamic range — the range from light-corner to kerb-impact force becomes perceptible again instead of everything sitting at the ceiling.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "f125-ffb-master",
        direction: "decrease",
        priority: 1,
        explanation:
          "F1 25 master strength drives all FFB channels. If clipping, reduce this first — it un-clips all channels simultaneously and restores feedback variation across different corners and events.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 3,
        explanation:
          "After reducing FF to resolve clipping, raising FEI restores the sharpness that may have been part of the problem. This lets you run lower FF (no clip) while keeping fine detail crisp.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["steering-too-heavy", "cant-feel-grip-limit"],
  },

  {
    id: "vibration-too-strong",
    name: "Vibration Too Strong / Harsh",
    description:
      "The wheel produces very strong vibration that is uncomfortable and tiring. Especially noticeable on rough surfaces, kerbs, or during ABS braking. The vibration is louder than the meaningful steering forces.",
    area: "overall",
    fixes: [
      {
        settingId: "fh6-vibration-scale",
        direction: "decrease",
        priority: 1,
        explanation:
          "FH6 Vibration Scale governs the texture/rumble channel. Reducing it directly lowers all surface-related vibration intensity without affecting the main steering force magnitude.",
        game: ["fh6"],
      },
      {
        settingId: "f125-rumble-strip-effects",
        direction: "decrease",
        priority: 1,
        explanation:
          "If the harshness comes from kerbs and circuit edges in F1 25, Rumble Strip Effects is the targeted fix — reduce until kerbs feel distinct but not violent.",
        game: ["f1-25"],
      },
      {
        settingId: "f125-off-track-effects",
        direction: "decrease",
        priority: 2,
        explanation:
          "If the violent feedback occurs when slightly off the racing line or over the circuit edge, Off Track Effects governs this specifically.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "decrease",
        priority: 2,
        explanation:
          "High FEI makes every event sharper and can amplify surface texture into harsh vibration. Reducing it smooths the sharpest edges off impacts while preserving the core steering forces.",
        hardware: ["fanatec-dd"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "decrease",
        priority: 2,
        explanation:
          "SHO on the V2.5 amplifies the shock/vibration channel. If the wheel feels buzzy or harsh, reducing SHO lowers the overall vibration intensity across all events.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-dd-ndp",
        direction: "increase",
        priority: 3,
        explanation:
          "Natural Damper smooths wheel movement, which can round off the harshest high-frequency vibrations. A small NDP increase (5–15) on the DD takes the edge off sharp impacts without dulling the main forces.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["off-road-vibration-too-intense", "steering-oscillates"],
  },

  {
    id: "vibration-too-weak",
    name: "Vibration Too Weak / None",
    description:
      "The wheel produces little or no vibration — road surface, bumps, and kerbs produce no tactile sensation at all. The wheel feels like it's floating, disconnected from the road.",
    area: "overall",
    fixes: [
      {
        settingId: "fh6-vibration-scale",
        direction: "increase",
        priority: 1,
        explanation:
          "FH6's Vibration Scale directly controls all texture and surface vibration. If vibration is absent or imperceptible, this is the primary slider to increase.",
        game: ["fh6"],
      },
      {
        settingId: "f125-rumble-strip-effects",
        direction: "increase",
        priority: 1,
        explanation:
          "Rumble Strip Effects in F1 25 drives kerb and circuit-edge feedback. If kerbs feel invisible, this is the targeted slider.",
        game: ["f1-25"],
      },
      {
        settingId: "f125-on-track-effects",
        direction: "increase",
        priority: 2,
        explanation:
          "On Track Effects covers general in-lap texture and bumps on the circuit surface. If the surface feels smooth and silent everywhere, increasing this adds road feel.",
        game: ["f1-25"],
      },
      {
        settingId: "fanatec-v25-sho",
        direction: "increase",
        priority: 2,
        explanation:
          "SHO controls the shock/vibration channel on the V2.5. If the wheel produces no texture buzz, increasing SHO activates this channel and adds tactile surface feel.",
        hardware: ["fanatec-v25"],
      },
      {
        settingId: "fanatec-dd-fei",
        direction: "increase",
        priority: 3,
        explanation:
          "If FEI is very low on the DD, fine texture events are being smoothed away before reaching the driver. Increasing FEI lets high-frequency vibration through.",
        hardware: ["fanatec-dd"],
      },
    ],
    relatedSymptoms: ["cant-feel-road-kerbs", "cant-feel-grip-limit"],
  },
]

// ── Lookup helpers ────────────────────────────────────────────────────────

export function symptomById(id: string): Symptom | undefined {
  return symptoms.find((s) => s.id === id)
}

export function symptomsByArea(area: CarArea): Symptom[] {
  return symptoms.filter((s) => s.area === area)
}
