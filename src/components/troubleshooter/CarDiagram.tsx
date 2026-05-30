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

// Hybrid diagram: a grayscale top-down car photo (public/car-topdown.png) as the
// base, with a theme-aware SVG overlay (viewBox 0–100) whose zones glow in the
// active accent. Zone coordinates are mapped to the car's position in the image.

export default function CarDiagram({ activeArea, onSelectArea }: Props) {
  // Shared props for a clickable zone shape (transparent until active).
  const zoneProps = (area: CarArea) => {
    const active = activeArea === area
    return {
      onClick: () => onSelectArea(area),
      className: "cursor-pointer transition-all duration-150",
      style: {
        fill: active ? "var(--accent)" : "transparent",
        fillOpacity: active ? 0.18 : 0,
        stroke: active ? "var(--accent)" : "transparent",
        strokeWidth: 1.4,
        filter: active ? "drop-shadow(0 0 5px var(--accent))" : "none",
        pointerEvents: "all" as const,
      },
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
          {/* Overall — dashed ring around the whole car (stroke only, no fill block) */}
          <rect
            x={25}
            y={9}
            width={50}
            height={83}
            rx={14}
            onClick={() => onSelectArea("overall")}
            className="cursor-pointer transition-all duration-150"
            style={{
              fill: "transparent",
              stroke: activeArea === "overall" ? "var(--accent)" : "transparent",
              strokeWidth: 1.6,
              strokeDasharray: "3 2",
              filter: activeArea === "overall" ? "drop-shadow(0 0 5px var(--accent))" : "none",
              pointerEvents: "stroke" as const,
            }}
          />
          {/* Front body */}
          <rect x={31} y={13} width={38} height={35} rx={7} {...zoneProps("front")} />
          {/* Rear body */}
          <rect x={31} y={52} width={38} height={37} rx={7} {...zoneProps("rear")} />
          {/* Brakes — four wheels */}
          <g {...zoneProps("brakes")}>
            <rect x={24.5} y={23} width={8} height={12} rx={2.5} />
            <rect x={67.5} y={23} width={8} height={12} rx={2.5} />
            <rect x={24.5} y={66} width={8} height={12} rx={2.5} />
            <rect x={67.5} y={66} width={8} height={12} rx={2.5} />
          </g>
          {/* Steering — centre, drawn last so it wins clicks in the middle */}
          <circle cx={50} cy={50} r={9} {...zoneProps("steering")} />
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
