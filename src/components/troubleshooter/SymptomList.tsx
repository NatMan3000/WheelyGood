import type { Symptom } from "../../types"
import SymptomCard from "./SymptomCard"

export default function SymptomList({ symptoms }: { symptoms: Symptom[] }) {
  if (symptoms.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-8">No symptoms for this area.</p>
    )
  }

  return (
    <div className="space-y-2">
      {symptoms.map((symptom) => (
        <SymptomCard key={symptom.id} symptom={symptom} />
      ))}
    </div>
  )
}
