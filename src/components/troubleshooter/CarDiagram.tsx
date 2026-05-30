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

export default function CarDiagram({ activeArea, onSelectArea }: Props) {
  const isActive = (area: CarArea) => activeArea === area

  const zoneBase =
    "cursor-pointer transition-colors duration-150"

  // Stroke colour helper — returns inline style values
  function zoneStyle(area: CarArea): CSSProperties {
    return isActive(area)
      ? { fill: "var(--accent)", fillOpacity: 0.18, stroke: "var(--accent)", strokeWidth: 2 }
      : { fill: "#262626", fillOpacity: 1, stroke: "#525252", strokeWidth: 1.5 }
  }

  function labelStyle(area: CarArea): CSSProperties {
    return isActive(area) ? { fill: "var(--accent)", fontWeight: 700 } : { fill: "#a3a3a3" }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SVG car diagram — portrait, viewBox 200×320 */}
      <svg
        viewBox="0 0 200 320"
        className="w-full max-w-[240px]"
        aria-label="Car diagram — tap a zone to filter symptoms"
        role="img"
      >
        {/* ── Car body outline (decorative, not tappable) ── */}
        <rect
          x="42" y="50" width="116" height="220"
          rx="28" ry="28"
          fill="#171717" stroke="#3f3f46" strokeWidth="1.5"
        />

        {/* ── Front zone (front third + front wheels band) ── */}
        <g
          className={zoneBase}
          onClick={() => onSelectArea("front")}
          role="button"
          aria-label="Front"
          aria-pressed={isActive("front")}
        >
          {/* front wheels left */}
          <rect x="12" y="62" width="30" height="50" rx="8" style={zoneStyle("front")} />
          {/* front wheels right */}
          <rect x="158" y="62" width="30" height="50" rx="8" style={zoneStyle("front")} />
          {/* front body zone */}
          <rect x="42" y="50" width="116" height="75" rx="20" style={zoneStyle("front")} />
          <text x="100" y="93" textAnchor="middle" fontSize="10" style={labelStyle("front")}>
            Front
          </text>
        </g>

        {/* ── Rear zone (rear third + rear wheels band) ── */}
        <g
          className={zoneBase}
          onClick={() => onSelectArea("rear")}
          role="button"
          aria-label="Rear"
          aria-pressed={isActive("rear")}
        >
          {/* rear wheels left */}
          <rect x="12" y="208" width="30" height="50" rx="8" style={zoneStyle("rear")} />
          {/* rear wheels right */}
          <rect x="158" y="208" width="30" height="50" rx="8" style={zoneStyle("rear")} />
          {/* rear body zone */}
          <rect x="42" y="195" width="116" height="75" rx="20" style={zoneStyle("rear")} />
          <text x="100" y="237" textAnchor="middle" fontSize="10" style={labelStyle("rear")}>
            Rear
          </text>
        </g>

        {/* ── Steering zone (centre circle) ── */}
        <g
          className={zoneBase}
          onClick={() => onSelectArea("steering")}
          role="button"
          aria-label="Steering"
          aria-pressed={isActive("steering")}
        >
          <circle cx="100" cy="160" r="26" style={zoneStyle("steering")} />
          {/* steering wheel icon lines */}
          <line
            x1="100" y1="140" x2="100" y2="180"
            stroke={isActive("steering") ? "var(--accent)" : "#737373"}
            strokeWidth="2" strokeLinecap="round"
          />
          <line
            x1="80" y1="160" x2="120" y2="160"
            stroke={isActive("steering") ? "var(--accent)" : "#737373"}
            strokeWidth="2" strokeLinecap="round"
          />
          <text x="100" y="196" textAnchor="middle" fontSize="9" style={labelStyle("steering")}>
            Steering
          </text>
        </g>

        {/* ── Brakes zone — thin bands across all wheel areas ── */}
        <g
          className={zoneBase}
          onClick={() => onSelectArea("brakes")}
          role="button"
          aria-label="Brakes"
          aria-pressed={isActive("brakes")}
        >
          {/* front-left brake band */}
          <rect x="12" y="96" width="30" height="12" rx="4" style={zoneStyle("brakes")} />
          {/* front-right brake band */}
          <rect x="158" y="96" width="30" height="12" rx="4" style={zoneStyle("brakes")} />
          {/* rear-left brake band */}
          <rect x="12" y="212" width="30" height="12" rx="4" style={zoneStyle("brakes")} />
          {/* rear-right brake band */}
          <rect x="158" y="212" width="30" height="12" rx="4" style={zoneStyle("brakes")} />
          {/* label sits in a gap between front and steering */}
          <text x="100" y="124" textAnchor="middle" fontSize="9" style={labelStyle("brakes")}>
            Brakes
          </text>
        </g>

        {/* ── Overall zone — outer body ring ── */}
        <g
          className={zoneBase}
          onClick={() => onSelectArea("overall")}
          role="button"
          aria-label="Overall"
          aria-pressed={isActive("overall")}
        >
          <rect
            x="44" y="52" width="112" height="216"
            rx="26" ry="26"
            fill="none"
            stroke={isActive("overall") ? "var(--accent)" : "#525252"}
            strokeWidth={isActive("overall") ? 3 : 2}
            strokeDasharray="8 4"
          />
          <text x="100" y="280" textAnchor="middle" fontSize="9" style={labelStyle("overall")}>
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
