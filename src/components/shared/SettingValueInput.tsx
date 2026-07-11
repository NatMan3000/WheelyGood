import type { Setting, SettingValue } from "../../types"

/*
  One input for any setting value type (enum select, numeric, AUTO-or-numeric).
  Shared by the profile editor and the dial-in view's inline value editor so
  the two never drift apart.
*/

interface SettingValueInputProps {
  setting: Setting
  value: SettingValue
  onChange: (v: SettingValue) => void
  autoFocus?: boolean
}

export default function SettingValueInput({
  setting,
  value,
  onChange,
  autoFocus = false,
}: SettingValueInputProps) {
  const vt = setting.valueType

  const inputClass =
    "rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 min-h-[44px] focus:border-accent outline-none text-white text-sm transition-colors duration-150 w-full"

  if (vt.kind === "enum") {
    return (
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        autoFocus={autoFocus}
      >
        {vt.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )
  }

  if (vt.kind === "numeric") {
    return (
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={vt.min}
          max={vt.max}
          step={vt.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputClass}
          autoFocus={autoFocus}
        />
        {vt.unit && (
          <span className="text-neutral-500 text-xs whitespace-nowrap">{vt.unit}</span>
        )}
      </div>
    )
  }

  // auto-or-numeric: text input accepting a number or "AUTO"
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        value={String(value)}
        placeholder="AUTO"
        autoFocus={autoFocus}
        onChange={(e) => {
          const raw = e.target.value.trim().toUpperCase()
          if (raw === "AUTO" || raw === "") {
            onChange("AUTO")
          } else {
            const n = Number(raw)
            if (!isNaN(n)) onChange(n)
            else onChange(e.target.value) // keep raw for intermediate typing
          }
        }}
        onBlur={(e) => {
          // Coerce on blur: empty → AUTO, numeric string → clamped number
          const raw = e.target.value.trim().toUpperCase()
          if (raw === "" || raw === "AUTO") {
            onChange("AUTO")
          } else {
            const n = Number(raw)
            if (!isNaN(n)) onChange(Math.min(Math.max(n, vt.min), vt.max))
            else onChange("AUTO")
          }
        }}
        className={inputClass}
      />
      {vt.unit && (
        <span className="text-neutral-500 text-xs whitespace-nowrap">{vt.unit}</span>
      )}
    </div>
  )
}
