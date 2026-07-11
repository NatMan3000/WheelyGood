import { Link } from "react-router-dom"
import type { Symptom } from "../../types"
import { contextFixes } from "../../data/symptoms/symptoms"
import { useSetup } from "../../hooks/useSetup"
import { useGame } from "../../hooks/useGame"

export default function SymptomCard({ symptom }: { symptom: Symptom }) {
  const { setup } = useSetup()
  const { gameId } = useGame()
  const firstSentence = symptom.description.split(". ")[0]

  const hardware = new Set(setup.components.map((c) => c.id))
  const forRig = contextFixes(symptom, hardware, gameId).length

  return (
    <Link
      to={`/symptom/${symptom.id}`}
      className="block rounded-lg bg-neutral-900 border border-neutral-800 p-4 min-h-[44px] hover:border-accent card-hover"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-white min-w-0 flex-1">{symptom.name}</span>
        <span
          className={[
            "shrink-0 rounded px-2 py-0.5 text-xs tnum",
            forRig > 0
              ? "bg-accent/10 text-accent"
              : "bg-neutral-800 text-neutral-500",
          ].join(" ")}
        >
          {forRig > 0 ? `${forRig} fix${forRig === 1 ? "" : "es"}` : "no rig fixes"}
        </span>
      </div>
      <p className="text-neutral-400 text-sm line-clamp-2 mt-1">{firstSentence}</p>
    </Link>
  )
}
