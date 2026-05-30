import { useState } from "react"
import type { CarArea } from "../types"
import CarDiagram from "../components/troubleshooter/CarDiagram"
import SymptomList from "../components/troubleshooter/SymptomList"
import PageHeader from "../components/shared/PageHeader"
import { symptoms, symptomsByArea } from "../data/symptoms/symptoms"

export default function TroubleshooterPage() {
  const [activeArea, setActiveArea] = useState<CarArea | null>(null)

  const visibleSymptoms = activeArea ? symptomsByArea(activeArea) : symptoms

  return (
    <div className="space-y-6">
      <PageHeader title="Troubleshooter" subtitle="My car does X — what do I change?" />

      {/* Car diagram */}
      <CarDiagram activeArea={activeArea} onSelectArea={setActiveArea} />

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
        <SymptomList symptoms={visibleSymptoms} />
      </div>
    </div>
  )
}
