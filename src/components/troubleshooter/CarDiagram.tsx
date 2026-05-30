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

// Hybrid diagram: grayscale top-down car photo (public/car-topdown.png) as the
// base, with a theme-aware SVG overlay (viewBox 0–100) whose zones TRACE the
// real components — four wheels for brakes, the rack + centre crosshair for
// steering, the body halves for front/rear. Glow uses var(--accent) so it
// follows the active theme. Coordinates mapped to the car's position.

export default function CarDiagram({ activeArea, onSelectArea }: Props) {
  // Style for an active vs idle zone. `traced` zones (wheels/rack/crosshair)
  // lean on stroke + glow; body zones get a soft fill too.
  const zoneStyle = (area: CarArea, filled: boolean): CSSProperties => {
    const active = activeArea === area
    return {
      fill: active && filled ? "var(--accent)" : "transparent",
      fillOpacity: active && filled ? 0.16 : 0,
      stroke: active ? "var(--accent)" : "transparent",
      strokeWidth: 1.4,
      filter: active ? "drop-shadow(0 0 4px var(--accent)) drop-shadow(0 0 8px var(--accent))" : "none",
      pointerEvents: "all",
      cursor: "pointer",
      transition: "fill-opacity 150ms ease, stroke 150ms ease, filter 150ms ease",
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[340px] aspect-square">
        <img
          src="/car-topdown.png"
          alt="Top-down view of a car — tap an area"
          className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none"
          draggable={false}
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-label="Car area selector"
        >
          {/* Overall — dashed ring tracing the car perimeter (stroke only) */}
          <rect
            x={31}
            y={14}
            width={38}
            height={73}
            rx={14}
            onClick={() => onSelectArea("overall")}
            style={{
              fill: "transparent",
              stroke: activeArea === "overall" ? "var(--accent)" : "transparent",
              strokeWidth: 1.6,
              strokeDasharray: "3 2",
              filter:
                activeArea === "overall"
                  ? "drop-shadow(0 0 4px var(--accent)) drop-shadow(0 0 8px var(--accent))"
                  : "none",
              pointerEvents: "stroke",
              cursor: "pointer",
              transition: "stroke 150ms ease, filter 150ms ease",
            }}
          />

          {/* Front body half */}
          <rect
            x={37}
            y={16}
            width={26}
            height={31}
            rx={6}
            onClick={() => onSelectArea("front")}
            style={zoneStyle("front", true)}
          />

          {/* Rear body half */}
          <rect
            x={37}
            y={50}
            width={26}
            height={36}
            rx={6}
            onClick={() => onSelectArea("rear")}
            style={zoneStyle("rear", true)}
          />

          {/* Brakes — trace the four wheels */}
          <g onClick={() => onSelectArea("brakes")} style={zoneStyle("brakes", true)}>
            <rect x={30} y={18} width={7} height={10} rx={2.5} />
            <rect x={63} y={18} width={7} height={10} rx={2.5} />
            <rect x={30} y={62} width={7} height={10} rx={2.5} />
            <rect x={63} y={62} width={7} height={10} rx={2.5} />
          </g>

          {/* Steering — trace the rack + centre crosshair (drawn last → wins centre clicks) */}
          <g onClick={() => onSelectArea("steering")} style={zoneStyle("steering", true)}>
            {/* steering rack across the front axle */}
            <rect x={37} y={21} width={26} height={3.6} rx={1.8} />
            {/* centre crosshair ring */}
            <circle cx={50} cy={47} r={6} style={{ fill: "transparent" }} />
            <line x1={50} y1={42} x2={50} y2={52} strokeWidth={1} />
            <line x1={45} y1={47} x2={55} y2={47} strokeWidth={1} />
          </g>
        </svg>
      </div>

      {/* Accessible / reliable fallback selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {AREAS.map((a) => {
          const active = activeArea === a.id
          return (
            <button
              key={a.id}
              onClick={() => onSelectArea(a.id)}
              className={
                "rounded-full px-4 min-h-[44px] text-sm transition-colors duration-150 " +
                (active
                  ? "bg-accent text-black font-medium"
                  : "border border-neutral-700 text-neutral-300 hover:border-accent")
              }
            >
              {a.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
