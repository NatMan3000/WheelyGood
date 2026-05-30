---
type: reference
title: Forza Horizon 6 — Advanced Wheel & Force Feedback Settings
status: draft
created: 2026-05-30
sources:
  - https://support.forza.net/hc/en-us/articles/51642814113427 (403 — content recovered via search snippets)
  - https://www.briankoponen.com/forza-horizon-6-logitech-g29-g920-settings/
  - https://skycoach.gg/blog/forza-horizon-6/articles/best-wheel-settings
  - https://simgasm.com/blogs/blog/fh6-fanatec-wheel-settings-baseline-tuning-menu-advanced-wheel
  - https://www.gamer.org/stop-spinning-out-in-forza-horizon-6-with-these-custom-wheel-settings/
---

# Forza Horizon 6 — Advanced Wheel & Force Feedback Settings

> **UPDATE 2026-05-30 — full official article obtained** (Nathan pasted it directly). It supersedes the search-snippet reconstruction below. Corrections applied to `src/data/games/forza-horizon-6.ts`:
> - **No "Off-Road Feel Scale"** in FH6 — the official Advanced Wheel Settings list has only **Road Feel Scale**. Removed.
> - **No in-game "Steering Rotation" slider** — rotation is set by the wheel driver / on-wheel SEN; in-game you change the ratio via **Steering Sensitivity**. Removed.
> - **Steering Sensitivity DOES use a soft lock** (the third-party guides claiming "no soft lock" were wrong). Forza's advice: set rotation on the wheel, only touch this slider if the wheel can't set rotation.
> - **Force Feedback Scale default is a neutral value** (not max) — increasing risks clipping.
> - **G920 tip (official):** turn **Wheel Damper** and **Center Spring** DOWN on low-torque wheels (G920/G29) for more tyre feel; DD wheels benefit from some damper. Encoded as setup recommendations.
> - Added **Normal vs Simulation steering**, **Steering Axis Deadzone Outside**, **Steering Axis Invert**. Per-pedal axis deadzones exist but aren't catalogued (rarely adjusted).
> - `Force Feedback Minimum Force` = pneumatic trail scalar (onset-of-slip cue), NOT a force floor.

## Source notes

The canonical source is the official Forza Support article:
**https://support.forza.net/hc/en-us/articles/51642814113427-Forza-Horizon-6-on-Wheel-Advanced-Wheel-Tuning**

That article returned HTTP 403 on direct fetch. All official descriptions below were recovered from Google search snippets that quote the article verbatim, cross-verified across 4–5 third-party guides that reproduce the same language. Where a description could not be confirmed from an authoritative source, this is flagged explicitly.

---

## Menu Path

**Settings → Advanced Controls**

Note: One source (gamer.org) states the menu must be accessed *using the steering wheel itself* to display all wheel-specific options — controller-only input may hide some entries. This is consistent with how prior Forza titles behaved.

---

## Setting Groups

### 1. Steering Input Settings

| Setting | Range | Default | Unit | Description |
|---------|-------|---------|------|-------------|
| **Steering Axis Deadzone Inside** | 0–100 | ~0 | % | Inner deadzone threshold. Larger = more wheel movement required before the car begins to turn. Raise if steering registers at rest. |
| **Steering Axis Deadzone Outside** | 0–100 | ~100 | % | Outer deadzone. Larger = less wheel rotation needed to reach full lock. Lower if you can't reach full steering angle. |
| **Steering Linearity** | 0–100 | 50 | — | Adjusts the input curve. 50 = linear mapping. Below 50 = more precision near centre, less near lock. Above 50 = more precision near lock, less near centre. |
| **Steering Sensitivity** | 0.0–1.0 (implied) | ~0.5 | — | Adjusts the ratio of your wheel's degree of rotation (DOR) to the car's actual front wheel steering angle. Higher = more responsive (lower effective steering ratio). Lower = less responsive (higher steering ratio). Does NOT provide soft lock — you can still turn the wheel past the car's physical lock. |
| **Steering Rotation** | ~360–1080° | 720° | degrees | Sets how many degrees of physical wheel rotation map to full lock-to-lock. 720–900° is recommended for road racing; 540° suits drifting. |
| **Steering Lock Multiplier** | 0.5–2.0 (unconfirmed range) | 1.00 | × | **Unconfirmed from authoritative source.** Present in some third-party guides. Likely multiplies the car's steering lock angle. Cannot confirm exact range or default from available sources. |
| **Steering Speed Sensitivity** | 0.5–2.0 (unconfirmed range) | 1.00 | × | **Unconfirmed from authoritative source.** Present in some third-party guides. Likely reduces effective steering angle at higher speeds. Cannot confirm exact range from available sources. |
| **Invert Vertical Look** | On / Off | Off | toggle | Inverts vertical look axis. Wheel-irrelevant in practice. |
| **Vibration** | On / Off | On | toggle | Master toggle for gamepad/wheel vibration (distinct from Vibration Scale). |

---

### 2. Force Feedback Settings

All descriptions below are sourced from the official Forza Support article (recovered via search snippets).

