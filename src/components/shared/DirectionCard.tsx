import { highlightAcronyms } from "../../utils/highlightAcronyms"

export default function DirectionCard({
  direction,
  text,
}: {
  direction: "up" | "down"
  text: string
}) {
  const isUp = direction === "up"

  return (
    <div
      className={[
        "rounded-lg border p-3.5",
        isUp
          ? "border-emerald-500/30 bg-emerald-500/[0.07]"
          : "border-red-500/30 bg-red-500/[0.07]",
      ].join(" ")}
    >
      <p
        className={[
          "flex items-center gap-2 text-sm font-semibold",
          isUp ? "text-emerald-400" : "text-red-400",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs",
            isUp ? "bg-emerald-500/20" : "bg-red-500/20",
          ].join(" ")}
        >
          {isUp ? "↑" : "↓"}
        </span>
        Turn it {isUp ? "up" : "down"}
      </p>
      <p className="text-neutral-300 text-sm mt-2">{highlightAcronyms(text)}</p>
    </div>
  )
}
