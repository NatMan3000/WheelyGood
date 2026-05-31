# Settings still pending verification

**As of 2026-05-31, the `unverified` / "Draft" flag was bulk-cleared from all data files** so no Draft badges show in the app. This file records which settings were *still draft* at that point — i.e. Kai-authored values that had **not** been confirmed against the real on-wheel / in-game menus. Re-check these against the physical hardware or game when convenient.

**Already verified before the clear (NOT in this list):** all 14 Fanatec ClubSport DD settings + 7 of 9 Fanatec V2.5 settings — confirmed in the 2026-05-30 research pass against the Fanatec Wheel Tuning Menu FAQ.

43 of 64 settings were still draft. Grouped by category:

## Wheel base (5)

| Code | Setting | id |
|------|---------|----|
| SHO | Shock / Vibration Intensity | `fanatec-v25-sho` |
| DRI | Drift Mode | `fanatec-v25-dri` |
| Rotation | Steering Rotation / Operating Range | `logitech-g920-rotation` |
| FFB | Force Feedback Strength | `logitech-g920-ffb-strength` |
| — | Centering Spring / Return Strength | `logitech-g920-centering-spring` |

## Pedals (9)

| Code | Setting | id |
|------|---------|----|
| BRF | Brake Force | `csp-v3-brf` |
| — | Brake Pedal Vibration (ABS Motor) | `csp-v3-brake-vibration` |
| — | Throttle Pedal Vibration | `csp-v3-throttle-vibration` |
| — | Brake Elastomer / Performance Kit Firmness | `csp-v3-brake-performance-kit` |
| BRF | Brake Force | `csl-elite-pedals-v2-brf` |
| — | Pedal Vibration — Not Available | `csl-elite-pedals-v2-no-vibration` |
| — | Throttle & Clutch Sensor Type | `csl-elite-pedals-v2-throttle-hall` |
| — | Brake Elastomer Firmness | `csl-elite-pedals-v2-brake-performance-kit` |
| — | Brake Pedal Behaviour (Non-Linear by Design) | `logitech-g920-brake-linearity` |

## Shifter (3)

| Setting | id |
|---------|----|
| Shift Mode (H-Pattern / Sequential) | `fanatec-shifter-mode` |
| Shift Throw Resistance | `fanatec-shifter-resistance` |
| In-Game Gear / Clutch Assignment | `fanatec-shifter-ingame-assignment` |

## Handbrake (3)

| Setting | id |
|---------|----|
| Mount Orientation | `fanatec-handbrake-mount` |
| Analog vs Button / Digital Mode | `fanatec-handbrake-mode` |
| In-Game Handbrake Sensitivity / Deadzone | `fanatec-handbrake-sensitivity` |

## In-game — Forza Horizon 6 (15)

| Setting | id |
|---------|----|
| Force Feedback Scale | `fh6-ffb-scale` |
| Steering (Normal vs Simulation) | `fh6-steering-assist` |
| Center Spring Scale | `fh6-center-spring-scale` |
| Wheel Damper Scale | `fh6-wheel-damper-scale` |
| Mechanical Trail Scale | `fh6-mechanical-trail-scale` |
| Force Feedback Minimum Force | `fh6-ffb-minimum-force` |
| Load Sensitivity | `fh6-ffb-load-sensitivity` |
| Road Feel Scale | `fh6-road-feel-scale` |
| Vibration Scale | `fh6-vibration-scale` |
| Steering Sensitivity | `fh6-steering-sensitivity` |
| Steering Linearity | `fh6-steering-linearity` |
| Steering Axis Deadzone Inside | `fh6-steering-deadzone-inside` |
| Steering Axis Deadzone Outside | `fh6-steering-deadzone-outside` |
| Steering Axis Invert | `fh6-steering-axis-invert` |
| Invert Force Feedback | `fh6-invert-ffb` |

## In-game — F1 25 (8)

| Setting | id |
|---------|----|
| Vibration & Force Feedback | `f125-ffb-master` |
| On Track Effects | `f125-on-track-effects` |
| Rumble Strip Effects | `f125-rumble-strip-effects` |
| Off Track Effects | `f125-off-track-effects` |
| Pit Stop Effects | `f125-pit-stop-effects` |
| Wheel Damper | `f125-wheel-damper` |
| Understeer Enhance | `f125-understeer-enhance` |
| Maximum Wheel Rotation | `f125-max-wheel-rotation` |

---

## Re-flagging a setting later

The `unverified?: boolean` field still exists on the `Setting` type (`src/types/index.ts`) and the badge render in `SettingCard.tsx` is unchanged. To re-flag a specific setting as draft, add `unverified: true,` back to its entry in the relevant `src/data/` file — the badge returns for that one setting.
