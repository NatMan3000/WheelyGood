---
title: F1 25 FFB Research — Full Settings + Hardware Values
status: research
created: 2026-05-30
game: F1 25 (EA Sports / Codemasters)
hardware: Fanatec ClubSport DD, Fanatec ClubSport Wheelbase V2.5, Logitech G920
---

# F1 25 — Force Feedback Research Report (2026-05-30)

## Source Table

| Source | Type | Coverage | URL | Date |
|--------|------|----------|-----|------|
| Fanatec Official — F1 25 Recommended Settings | Official | ClubSport DD, ClubSport DD+, CSL DD, Podium DD1/DD2. **No V2.5** | [fanatec.com](https://www.fanatec.com/us/en/explorer/games/f1-2024/f1-25-fanatec-recommended-settings/) | Updated July 1, 2025 |
| SimRacingSetup — F1 25 Fanatec Settings | Community | ClubSport DD, ClubSport DD+, CSL DD, DD1, DD2 | [simracingsetup.com](https://simracingsetup.com/ea-sports-f1/f1-25-fanatec-wheel-settings/) | June 10, 2025 |
| SimRacingSetup — F1 25 All Wheels | Community | All wheels incl. G923/G29, DD range | [simracingsetup.com](https://simracingsetup.com/ea-sports-f1/f1-25-wheel-settings/) | June 10, 2025 |
| SimRacingSetup — F1 25 Fanatec Esports | Community | ClubSport DD, DD+, CSL DD, DD1, DD2 | [simracingsetup.com](https://simracingsetup.com/ea-sports-f1/f1-25-fanatec-wheel-settings-esports/) | October 8, 2025 |
| SimRacingSetup — F1 25 G923 Settings | Community | G923, G29, G920 | [simracingsetup.com](https://simracingsetup.com/ea-sports-f1/f1-25-logitech-g923-wheel-settings/) | May 26, 2025 |
| Brian Koponen — F1 25 G920/G29 | Community | G920, G29 | [briankoponen.com](https://www.briankoponen.com/f1-25-logitech-g29-g920-settings/) | May 28, 2025 |
| RacingGames.gg — F1 25 Wheel Settings | Community | General/all | [racinggames.gg](https://racinggames.gg/article/f1-25-best-wheel-settings) | Updated April 30, 2026 |
| SimStaff — F1 25 All Platforms | Community | General, no V2.5 | [simstaff.net](https://simstaff.net/f1-25-wheel-settings-guide-for-every-platform/) | September 18, 2025 |
| f125game.com — FFB Guide | Community | General, all wheels | [f125game.com](https://www.f125game.com/wheel-setup/force-feedback-ffb/) | October 4, 2025 |
| Fanatec — Tuning Menu Explained | Official | All Fanatec bases (parameter glossary) | [fanatec.com](https://www.fanatec.com/eu/en/s/faq-what-can-be-set-wheel-tuning-menu) | — |

**What is NOT available:**
- Any EA / Codemasters official F1 25 FFB menu documentation (only F1 22 accessibility docs exist officially)
- Official Fanatec settings for ClubSport Wheelbase V2.5 in F1 25 (or F1 24 — Fanatec only covers DD-series on that page)
- Official G Hub values from Logitech for F1 25

---

## Section 1: In-Game FFB Menu — Full Settings List and Mechanical Explanations

The F1 25 in-game FFB menu lives at: Settings → Controls, Vibration & Force Feedback → your wheel profile.

**Confirmed settings present in F1 25** (synthesised across multiple sources that list the menu):

| Setting | Type | Range |
|---------|------|-------|
| Vibration & Force Feedback | Master toggle | On / Off |
| Vibration & Force Feedback Strength | Slider | 0–100+ (varies by wheel class) |
| On Track Effects | Slider | 0–100 |
| Rumble Strip Effects | Slider | 0–100 |
| Off Track Effects | Slider | 0–100 |
| Pit Stop Effects | Slider | 0–100 |
| Wheel Damper | Slider | 0–100 |
| Understeer Enhance | Toggle | On / Off |
| Maximum Wheel Rotation | Slider / value | 200–900° |

---

### 1.1 Vibration & Force Feedback (Master Toggle)

**What it controls:** Enables or disables all force feedback output. When Off, the wheel receives no force signals at all.

**Raise / Lower:** Toggle only. On for any wheel use.

**Gotcha:** Some wheels (G920) have a separate hardware enable — the in-game toggle must match.

---

### 1.2 Vibration & Force Feedback Strength

**What it controls:** The master gain multiplier for the entire FFB output. This scales every force channel — the primary steering weight (self-aligning torque from tyres), plus all the effect layers below. It is the single most impactful FFB setting.

**Raise it:** Every force becomes stronger. Cornering weight increases, kerb buzz increases, surface texture increases — proportionally. Risk: if raised too high relative to your wheel's torque ceiling, the signal **clips** — the wheel maxes out its motor range and the output flatlines. Clipping makes heavy corners feel paradoxically numb ("dead") because force stops building naturally.

**Lower it:** All forces weaken proportionally. At very low values you lose fine grip-limit detail.

**The clipping trap:** F1 25 has no built-in clipping meter. Check for clipping by testing in ACC, iRacing, or LMU (which do have meters) at the same force level, or watch for telemetry that shows force output hitting the ceiling. A fully-clipping wheel feels weighted but lacks the nuance of grip changing.

**Gotcha (DD wheels):** Direct drive wheels have far higher torque than gear-driven or belt-driven wheels. A Podium DD2 running in-game Strength 100 will almost certainly clip. The Fanatec recommended values for DD wheels are deliberately low (60–80 in-game) combined with lower wheelbase FFB% to stay below the clipping threshold.

**Sources:** SimRacingSetup F1 22 ("main force feedback strength setting, will in turn affect all other settings"); Brian Koponen F1 25 ("overall strength of the force feedback... clipping, where the wheel will feel numb on heavy corners"); Fanatec F1 25 official (model-specific values).

---

### 1.3 On Track Effects

**What it controls:** A secondary vibration layer for road surface texture — bumps, track marbles, undulations, and micro-vibrations as tyres approach the grip limit. **This is NOT the source of cornering steering weight.**

The cornering weight you feel building through a corner (self-aligning torque as tyre load increases) comes from the base FFB signal scaled by the master Strength slider. On Track Effects is an additional channel layered on top of that.

**Raise it:** More buzz and vibration over imperfect surfaces. You feel bumpy sectors more prominently. Near the traction limit, increased chatter warns you that grip is saturating.

**Lower it / zero:** The wheel becomes smooth and quiet over surface imperfections. Cornering weight is unaffected — the wheel still loads up through corners, you just lose the texture overlay.

**Gotcha (the "most important" misconception):** Some community guides call On Track Effects "the most important setting" because high values communicate grip limits. While micro-vibrations from tyre saturation do travel through this channel, the description is misleading. Too high and the texture noise drowns out the cleaner cornering-force signal. Professional esports drivers typically set this to 0 — they prefer the pure steering weight signal without vibration effects that real F1 drivers would feel through the seat, not the wheel.

**Sources:** Driver61 F1 2021 ("FFB strength provided by bumps, undulations, and changes in road surface texture"); SimRacingSetup F1 22 ("bumps in the track surface as well as marbles"); Brian Koponen F1 25 ("vibrations felt based on the track surface, most noticed in certain bumpy sections"); SimStaff F1 25 ("surface texture without harshness"); existing `f1-25-ffb-explained.md` (comprehensive cross-source synthesis).

---

### 1.4 Rumble Strip Effects

**What it controls:** A dedicated vibration channel triggered specifically by kerb contact. Separate from On Track Effects — this fires when a tyre physically crosses a painted kerb or rumble strip.

**Raise it:** Kerbs produce a stronger buzz or thump. At high values, cutting a kerb feels physically aggressive even if the car physics aren't affected.

**Lower it / zero:** Kerb strikes are muted. Useful for drivers who find kerb buzz distracting. Does not affect grip or car handling — purely perceptual.

**Gotcha:** In real F1, kerb vibration reaches drivers through the chassis/seat, not primarily the steering column. This effect is an artificial addition for game immersion. Many esports drivers set it to 0 for the same reason as On Track Effects.

**Sources:** SimRacingSetup F1 22 ("only affects kerbing — increasing will make all physical kerbs feel bumpier"); Official EA F1 22 docs ("intensity of vibration and feedback when on the rumble strip").

---

### 1.5 Off Track Effects

**What it controls:** A vibration/resistance channel triggered when the car leaves the racing surface — grass, gravel, astroturf, kitty litter. Adds tactile feedback specific to off-track surfaces.

**Raise it:** Off-track excursions produce strong vibration through the wheel. At very high values, hitting the grass creates a jarring jolt.

**Lower it / zero:** Off-track feels similar to on-track — no sudden change in wheel feedback. Useful for drivers who find the sudden jolt causes overcorrection.

**Sources:** Official EA F1 22 docs; SimRacingSetup F1 22 ("specifically for grass and gravel traps"); SimStaff F1 25 ("grass and gravel — noticeable but not violent").

---

### 1.6 Pit Stop Effects

**What it controls:** Vibration and force feedback effects during a pit stop sequence — tyre changes, jack vibrations, etc. Entirely cosmetic / immersion feature.

**Raise it:** Pit stop sequences have more vibration/force feedback through the wheel.

**Lower it / zero:** No feedback during pit stops. The near-universal community recommendation is to set this to 0 — it has zero effect on driving and some drivers find unexpected forces in the pit box disorienting.

**F1 25 specific:** Present in F1 25. Confirmed present by RacingGames.gg (set to 0 in their recommendation table, April 2026 update) and simracingsetup.com G923 guide (set to 50 as a default).

**Sources:** RacingGames.gg F1 25 (April 2026); SimRacingSetup G923 guide (May 2025).

---

### 1.7 Wheel Damper

**What it controls:** A velocity-proportional resistance force applied to the wheel — the faster the wheel is rotating, the more it resists. This is artificial mechanical damping added on top of the tyre-derived FFB signal, not a simulation of tyre grip.

In practice:
- At moderate values: wheel feels heavier and more planted, especially at low speeds and when stopped. Reduces the "floaty" feeling when the car is not generating significant cornering loads.
- At high values: wheel resists quick direction changes and dampens oscillation or straight-line shaking. Countersteering becomes more effort-requiring.
- At very high values: wheel becomes sluggish, masks fine FFB detail, and slows down rapid inputs.

**Raise it:** Wheel feels heavier and more settled. Oscillation on straights is suppressed. Direction changes require more arm effort.

**Lower it / zero:** Wheel feels lighter and more responsive. Risk: at zero with a strong base FFB signal, the wheel may oscillate or chatter on straights.

**Gotcha (source conflict):** Some guides describe Wheel Damper as "simulating tyre forces" or "steering weight from tyre grip." This is inaccurate. The tyre load signal (self-aligning torque) comes from the physics model, scaled by the master Strength slider. Wheel Damper is a separate, artificial friction effect layered on top. Every unit of Damper adds weight that is NOT from the physics model — it slightly masks the true signal. DD wheel users typically run 0–10 because their wheel's natural resolution is high enough to feel tyre loads without artificial help.

**Sources:** Brian Koponen F1 25 ("adds weight to the wheel. Without this, the wheel feels weightless when stopped and in very slow corners"); Driver61 F1 2021 ("smoothing effect of the FFB... smooth out notchy and sharp feeling"); Thrustmaster hardware docs ("controls how the wheel will react when it's moving... usually used as dynamic friction"); SimStaff F1 25 ("oscillation control — add only if wheel shakes on straights"); existing `f1-25-ffb-explained.md`.

---

### 1.8 Understeer Enhance

**What it controls:** An on/off toggle (not a slider) that artificially amplifies the understeer sensation. When front tyres lose lateral grip, self-aligning torque drops naturally — the wheel goes slightly lighter. Understeer Enhance exaggerates this effect, making the wheel go dramatically lighter the moment understeer begins.

**On:** When pushing past front grip limit, the wheel goes noticeably lighter — almost like a power-steering-assist suddenly engaging. Clear binary warning signal.

**Off:** Natural SAT-based understeer cue still present (wheel goes somewhat lighter with understeer) but subtler. You rely more on visual cues and tyre feel from the rest of the FFB signal.

**Who should use it:** Most useful for gear-driven wheels (G920, G29) where torque resolution is lower and the natural SAT drop may be hard to feel. Most DD wheel users keep it Off — the natural signal is strong enough, and Understeer Enhance makes the feel less realistic and more artificial.

**Gotcha (wrong description):** f125game.com described this as "fakes extra weight during understeer" — this is backwards. It makes the wheel LIGHTER during understeer, not heavier. The correct description (consistent across Driver61, SimRacingSetup, and Brian Koponen) is that it exaggerates the wheel going light as a warning.

**Gotcha (availability):** This setting was confirmed removed in F1 23. It appears returned in F1 24/F1 25, but multiple comprehensive F1 25 guides (Fanatec official, SimRacingSetup main Fanatec guide, RacingGames.gg) do not list it in their settings tables. Verify it exists in your in-game menu — it may be wheel-dependent or platform-dependent.

**Sources:** Driver61 F1 2021 ("exaggerate the feeling of understeer... steering wheel going light when turning"); SimRacingSetup F1 2021 ("will make your racing wheel feel incredibly light as soon as your car starts to understeer"); Brian Koponen F1 25 ("adds a lightening effect when the front tires slide... helpful for gear-driven wheels"); f125game.com F1 25 (present, but mechanical description there is incorrect).

---

### 1.9 Maximum Wheel Rotation

**What it controls:** Maps the game's full steering range (lock-to-lock) onto a specified number of degrees of physical wheel movement. F1 cars use approximately 320–400° of total steering rotation.

If your wheel supports 900° physical rotation (e.g. G920) and you set this to 360°, full lock is reached with only 180° of physical movement to each side. Beyond that, the wheel stops producing additional input.

**Raise it (closer to 400°):** More physical movement needed to reach full lock. Finer, more precise inputs near centre. Feels closer to the actual arc of an F1 car's steering.

**Lower it (closer to 270–310°):** Full lock reached faster. Inputs feel more reactive and "twitchy." Can make the car harder to control precisely.

**Gotcha:** This is purely an input-mapping setting — it has zero effect on force feedback signals. It should match what the game and your wheel software both agree the rotation is. Set your wheel's hardware SEN/rotation to match, or set SEN to AUTO and let the game control it.

**Sources:** Brian Koponen F1 25 ("should be no larger than 360°"); SimStaff F1 25 ("standard 360°"); RacingGames.gg F1 25; Official EA F1 22 docs.

---

## Section 2: Fanatec Official Recommended Settings

**Source:** [fanatec.com — F1 25 Recommended Settings](https://www.fanatec.com/us/en/explorer/games/f1-2024/f1-25-fanatec-recommended-settings/)
**Updated:** July 1, 2025

> Fanatec notes: "these are simply a reference, and you should test and adjust them slightly and slowly, making single adjustments to one setting at a time."

**Models covered on the Fanatec official page: ClubSport DD, ClubSport DD+, CSL DD/GT DD, Podium DD1, Podium DD2.**

**The ClubSport Wheelbase V2.5 (belt-driven) is NOT on the Fanatec F1 25 settings page.** This is a hard gap — see Section 4 for community-derived V2.5 guidance.

### Fanatec ClubSport DD (Official)

| Parameter | Value | What it does |
|-----------|-------|-------------|
| SEN (Sensitivity) | 360° | Lock-to-lock steering range |
| FFB | 75 | Motor output strength (% of rated torque) |
| FFS (Force Feedback Scaling) | 50% | Scales peak vs average force — 50% = "FullForce" mode engaged |
| NDP (Natural Damper) | 55 | Velocity-proportional damping; reduces oscillation |
| NFR (Natural Friction) | Off | Mechanical steering resistance; Off removes artificial friction |
| NIN (Natural Inertia) | Off | Simulated steering mass; Off keeps response sharp |
| INT (Interpolation) | 10 | Signal smoothing filter; 10 is relatively aggressive smoothing |
| FEI (Force Effect Intensity) | 100 | Sharpness of force effects; 100 = max sharpness |
| In-Game FFB Strength | 100 | (recommended in-game value) |

**Note on cross-source conflict:** SimRacingSetup F1 25 (June 2025) lists ClubSport DD at FFB 70, NDP 50, INT 11. Fanatec official (July 2025, newer) lists FFB 75, NDP 55, INT 10. The Fanatec page is more recent and is the official source — treat it as authoritative; the SimRacingSetup values are very close and likely based on an earlier version of the same Fanatec guidance.

### Fanatec ClubSport DD+ (Official)

| Parameter | Value |
|-----------|-------|
| SEN | 360° |
| FFB | 65 |
| FFS | 50% |
| NDP | 45 |
| NFR | Off |
| NIN | Off |
| INT | 10 |
| FEI | 100 |
| In-Game FFB Strength | 100 |

### Fanatec CSL DD / GT DD (Official)

| Parameter | Value |
|-----------|-------|
| SEN | 360° |
| FFB | 100 |
| FFS | PEAK |
| NDP | 35 |
| NFR | Off |
| NIN | Off |
| INT | 3 |
| FEI | 100 |
| In-Game FFB Strength | 80 |

### Fanatec Podium DD1 (Official)

| Parameter | Value |
|-----------|-------|
| SEN | 360° |
| FFB | 55 |
| FFS | PEAK |
| NDP | 15 |
| NFR | Off |
| NIN | Off |
| INT | 3 |
| FEI | 100 |

### Fanatec Podium DD2 (Official)

| Parameter | Value |
|-----------|-------|
| SEN | 360° |
| FFB | 50 |
| FFS | PEAK |
| NDP | 15 |
| NFR | Off |
| NIN | Off |
| INT | 2 |
| FEI | 100 |

---

## Section 3: Community Recommended Settings — Fanatec ClubSport DD

### SimRacingSetup (Community — Standard Profile)
Source: [simracingsetup.com F1 25 Fanatec](https://simracingsetup.com/ea-sports-f1/f1-25-fanatec-wheel-settings/)
Updated: June 10, 2025

**In-game settings:**

| Setting | ClubSport DD | ClubSport DD+ |
|---------|--------------|---------------|
| FFB Strength | 100 | 100 |
| On Track Effects | 30 | 30 |
| Rumble Strip Effects | 25 | 25 |
| Off Track Effects | 15 | 15 |
| Wheel Damper | 5 | 5 |
| Maximum Wheel Rotation | 360° | 360° |

**Tuning menu:**

| Parameter | ClubSport DD | ClubSport DD+ |
|-----------|--------------|---------------|
| SEN | 360° | 360° |
| FFB | 70 | 60 |
| FUL (FullForce) | 50% | 50% |
| NDP | 50 | 40 |
| NFR | Off | Off |
| NIN | Off | Off |
| INT | 11 | 11 |
| FEI | 100 | 100 |

### SimRacingSetup (Community — Esports / Pro Profile)
Source: [simracingsetup.com F1 25 Fanatec Esports](https://simracingsetup.com/ea-sports-f1/f1-25-fanatec-wheel-settings-esports/)
Updated: October 8, 2025

This profile reflects what top-tier sim drivers use — stripped of artificial effects for the cleanest signal.

**In-game settings (esports / pro):**

| Setting | ClubSport DD | ClubSport DD+ |
|---------|--------------|---------------|
| FFB Strength | 60–70 | 50–60 |
| On Track Effects | 0 | 0 |
| Rumble Strip Effects | 0 | 0 |
| Off Track Effects | 0 | 0 |
| Pit Stop Effects | 0 | 0 |
| Wheel Damper | 0–3 | 0–3 |
| Maximum Wheel Rotation | 300–360° | 300–360° |

**Tuning menu (esports / pro) — same hardware values as standard profile, lower in-game effects.**

---

## Section 4: ClubSport Wheelbase V2.5 — Gap Notice + Derived Guidance

**CONFIRMED GAP:** Neither Fanatec's official F1 25 settings page, SimRacingSetup, SimStaff, RacingGames.gg, nor any other tracked source provides dedicated F1 25 settings for the ClubSport Wheelbase V2.5 (belt-driven, 8Nm). The V2.5 is not covered by Fanatec's game-compatibility matrix for DD games.

**Why the gap exists:** Fanatec's newer F1 25 settings documentation covers DD-series bases only. The V2.5 predates the DD era and is architecturally different (dual-belt, ~8Nm peak vs 12–25Nm for DD bases). The FFS/FullForce mode does not exist on the V2.5. The V2.5 uses FFB/FOR rather than the FUL parameter.

### Derived V2.5 Guidance (community-inferred, NOT official)

The V2.5 has a similar max torque ceiling to the 8Nm power kit for the CSL DD. Using the CSL DD as the closest proxy is reasonable. The V2.5 also has its own NDP/INT/FEI parameters.

**Suggested starting point (community-derived, not verified from a V2.5-specific F1 25 source):**

| Parameter | Starting Value | Rationale |
|-----------|---------------|-----------|
| SEN | 360° | Standard F1 rotation — matches real car |
| FFB | 85–90 | V2.5 max ~8Nm; set higher than CSL DD's 100% since the CSL DD 8Nm kit is roughly equivalent |
| FFS | PEAK | V2.5 does not have FullForce mode; use PEAK |
| NDP | 25–35 | Moderate damping; closer to CSL DD range (35) than ClubSport DD (55) |
| NFR | Off | Clean signal preferred |
| NIN | Off | |
| INT | 3 | CSL DD proxy value; lower than ClubSport DD's 10 due to similar signal noise profile |
| FEI | 100 | Full effect sharpness |
| In-Game FFB Strength | 75–85 | Adjust to avoid clipping; V2.5 cannot sustain as high as the ClubSport DD |

**Calibration approach:** Start at these values, run 3–4 laps. If wheel feels sluggish or heavy on kerbs, lower NDP by 5. If wheel oscillates on straights, raise NDP by 5 or INT by 2. Use the in-game FFB Strength as the primary adjustment lever — raise until corners feel well-weighted, back off if you feel any "numb" flatness at high-speed corners (clipping indicator).

**Flag for app display:** Label this as derived/community guidance, not Fanatec official. Recommend users verify on their own rig and report.

---

## Section 5: Logitech G920 — Recommended Settings

### G Hub (PC Software) Settings
Source: Brian Koponen (May 28, 2025), SimRacingSetup G923 guide (May 26, 2025)

**Note:** The G920 uses Logitech G Hub on PC. On Xbox, G Hub is not available — the wheel operates at hardware defaults. These G Hub values apply to PC use only.

| G Hub Setting | Koponen (G920 PC) | SimRacingSetup (G923 — close proxy) | Notes |
|---------------|-------------------|-------------------------------------|-------|
| Operating Range | 900° | 900° | Set here, game controls actual range via SEN |
| Sensitivity | 50 | — | |
| Centering Spring | Off | — | Must be Off — Centering Spring fights the game's FFB |
| Torque | 100 | 100 | Let the game control overall strength |
| Audio Effects | — | 80 | |

**Critical G Hub note:** Centering Spring must be Off. If it is On, an artificial spring force fights the game's FFB signal, making the wheel feel floaty and disconnected.

### In-Game F1 25 Settings — G920 / G29
Source: Brian Koponen (May 28, 2025), SimRacingSetup G923 guide (G920 subsection, May 26, 2025)

| Setting | Koponen (G920) | SimRacingSetup (G920/G29 section) | Notes |
|---------|----------------|-----------------------------------|-------|
| Vibration & FFB | On | On | |
| FFB Strength | 90 | 125 | Koponen is more conservative; SRS higher for stronger feel |
| On Track Effects | 70 | 70 | |
| Rumble Strip Effects | 63 | 35 | Notable gap — Koponen allows more kerb buzz |
| Off Track Effects | 60 | 30 | Notable gap — Koponen runs much higher off-track |
| Pit Stop Effects | 50 | — | |
| Wheel Damper | 7 | — | |
| Maximum Wheel Rotation | 360° | 370° | |

**Gap analysis:** The Koponen and SimRacingSetup values diverge significantly on Rumble Strip Effects and Off Track Effects. This is a genuine preference split, not an error — Koponen prefers richer environmental feedback, SimRacingSetup leans toward cleaner signal. Neither is wrong. Test both ends and find your preference.

**Note on Xbox vs PC:** The G920 on Xbox does not go through G Hub. In-game values are the only tuning layer available. The same in-game settings apply; the wheel's hardware FFB profile is fixed.

**Gotcha (default values cause clipping):** Both sources note that F1 25's default settings for Logitech wheels can cause clipping — particularly FFB Strength. The G920's gear-driven mechanism maxes out faster than belt-driven or DD wheels. If the wheel feels heavy but "dead" in high-speed corners (like it stops building weight and flatlines), that is clipping — lower FFB Strength by 10.

---

## Section 6: Fanatec Tuning Menu Parameter Glossary

Reference: [Fanatec Tuning Menu FAQ](https://www.fanatec.com/eu/en/s/faq-what-can-be-set-wheel-tuning-menu)

| Parameter | Full Name | What It Does | Effect of Raising | Effect of Lowering |
|-----------|-----------|-------------|------------------|-------------------|
| SEN | Sensitivity | Sets wheel rotation range in degrees (90° to max, or AUTO) | More physical movement per steering input; finer control | Less movement required; faster but twitchier inputs |
| FFB | Force Feedback | Motor output strength as % of base torque rating | Stronger forces across the board | Weaker forces; safer from clipping on sensitive wheels |
| FFS | Force Feedback Scaling | Peak vs average force scaling mode | PEAK: scales to highest momentary forces. Linear: scales to average | — (mode select, not a scale) |
| FUL | FullForce (DD only) | Engages Fanatec's FullForce technology; % sets intensity | Higher % = stronger FullForce effects | Lower % = reduced FullForce, approaches legacy FFB behaviour |
| FOR | Force | Modifies directional force strength (100 = no change) | More force in each direction | Less directional force |
| NDP | Natural Damper | Velocity-proportional resistance; helps control oscillation and oversteer corrections | More wheel resistance; smoother but heavier | Less resistance; lighter, more responsive but may oscillate |
| NFR | Natural Friction | Constant mechanical steering friction (not velocity-dependent) | More friction throughout rotation | Less friction; lighter feel at all speeds |
| NIN | Natural Inertia | Simulates steering column mass / flywheel effect | Wheel resists rapid direction changes more | Wheel responds more immediately to inputs |
| INT | Interpolation | Signal smoothing filter (1–20 or OFF) | Higher = smoother signal, more lag, reduced high-freq noise | Lower = more raw/direct signal, may feel grainier |
| FEI | Force Effect Intensity | Sharpness/crispness of force effects | Sharper, more direct effects | Smoother, softer effects |
| SPR | Spring | Centering spring strength applied by hardware (100 = no mod) | More centring force | Less centring force |
| DPR | Damper | Hardware damper effect strength (100 = no mod) | More damping | Less damping |

---

## Section 7: Key Gaps and Uncertainties

| Gap | Status | Action for App |
|-----|--------|---------------|
| ClubSport Wheelbase V2.5 — no F1 25 official values | Confirmed gap | Display derived values (Section 4) clearly labelled as community-derived |
| Understeer Enhance — not listed by Fanatec official or some major community guides | Uncertain presence | Include in settings list, note it may not appear on all platforms/wheel configs |
| EA / Codemasters official F1 25 in-game setting descriptions | No official docs for F1 25 | Use F1 22 EA accessibility docs as proxy (confirmed architecturally stable) |
| G920 Xbox vs PC G Hub difference | Partially covered | Display G Hub settings with PC-only label |
| Pit Stop Effects mechanical detail | Very thin coverage — only known to be "pit stop vibrations" | Display at face value: vibration during pit stop, set to 0 for no effect |
| FFS mode difference (PEAK vs 50%) on ClubSport DD | Partially understood | ClubSport DD uses 50% which engages FullForce; CSL DD uses PEAK which is legacy scaling |

---

## Section 8: Cross-Source Value Summary (Quick Reference)

### In-Game Settings — Fanatec ClubSport DD

| Setting | Fanatec Official | SimRacingSetup Standard | SimRacingSetup Esports |
|---------|-----------------|------------------------|------------------------|
| FFB Strength | 100 | 100 | 60–70 |
| On Track Effects | (not specified) | 30 | 0 |
| Rumble Strip Effects | (not specified) | 25 | 0 |
| Off Track Effects | (not specified) | 15 | 0 |
| Wheel Damper | (not specified) | 5 | 0–3 |
| Max Wheel Rotation | 360° | 360° | 300–360° |

### In-Game Settings — Logitech G920

| Setting | Koponen | SimRacingSetup |
|---------|---------|----------------|
| FFB Strength | 90 | 125 |
| On Track Effects | 70 | 70 |
| Rumble Strip Effects | 63 | 35 |
| Off Track Effects | 60 | 30 |
| Wheel Damper | 7 | — |
| Max Wheel Rotation | 360° | 370° |

---

## Notes on F1 24 / Carry-Over Assumption

The Codemasters FFB architecture has been stable since F1 22. The setting names (On Track Effects, Rumble Strip Effects, Off Track Effects, Wheel Damper, Understeer Enhance) appear consistent across F1 22 → F1 24 → F1 25 based on multiple sources. F1 24 Fanatec recommended settings were NOT used to populate any values in this document — all hardware values above are sourced from F1 25-specific pages.

The in-game setting mechanical descriptions (what each does) are cross-checked against F1 22 official docs and Driver61 F1 2021 guide because no EA official F1 25 settings guide exists. The underlying physics model is consistent enough across years that this is acceptable for mechanistic explanations.
