import { useState } from "react"
import { usePageTitle } from "../hooks/usePageTitle"
import type { CarArea } from "../types"
import CarDiagram from "../components/troubleshooter/CarDiagram"
import SymptomList from "../components/troubleshooter/SymptomList"
import PageHeader from "../components/shared/PageHeader"
import Icon from "../components/shared/Icon"
import { symptoms, symptomsByArea } from "../data/symptoms/symptoms"

export default function TroubleshooterPage() {
  usePageTitle("Troubleshooter")
  const [activeArea, setActiveArea] = useState<CarArea | null>(null)
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const areaSymptoms = activeArea ? symptomsByArea(activeArea) : symptoms
  const visibleSymptoms = q
    ? areaSymptoms.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
      )
    : areaSymptoms

  const counts = Object.fromEntries(
    (["front", "rear", "steering", "brakes", "overall"] as CarArea[]).map((a) => [
      a,
      symptomsByArea(a).length,
    ]),
  ) as Record<CarArea, number>

  return (
    <div className="space-y-6">
      <PageHeader title="Troubleshooter" subtitle="My car does X — what do I change?" />

      {/* Car diagram */}
      <CarDiagram activeArea={activeArea} onSelectArea={setActiveArea} counts={counts} />

      {/* Search */}
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-neutral-500"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe it — “oscillates”, “numb”, “clipping”…"
          className="w-full rounded-lg bg-neutral-900 border border-neutral-800 pl-10 pr-3 py-2 min-h-[44px] placeholder-neutral-500 text-white transition-colors duration-150 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </div>

      {/* Filter status + symptom list */}
      <div className="space-y-3">
        {activeArea && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent/15 text-accent border border-accent/30 px-3 py-1 text-xs capitalize font-medium">
              {activeArea}
            </span>
            <button
              onClick={() => setActiveArea(null)}
              className="text-xs text-neutral-400 hover:text-white transition-colors duration-150"
            >
              Show all
            </button>
          </div>
        )}
        {visibleSymptoms.length === 0 ? (
          <div className="py-12 text-center">
            <Icon name="search" className="mx-auto h-8 w-8 text-neutral-600" />
            <p className="mt-3 text-sm text-neutral-400">
              No symptom matches{q ? <> <span className="text-neutral-200">“{query.trim()}”</span></> : null}
              {activeArea ? <> in <span className="capitalize text-neutral-200">{activeArea}</span></> : null}.
            </p>
          </div>
        ) : (
          <SymptomList symptoms={visibleSymptoms} />
        )}
      </div>
    </div>
  )
}
