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
      className={`rounded-lg bg-neutral-900 border border-neutral-800 p-3 ${
        isUp ? "border-l-4 border-l-emerald-500" : "border-l-4 border-l-red-500"
      }`}
    >
      <p className={`text-sm font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
        {isUp ? "Turn it UP ↑" : "Turn it DOWN ↓"}
      </p>
      <p className="text-neutral-300 text-sm mt-1">{highlightAcronyms(text)}</p>
    </div>
  )
}