| Setting | Range | Default | Unit | Description |
|---------|-------|---------|------|-------------|
| **Force Feedback Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~1.0 | × | Sets overall FFB strength — scales ALL forces sent to the wheel including spring and damper. Increase carefully: too high clips the signal and destroys fidelity. The primary "how strong does the wheel feel" knob. |
| **Invert Force Feedback** | On / Off | Off | toggle | Reverses FFB direction. Use if your wheel pulls toward the direction you're turning instead of resisting it. Required by some wheel firmware/setups. |
| **Center Spring Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~1.0 | × | Sets the dynamic centering force (caster, KPI, scrub radius). The spring ramps *down* with cornering load, slip and speed so that align torque from the tires dominates when driving hard. Too low = steering oscillation. Too high = masks tire-feel from the tires. |
| **Wheel Damper Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~0.5 | × | Simulates mechanical steering friction. Dynamic — allows fluid movement without constant resistance. Higher = heavier, more sluggish steering feel. Lower = lighter. Some guides report this has minimal perceptible effect on some hardware. |
| **Mechanical Trail Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~1.0 | × | Scales mechanical trail (a force that turns the wheels toward the direction of travel — a smooth, strong following force). Controls how *light* the wheel gets during understeer. High values are good for drifting but can mask lockup and understeer feel. Lower values increase sensitivity to traction loss. |
| **Force Feedback Minimum Force** | 0.0–10.0 (practical: 0.0–2.0) | ~0.5 | × | Scales *pneumatic trail* — the dynamic lever arm from the moving tire contact patch. Pneumatic trail decreases as the tire slips (giving you understeer/lockup onset feel). Scaling down reduces these dynamic tire deformation effects. Can feel "peaky" at high values due to rapid rise and fall at the traction limit. |
| **Force Feedback Load Sensitivity** | 0.0–10.0 (practical: 0.0–2.0) | ~0.5 | × | Scales medium-frequency forces from road elevation changes, oscillations and bounces. Lower = smoother experience, less fidelity. Lowering this effectively *widens the dynamic range* available when Force Feedback Scale is pushed high — prevents the signal from peaking constantly in corners. |
| **Road Feel Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~0.5 | × | Scales high-frequency load inputs from road surface texture and bumps. Amplifies high-frequency detail while leaving low-frequency cornering forces alone. Distinct from Vibration Scale (which is tactile, not a physical force). |
| **Off-Road Feel Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~0.2 | × | Same as Road Feel Scale but applies when not on tarmac surfaces. Controls vibration/texture feel on dirt, gravel, grass etc. |
| **Vibration Scale** | 0.0–10.0 (practical: 0.0–2.0) | ~0.5 | × | Sets vibration intensity used as a *tactile* signal (distinct from physical FFB forces). You feel vibration when overusing tires or during a collision. Turning this down does NOT reduce road feel (which is a physical force). |

---

### 3. Pedal / Axis Deadzone Settings

| Setting | Range | Default | Unit | Description |
|---------|-------|---------|------|-------------|
| **Acceleration Axis Deadzone Inside** | 0–100 | 0 | % | Inner throttle deadzone. Larger = more pedal travel before acceleration begins. Raise if throttle registers at rest. |
| **Acceleration Axis Deadzone Outside** | 0–100 | 100 | % | Outer throttle deadzone. Smaller = less pedal travel to reach 100% throttle. |
| **Acceleration Axis Invert** | On / Off | Off | toggle | Reverses throttle axis direction. |
| **Deceleration Axis Deadzone Inside** | 0–100 | 0 | % | Inner brake deadzone. |
| **Deceleration Axis Deadzone Outside** | 0–100 | 100 | % | Outer brake deadzone. |
| **Clutch Axis Deadzone Inside** | 0–100 | ~15 | % | Inner clutch deadzone. |
| **Clutch Axis Deadzone Outside** | 0–100 | ~90 | % | Outer clutch deadzone. |
| **E-Brake Axis Deadzone Inside** | 0–100 | ~10 | % | Inner handbrake deadzone. |
| **E-Brake Axis Deadzone Outside** | 0–100 | 100 | % | Outer handbrake deadzone. |
| **Handbrake Axis Invert** | On / Off | Off | toggle | Reverses handbrake axis direction. |

---

## Settings That Do NOT Exist in FH6

| Name | Status | Notes |
|------|--------|-------|
| **Force Feedback Understeer** | **Does not exist** | No source — official or community — lists a setting by this name. Understeer feel is controlled via *Mechanical Trail Scale* (wheel lightens during understeer) and *Force Feedback Minimum Force* (pneumatic trail drops at slip limit). |
| **Force Feedback Minimum Force** | **Exists** — confirmed | Despite the name, this is a real FH6 setting (it's the pneumatic trail scalar). |
| **Soft Lock** | **Not available** | FH6 does not implement soft lock. The wheel can be physically rotated past the car's steering lock. Steering Sensitivity can limit effective steering angle but there is no true soft lock stop. |

---

## On-Wheel Tuning (the article title angle)

The official article is titled "on-wheel advanced wheel tuning" — this refers to the in-game advanced controls menu accessed *while a wheel is connected*, not hardware-level buttons on the wheel rim itself.

**Key points confirmed:**
- FH6 does NOT expose a per-car hardware-level tuning interface through the wheel buttons (like some sim titles).
- The "on-wheel" in the title means: settings that become visible / available in the Advanced Controls menu specifically when a steering wheel input device is detected.
- Hardware tuning (e.g., Fanatec tuning menu — SEN, FF, NDP, NFR, INT, FEI) is done separately in the wheel's own software/firmware menu, outside the game.

---

## Confidence Summary

| Category | Confidence | Basis |
|----------|-----------|-------|
| Setting names | High | Consistent across 5+ independent sources + official search snippets |
| Official descriptions | High (for FFB group) | Verbatim from official article via search snippets |
| Value ranges | Medium | 0–100 for deadzones confirmed; FFB scalar ranges inferred from community guides (official article doesn't state numeric ranges explicitly) |
| Default values | Low–Medium | Official article doesn't state defaults explicitly; values are community consensus from guides |
| Steering Lock Multiplier / Steering Speed Sensitivity | Low | Present in one guide; not confirmed from official source or multiple independent guides |
| On-wheel tuning | Medium | Inferred from article title + consistent with FH5 behaviour; no explicit statement found |
