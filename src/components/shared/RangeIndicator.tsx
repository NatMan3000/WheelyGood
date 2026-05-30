import type { ValueType } from "../../types"

export default function RangeIndicator({ valueType }: { valueType: ValueType }) {
  if (valueType.kind === "enum") {
    return (
      <div className="flex flex-wrap gap-2">
        {valueType.options.map((option) => (
          <span
            key={option}
            className={
              option === valueType.default
                ? "rounded-full px-3 py-1 text-sm bg-accent text-black"
                : "rounded-full px-3 py-1 text-sm bg-neutral-800 text-neutral-300"
            }
          >
            {option}
          </span>
        ))}
      </div>
    )
  }

  const { min, max, unit } = valueType
  const defaultValue = valueType.default

  const label = (n: number) => (unit ? `${n}${unit}` : String(n))

  if (valueType.kind === "auto-or-numeric" && defaultValue === "AUTO") {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-center">
          <span className="bg-accent text-black rounded px-2 text-xs">AUTO</span>
        </div>
        <div className="h-2 rounded-full bg-neutral-800" />
        <div className="flex justify-between text-xs text-neutral-400">
          <span>{label(min)}</span>
          <span>{label(max)}</span>
        </div>
      </div>
    )
  }

  // numeric default — applies to both "numeric" and "auto-or-numeric" with a number default
  const numericDefault = defaultValue as number
  const pct = ((numericDefault - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-2 rounded-full bg-neutral-800">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-neutral-400">
        <span>{label(min)}</span>
        <span>{label(max)}</span>
      </div>
    </div>
  )
}
