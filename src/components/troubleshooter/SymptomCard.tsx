import { Link } from "react-router-dom"
import type { Symptom } from "../../types"

export default function SymptomCard({ symptom }: { symptom: Symptom }) {
  const firstSentence = symptom.description.split(". ")[0]

  return (
    <Link
      to={`/symptom/${symptom.id}`}
      className="block rounded-lg bg-neutral-900 border border-neutral-800 p-4 min-h-[44px] hover:border-accent transition-colors duration-150"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-medium text-white">{symptom.name}</span>
        <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs capitalize">
          {symptom.area}
        </span>
      </div>
      <p className="text-neutral-400 text-sm line-clamp-2 mt-1">{firstSentence}</p>
    </Link>
  )
}
