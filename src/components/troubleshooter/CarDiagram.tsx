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

// Baked-image diagram: a grayscale base plus one pre-rendered lime-glow image
// per zone (public/car-{base,front,rear,steering,brakes,overall}.png — same car,
// pixel-aligned). The active zone's image crossfades in over the base. A
// transparent SVG hit-map handles taps (coordinates measured against the image).
//
// NOTE: the glow colour is baked into these images (lime). Unlike the SVG
// overlay, this does NOT follow the accent theme — the car always glows lime.
// Chosen deliberately for the richer rendered look.

const ZONE_IMAGES: { area: CarArea; src: string }[] = [
  { area: "front", src: "/car-front.png" },
  { area: "rear", src: "/car-rear.png" },
  { area: "steering", src: "/car-steering.png" },
  { area: "brakes", src: "/car-brakes.png" },
  { area: "overall", src: "/car-overall.png" },
]

export default function CarDiagram({ activeArea, onSelectArea }: Props) {
  const hit = (area: CarArea) => ({
    onClick: () => onSelectArea(area),
    style: { fill: "transparent", pointerEvents: "all" as const, cursor: "pointer" },
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[340px] aspect-square">
        {/* Grayscale base (always shown) */}
        <img
          src="/car-base.png"
          alt="Top-down view of a car — tap an area"
          className="absolute inset-0 h-full w-full object-contain select-none"
          draggable={false}
        />
        {/* Pre-rendered glow images, crossfaded in when their zone is active */}
        {ZONE_IMAGES.map(({ area, src }) => (
          <img
            key={area}
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain select-none transition-opacity duration-200"
            style={{ opacity: activeArea === area ? 1 : 0 }}
            draggable={false}
          />
        ))}
        {/* Transparent hit-map for taps (measured to the car's wheels/body) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-label="Car area selector"
        >
          {/* Overall — dashed ring perimeter (stroke clickable) */}
          <rect
            x={31}
            y={14}
            width={38}
            height={73}
            rx={14}
            onClick={() => onSelectArea("overall")}
            style={{ fill: "transparent", stroke: "transparent", strokeWidth: 4, pointerEvents: "stroke", cursor: "pointer" }}
          />
          <rect x={39} y={16} width={22} height={31} rx={6} {...hit("front")} />
          <rect x={39} y={50} width={22} height={36} rx={6} {...hit("rear")} />
          <g {...hit("brakes")}>
            <rect x={31} y={15} width={9} height={13} rx={3} />
            <rect x={60} y={15} width={9} height={13} rx={3} />
            <rect x={31} y={62} width={9} height={13} rx={3} />
            <rect x={60} y={62} width={9} height={13} rx={3} />
          </g>
          {/* Steering — centre, drawn last → wins centre clicks */}
          <circle cx={50} cy={49} r={9} {...hit("steering")} />
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
