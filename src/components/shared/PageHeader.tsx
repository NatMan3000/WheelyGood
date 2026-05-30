import type { ReactNode } from "react"

/*
  One consistent page header across the four main tabs: same title scale
  (text-3xl), same weight, same subtitle treatment, same spacing. Optional
  `actions` slot renders right-aligned (e.g. Saves' New/Import/Compare).
*/
export default function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="text-neutral-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  )
}
