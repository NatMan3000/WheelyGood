import type { CSSProperties } from "react"
import type { CarArea } from "../../types"

const AREAS: { id: CarArea; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "rear", label: "Rear" },
  { id: "steering", label: "Steering" },
  { id: "brakes", label: "Brakes" },
  { id: "overall", label: "Overall" },
]

interface Props {
  activeArea: CarArea | null
  onSelectArea: (area: CarArea) => void
}

// viewBox: 200 × 340
// Car body: centred, nose-up (front at top)
// Body polygon: slightly tapered nose, rounded rect main body
// Wheels: rounded rects, sitting outside the body at each corner
// Zones: front / rear / steering (centre) / brakes (overlaid on wheel areas) / overall (dashed ring)

const ACCENT = "var(--accent)"
const INACTIVE_FILL = "#1f1f1f"
const INACTIVE_STROKE = "#404040"
const BODY_BG = "#141414"
const BODY_STROKE = "#2d2d2d"

export default function CarDiagram({ activeArea, onSelectArea }: Props) {
  const isActive = (area: CarArea) => activeArea === area

  function zoneFill(area: CarArea): CSSProperties {
    return isActive(area)
      ? {
          fill: ACCENT,
          fillOpacity: 0.15,
          stroke: ACCENT,
          strokeWidth: 2,
        }
      : {
          fill: INACTIVE_FILL,
          fillOpacity: 1,
          stroke: INACTIVE_STROKE,
          strokeWidth: 1.5,
        }
  }

  function labelFill(area: CarArea): string {
    return isActive(area) ? ACCENT : "#888"
  }

  function labelWeight(area: CarArea): string {
    return isActive(area) ? "700" : "400"
  }

  // Wheel geometry: 4 corners
  // Front-left, Front-right, Rear-left, Rear-right
  // Wheels are 26×46 rounded rects sitting outside the body at x=14 / x=160
  const wheelW = 26
  const wheelH = 44
  const wheelRx = 7
  const wheelLx = 14   // left column x
  const wheelRx2 = 160 // right column x
  const wheelFrontY = 64  // front axle top
  const wheelRearY = 220  // rear axle top

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SVG car diagram */}
      <svg
        viewBox="0 0 200 340"
        className="w-full max-w-[220px]"
        aria-label="Car diagram — tap a zone to filter symptoms"
        role="img"
      >
        {/* ── Static car body (background, non-interactive) ── */}
        {/* Main body — rounded rect */}
        <rect
          x="44" y="52" width="112" height="232"
          rx="22" ry="22"
          fill={BODY_BG}
          stroke={BODY_STROKE}
          strokeWidth="1.5"
        />
        {/* Nose taper overlay — narrows the front end */}
        <polygon
          points="44,74 56,52 144,52 156,74"
          fill={BODY_BG}
          stroke="none"
        />
        {/* Windscreen line */}
        <line
          x1="58" y1="100" x2="142" y2="100"
          stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round"
        />
        {/* Rear screen line */}
        <line
          x1="58" y1="236" x2="142" y2="236"
          stroke="#2a2a2a" strokeWidth="5" strokeLinecap="round"
        />

        {/* ── Front zone ─────────────────────────────────────────────── */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectArea("front")}
          role="button"
          aria-label="Front"
          aria-pressed={isActive("front")}
        >
          {/* front-left wheel */}
          <rect
            x={wheelLx} y={wheelFrontY}
            width={wheelW} height={wheelH}
            rx={wheelRx}
            style={zoneFill("front")}
          />
          {/* front-right wheel */}
          <rect
            x={wheelRx2} y={wheelFrontY}
            width={wheelW} height={wheelH}
            rx={wheelRx}
            style={zoneFill("front")}
          />
          {/* front body section */}
          <rect
            x="44" y="52" width="112" height="88"
            rx="20" ry="20"
            style={zoneFill("front")}
          />
          <text
            x="100" y="88"
            textAnchor="middle"
            fontSize="11"
            fill={labelFill("front")}
            fontWeight={labelWeight("front")}
          >
            Front
          </text>
        </g>

        {/* ── Rear zone ──────────────────────────────────────────────── */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectArea("rear")}
          role="button"
          aria-label="Rear"
          aria-pressed={isActive("rear")}
        >
          {/* rear-left wheel */}
          <rect
            x={wheelLx} y={wheelRearY}
            width={wheelW} height={wheelH}
            rx={wheelRx}
            style={zoneFill("rear")}
          />
          {/* rear-right wheel */}
          <rect
            x={wheelRx2} y={wheelRearY}
            width={wheelW} height={wheelH}
            rx={wheelRx}
            style={zoneFill("rear")}
          />
          {/* rear body section */}
          <rect
            x="44" y="196" width="112" height="88"
            rx="20" ry="20"
            style={zoneFill("rear")}
          />
          <text
            x="100" y="250"
            textAnchor="middle"
            fontSize="11"
            fill={labelFill("rear")}
            fontWeight={labelWeight("rear")}
          >
            Rear
          </text>
        </g>

        {/* ── Steering zone — cabin centre circle ──────────────────────── */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectArea("steering")}
          role="button"
          aria-label="Steering"
          aria-pressed={isActive("steering")}
        >
          <circle cx="100" cy="168" r="28" style={zoneFill("steering")} />
          {/* Steering wheel cross */}
          <line
            x1="100" y1="150" x2="100" y2="186"
            stroke={isActive("steering") ? ACCENT : "#555"}
            strokeWidth="2.5" strokeLinecap="round"
          />
          <line
            x1="82" y1="168" x2="118" y2="168"
            stroke={isActive("steering") ? ACCENT : "#555"}
            strokeWidth="2.5" strokeLinecap="round"
          />
          <text
            x="100" y="210"
            textAnchor="middle"
            fontSize="10"
            fill={labelFill("steering")}
            fontWeight={labelWeight("steering")}
          >
            Steering
          </text>
        </g>

        {/* ── Brakes zone — thin discs at each wheel ───────────────────── */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectArea("brakes")}
          role="button"
          aria-label="Brakes"
          aria-pressed={isActive("brakes")}
        >
          {/* front-left disc band */}
          <rect
            x={wheelLx} y={wheelFrontY + wheelH - 14}
            width={wheelW} height={10}
            rx="4"
            style={zoneFill("brakes")}
          />
          {/* front-right disc band */}
          <rect
            x={wheelRx2} y={wheelFrontY + wheelH - 14}
            width={wheelW} height={10}
            rx="4"
            style={zoneFill("brakes")}
          />
          {/* rear-left disc band */}
          <rect
            x={wheelLx} y={wheelRearY + 4}
            width={wheelW} height={10}
            rx="4"
            style={zoneFill("brakes")}
          />
          {/* rear-right disc band */}
          <rect
            x={wheelRx2} y={wheelRearY + 4}
            width={wheelW} height={10}
            rx="4"
            style={zoneFill("brakes")}
          />
          {/* Label: left side, mid-height, clear of other labels */}
          <text
            x="27" y="156"
            textAnchor="middle"
            fontSize="9"
            fill={labelFill("brakes")}
            fontWeight={labelWeight("brakes")}
          >
            Brakes
          </text>
        </g>

        {/* ── Overall zone — dashed outer ring ─────────────────────────── */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectArea("overall")}
          role="button"
          aria-label="Overall"
          aria-pressed={isActive("overall")}
        >
          <rect
            x="42" y="50" width="116" height="236"
            rx="24" ry="24"
            fill="none"
            stroke={isActive("overall") ? ACCENT : "#484848"}
            strokeWidth={isActive("overall") ? 2.5 : 1.5}
            strokeDasharray="7 4"
          />
          <text
            x="100" y="308"
            textAnchor="middle"
            fontSize="10"
            fill={labelFill("overall")}
            fontWeight={labelWeight("overall")}
          >
            Overall
          </text>
        </g>
      </svg>

      {/* ── Accessible text-button fallback row ── */}
      <div className="flex flex-wrap justify-center gap-2">
        {AREAS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSelectArea(id)}
            className={[
              "rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-150",
              isActive(id)
                ? "bg-accent text-black border-accent"
                : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-accent",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
