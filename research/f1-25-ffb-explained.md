---
title: F1 25 Force Feedback Settings — Mechanical Explanations
status: research
created: 2026-05-30
games_covered: F1 22 / F1 23 / F1 24 / F1 25 (FFB model is stable across all four)
---

# F1 25 Force Feedback Settings — What Each One Actually Does

The Codemasters/EA FFB model has been architecturally stable since at least F1 22. Explanations sourced from F1 22 and F1 24 guides apply to F1 25 unless noted. Where sources conflict, the conflict is documented.

---

## The Core Question: Where Does Cornering Force Come From?

**Short answer:** The master **Vibration & Force Feedback Strength** slider is the gain control for the entire FFB output — it scales everything including the main steering weight. **On Track Effects** is a secondary vibration layer for road surface texture (bumps, marbles, imperfections), not the primary source of cornering force.

**Longer explanation:**

The F1 game's FFB model outputs a combined signal to the wheel. The primary steering weight you feel building through a corner — the self-aligning torque as tyre load increases — is part of the "base" force that the master Strength slider amplifies. Codemasters added proper self-aligning torque to the FFB calculation in an F1 22 patch (confirmed by RacingGames.gg, which reported the patch note that "self-aligning torque of the tyres" was added to the overall calculation).

**On Track Effects** is a separate channel that adds vibration/texture feedback from road surface phenomena — bumps, track marbles, undulations. Driver61's F1 2021 guide (the clearest mechanical description found) states it explicitly: *"the FFB strength provided by bumps, undulations, and changes in road surface texture."* Multiple independent sources confirm this is a texture/vibration layer, not the source of cornering weight.

**Common misconception:** Some guides describe On Track Effects as "the most important" setting because it communicates when you're near the grip limit. This is true — loss of tyre grip produces micro-vibrations in the steering — but these are vibration signals layered ON TOP of the base cornering force, not the base force itself. Setting On Track Effects to zero would not make your wheel feel unweighted in corners; it would just remove the texture/buzz.

**Sources confirming On Track Effects = texture layer:**
- Driver61 (F1 2021): *"FFB strength provided by bumps, undulations, and changes in road surface texture"*
- SimRacingSetup (F1 22): *"relates to bumps in the track surface as well as marbles"*
- Brian Koponen (F1 25): *"the vibrations felt based on the track surface. Most noticed in certain bumpy sections"*
- SimStaff (F1 25): *"surface texture without harshness"*

---

## Setting 1: Vibration & Force Feedback (Master Toggle + Strength)

### What it controls
The master on/off toggle enables or disables all force feedback output to the wheel. The **Strength** slider underneath it is the overall gain multiplier — it scales the amplitude of every other FFB channel proportionally.

Official EA description (F1 22): *"Turn On or Off to enable simulation of the forces on the tyres with resistance and vibration effects through the racing wheel."*

