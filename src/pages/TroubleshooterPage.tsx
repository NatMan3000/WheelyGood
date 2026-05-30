import { useState } from "react"
import type { CarArea } from "../types"
import CarDiagram from "../components/troubleshooter/CarDiagram"
import SymptomList from "../components/troubleshooter/SymptomList"
import { symptoms, symptomsByArea } from "../data/symptoms/symptoms"

export default function TroubleshooterPage() {
  const [activeArea, setActiveArea] = useState<CarArea | null>(null)

  const visibleSymptoms = activeArea ? symptomsByArea(activeArea) : symptoms

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Troubleshooter</h1>
        <p className="text-neutral-400 text-sm mt-1">
          My car does X — what do I change?
        </p>
      </div>

      {/* Car diagram */}
      <CarDiagram activeArea={activeArea} onSelectArea={setActiveArea} />

      {/* Filter status + symptom list */}
      <div className="space-y-3">
        {activeArea && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 px-3 py-0.5 text-xs capitalize">
              Showing: {activeArea}
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