### What you feel when you change it
- **Raise it:** Every force becomes stronger — cornering weight, kerb buzz, surface texture, all of it. Too high clips the output (the signal maxes out the wheelbase's torque range), which paradoxically makes heavy corners feel numb or "dead" because the force flatlines at the ceiling rather than building naturally.
- **Lower it:** All forces weaken proportionally. At very low values you lose the fine detail that communicates grip limits.

### Misconceptions
- **"It only controls vibration, not the main force."** Wrong — it scales everything including the primary steering weight.
- **"Higher is always better."** The clipping problem is real. Most direct-drive wheel users run this well below 50% to preserve the dynamic range of the signal. Gear-driven wheels (lower torque ceiling) can handle higher values before clipping occurs.

### Sources
SimRacingSetup F1 2021: *"an overall strength value which will increase or decrease the strength of all effects"*; SimRacingSetup F1 22: *"your main force feedback strength setting... will in turn affect all other settings"*; RacingGames.gg (F1 25 update): Codemasters added SAT to overall calculation; Brian Koponen F1 25: *"the overall strength of the force feedback... clipping, where the wheel will feel numb on the heavy corners"*

---

## Setting 2: On Track Effects

### What it controls
A secondary vibration channel that communicates road surface texture — bumps, track marbles, undulations, and (according to some sources) micro-vibrations as tyres approach the grip limit. **This is not the source of cornering steering weight.**

### What you feel when you change it
- **Raise it:** More buzz and vibration through the wheel as you drive over imperfect surfaces. Bumpy sectors (e.g. Baku walls section, Monaco kerbs) become more pronounced. Near the traction limit you feel increased chatter/vibration warning you that grip is saturating.
- **Lower it (or zero):** The wheel becomes smooth and quiet over surface imperfections. Cornering weight is unaffected — the wheel still loads up through corners, you just don't feel the track texture overlaid on that force.

### Misconceptions
- **"On Track Effects is the main cornering force / steering weight."** False. This is the most common misconception. It is a texture/vibration overlay. The cornering force comes from the base FFB signal scaled by the master Strength slider.
- **"High On Track Effects gives more detail about grip."** Partially true, but too high drowns out the base cornering signal with noise, making it harder to read grip. Most serious sim racers keep it modest (20–35).
- **"Pro esports drivers set it to zero."** True — they prefer pure cornering force without artificial texture effects, as real F1 drivers feel surface imperfections through the seat, not the steering wheel.

### Sources
Driver61 F1 2021: *"FFB strength provided by bumps, undulations, and changes in road surface texture"*; SimRacingSetup F1 22: *"bumps in the track surface as well as marbles"*; Brian Koponen F1 25: *"vibrations felt based on the track surface... most noticed in certain bumpy sections"*; SimStaff F1 25: *"surface texture without harshness"*; SimRacingSetup general: *"artificial feedback effects, not usually felt by a real-world Formula 1 driver"*

---

## Setting 3: Rumble Strip Effects

### What it controls
A dedicated vibration channel specifically for kerb contact. When a tyre rides over a painted rumble strip / kerb, this channel fires and produces a buzz or thump through the wheel proportional to this setting.

### What you feel when you change it
- **Raise it:** Kerbs feel more aggressive and physical. High values can make cutting a kerb feel violent even if the car physics are unaffected.
- **Lower it / zero:** Kerb strikes are muted or silent through the wheel. Useful for drivers who find kerb feedback distracting or fatiguing.

### Misconceptions
- **"Rumble Strip Effects and On Track Effects are the same thing."** They are separate channels. On Track Effects covers general road texture; Rumble Strip is specifically triggered by kerb geometry. You can set one high and one low independently.
- **"This is physically realistic."** Official EA documentation notes that in real F1, kerb vibrations are primarily felt through the seat/chassis rather than the steering column. This is an artificial effect added for game immersion.

### Sources
SimRacingSetup F1 22: *"only affects kerbing — increasing will make all physical kerbs feel bumpier"*; Driver61 F1 2021: *"strength of vibrations on rumble strips (kerbs)"*; Official EA F1 22 docs: *"intensity of vibration and feedback when on the rumble strip"*

---

## Setting 4: Off Track Effects

### What it controls
A vibration/resistance channel triggered when the car is off the racing surface — grass, gravel, kitty litter, astroturf run-off. Adds tactile feedback specific to those surfaces.

### What you feel when you change it
- **Raise it:** Grass and gravel produce strong vibration or increased resistance through the wheel when you go off track. Can be jarring at high values.
- **Lower it / zero:** Off-track excursions feel similar to on-track — no sudden change in wheel feedback when you leave the asphalt.

### Misconceptions
- **"This is a primary driving aid."** It's environmental texture for off-track surfaces. The car physics still apply; this only changes what you feel in your hands.
- **"High Off Track helps avoid mistakes."** Only marginally — the sudden jolt at high values can actually cause over-correction in panic situations.

### Sources
Official EA F1 22 docs: *"intensity of off track effects"*; SimRacingSetup F1 22: *"specifically for grass and gravel traps"*; SimStaff F1 25: *"grass and gravel — noticeable but not violent"*

---

## Setting 5: Wheel Damper

### What it controls
This is where sources disagree, and the disagreement is meaningful.

**The most accurate picture (synthesised from multiple sources):**

Wheel Damper adds a velocity-proportional resistance force to the wheel — the faster the wheel is moving/rotating, the more it resists. In technical FFB terms, this is a "damper effect" (as defined by Thrustmaster's technical documentation: *"controls how the wheel will react when it's moving... usually used as dynamic friction... controlling the force you need to apply on the wheel to rotate it"*).

**What this means in practice:**
- At moderate values: the wheel feels heavier and more planted, especially at low speeds and when stopped. This is why Brian Koponen's guide describes it as: *"without this, the wheel feels weightless when stopped and in very slow corners."*
- At high values: the wheel resists quick direction changes and dampens oscillation/shaking. This is why some sources describe it as "oscillation control."
- At very high values (F1 24 defaulted to 100): the wheel becomes sluggish and unresponsive to rapid inputs.

**The source conflict explained:**
- SimRacingSetup F1 22 describes it as *"overall strength of tyre forces as they're in contact with the road"* — this appears to conflate the damper effect with tyre-load simulation, which is inaccurate. The tyre load signal comes from the base FFB model scaled by Strength, not from Damper.
- Driver61 F1 2021 describes it as *"smoothing effect of the FFB... smooth out notchy and sharp feeling"* — more accurate, but incomplete.
- Thrustmaster's hardware documentation is the clearest: it is a dynamic friction effect proportional to wheel velocity, not a simulation of tyre lateral forces.

**Best single-sentence description:** Wheel Damper adds velocity-dependent resistance that makes the wheel feel heavier and suppresses rapid oscillations — it is artificial friction layered on top of the tyre-derived force signal, not a simulation of tyre grip itself.

### What you feel when you change it
- **Raise it:** Wheel feels heavier to turn, especially at slow speeds and centre-position. Oscillation and straight-line shaking are reduced. Direction changes become more effort-requiring.
- **Lower it / zero:** Wheel feels lighter and more responsive. At zero, the wheel may oscillate or shake on straights if the base FFB signal has high-frequency noise.

### Misconceptions
- **"Wheel Damper simulates tyre forces / steering weight."** Partially misleading. It adds artificial friction on top of — and potentially masking — the tyre-derived forces. It is not a tyre physics simulation.
- **"Higher damper = more realistic."** The opposite. High damper adds artificial weight that is not from the physics model. Most DD wheel users run 0–10. Every unit of damper reduces your ability to feel the "true" FFB signal.
- **"Damper and the base steering weight are the same signal."** They are separate. The base signal comes from tyre self-aligning torque (scaled by master Strength). Damper is a hardware-level effect layered on top.

### Sources
Brian Koponen F1 25: *"adds weight to the wheel. Without this, the wheel feels weightless when stopped and in very slow corners"*; Driver61 F1 2021: *"smoothing effect of the FFB in relation to the car's tyres... smooth out notchy and sharp"*; Thrustmaster technical docs: *"controls how the wheel will react when it's moving... usually used as dynamic friction"*; SimStaff F1 25: *"oscillation control... add only if wheel shakes on straights"*; Fanatec F1 25 guide: recommended values of 2–3 on DD wheels

---

## Setting 6: Understeer Enhance

### Status in F1 25: PRESENT (with caveats)

**History:** This setting was confirmed removed in F1 23 (EA forums: *"not in this year's game"*, corroborated by a pre-launch video noting FFB had improved in other ways so it wasn't missed). It appears to have returned in F1 24 or F1 25. Multiple F1 25 guides list it (f125game.com, simstaff.net, briankoponen.com). However, it is not universally confirmed — several comprehensive F1 25 wheel guides (Fanatec official, SimRacingSetup, RacingGames.gg) do not list it in their settings tables. **Treat it as present but wheel-dependent or platform-dependent until you can visually confirm it in your own in-game menu.**

### What it controls
An artificial enhancement of the understeer sensation. When the front tyres lose lateral grip (understeer), the physical reality is that self-aligning torque drops — the steering goes lighter as tyre slip angle exceeds peak grip. Understeer Enhance **exaggerates this lightening effect**, making the wheel go noticeably, artificially lighter the moment understeer begins, as a warning signal.

**It is an on/off toggle, not a slider.**

### What you feel when you change it
- **On:** When you push past front grip, the wheel goes dramatically light — almost like power steering suddenly engages. It's a clear, binary "understeer warning." The transition can feel unnatural, almost like a fault.
- **Off:** Understeer still produces some wheel lightening (from the physics model's SAT reduction), but the effect is subtler. You rely more on visual cues and throttle/tyre feel.

### Misconceptions
- **"Understeer Enhance makes the wheel heavier during understeer."** Wrong — it makes the wheel LIGHTER. Some sources (including f125game.com) described it as "fakes extra weight during understeer" — this is incorrect. The consistent description across Driver61, SimRacingSetup, and EA forums is that it exaggerates the wheel going light.
- **"It helps all wheel types equally."** It's most useful for gear-driven wheels (Logitech G29/G920/G923) which have lower torque resolution and may not communicate the natural SAT drop clearly. DD wheel users typically keep it off — the natural SAT signal is strong enough.

### Sources
Driver61 F1 2021: *"exaggerate the feeling of understeer... steering wheel going light when turning"*; SimRacingSetup F1 2021: *"will make your racing wheel feel incredibly light as soon as your car starts to understeer"*; EA Forums: removed in F1 23, appears returned by F1 25; briankoponen.com F1 25: *"adds a lightening effect when the front tires slide... helpful for gear-driven wheels"*

---

## Setting 7: Maximum Wheel Rotation

### What it controls
Sets the maximum physical lock-to-lock rotation of your wheel that the game will recognise. F1 cars use approximately 320–360° of steering rotation total. This setting maps the game's full steering range onto that rotation window.

**If your physical wheel has 900° of rotation (e.g. Logitech G920) and you set Maximum Wheel Rotation to 360°:** the game will map full steering lock to ±180° of physical movement. Your wheel physically stops responding to input beyond that point.

**If you set it lower (e.g. 310°):** full steering lock is reached with less physical movement — quicker inputs, but less fine control near centre.

### What you feel when you change it
- **Higher values (360–400°):** More physical movement required for the same steering angle. Finer, more precise inputs. Feels closer to a real F1 car's heavy lock-to-lock travel.
- **Lower values (270–310°):** Wheel reaches full lock faster. Inputs feel more reactive and "twitchy." Can make the car harder to control at the limit.

### Misconceptions
- **"This is a calibration setting — it adjusts the force feedback signal."** No. It is purely an input mapping setting. It has no effect on force feedback signals at all.
- **"It should match your physical wheel's hardware rotation."** You want it to match the GAME's steering arc, not your wheel's maximum. Set it to match what an F1 car actually uses (320–400°), not the 900° your G920 is capable of.
- **"Higher is always more realistic."** Only up to a point. Above ~400° you're mapping the game's full steering arc onto more physical movement than an F1 driver would use, which actually degrades realism.

### Sources
Brian Koponen F1 25: *"should be no larger than 360°"*; SimStaff F1 25: *"standard 360°"*; RacingGames.gg F1 25: *"360° gives quicker hands; 400° gives more fine control"*; Official EA F1 22 docs: *"change the maximum wheel rotation on F1 and F2 cars"*

---

## Bonus: Calibration Settings (Separate Menu)

F1 25 has a **Calibration** section (under Settings > Controls > your wheel > Custom profile > Calibration) that is **distinct** from the Vibration & Force Feedback menu. These are pure input-mapping controls — they do not affect FFB at all.

| Setting | What it does |
|---------|-------------|
| **Steering Deadzone** | Dead zone at centre of steering travel — no input registered in this range |
| **Steering Linearity** | Input curve shape — 0 = linear (1:1), higher values = slower initial response, faster at extremes |
| **Steering Saturation** | Maximum physical movement required to reach 100% in-game input |
| **Throttle / Brake Deadzone** | As above for pedal axes |
| **Throttle / Brake Saturation** | As above for pedal axes |

These exist in F1 25 and are confirmed separate from the FFB menu. They affect input precision, not force feedback signals.

Source: f125game.com calibration guide; simracingsetup.com wheel setup guide

---

## Source Summary

| Source | Game | Reliability | Notes |
|--------|------|-------------|-------|
| Official EA F1 22 accessibility docs | F1 22 | Official | UI-label descriptions only, no mechanical detail |
| Driver61 FFB guide | F1 2021 | High | Best per-setting mechanical descriptions found |
| SimRacingSetup (F1 2021, F1 22, F1 25) | Multiple | High | Good mechanical descriptions; one Wheel Damper description is misleading |
| RacingGames.gg (F1 22 patch notes) | F1 22 | High | Confirmed SAT addition to FFB model |
| Brian Koponen (F1 25) | F1 25 | High | Clear, honest per-setting descriptions |
| Thrustmaster technical docs | General | High | Best technical definition of damper effect |
| Fanatec official F1 25 recommendations | F1 25 | High | Confirms DD wheel values; no Understeer Enhance listed |
| f125game.com | F1 25 | Medium | Confirms Understeer Enhance present; one incorrect description of it |
| SimStaff F1 25 | F1 25 | Medium | Good practical descriptions |
| EA Forums (F1 23 understeer thread) | F1 23 | Medium | Confirms removal in F1 23 |
