import { Link, useNavigate, useParams } from "react-router-dom"
import { symptomById } from "../data/symptoms/symptoms"
import { settingById } from "../data/settings"

export default function SymptomDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const symptom = id ? symptomById(id) : undefined

  if (!symptom) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-neutral-400">Symptom not found.</p>
        <Link to="/fix" className="text-accent text-sm">
          Back to Troubleshooter
        </Link>
      </div>
    )
  }

  const sortedFixes = [...symptom.fixes].sort((a, b) => a.priority - b.priority)

  return (
    <div className="min-h-svh bg-neutral-950 text-white">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 flex items-center gap-2 px-4 h-14 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-400 hover:text-white transition-colors duration-150 shrink-0"
        >
          ← Back
        </button>
        <span className="font-medium text-white truncate">{symptom.name}</span>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-4 py-4 space-y-4">
        {/* Name + area badge */}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{symptom.name}</h1>
          <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs capitalize">
            {symptom.area}
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-300">{symptom.description}</p>

        {/* Fixes */}
        {sortedFixes.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-neutral-300">
              Try these fixes, in order
            </h2>
            {sortedFixes.map((fix) => (
              <div
                key={`${fix.settingId}-${fix.priority}`}
                className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 space-y-1.5"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Priority badge */}
                  <span className="bg-accent text-black rounded-full w-6 h-6 grid place-items-center text-xs font-bold shrink-0">
                    {fix.priority}
                  </span>

                  {/* Setting name link */}
                  <Link
                    to={`/setting/${fix.settingId}`}
                    className="text-accent hover:underline font-medium text-sm"
                  >
                    {settingById(fix.settingId)?.name ?? fix.settingId}
                  </Link>

                  {/* Direction */}
                  {fix.direction === "increase" ? (
                    <span className="text-emerald-400 text-sm">↑ Increase</span>
                  ) : (
                    <span className="text-red-400 text-sm">↓ Decrease</span>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-neutral-300 text-sm">{fix.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {/* Related symptoms */}
        {symptom.relatedSymptoms && symptom.relatedSymptoms.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-neutral-300">Related</h2>
            <div className="flex flex-wrap gap-2">
              {symptom.relatedSymptoms.map((relId: string) => (
                <Link
                  key={relId}
                  to={`/symptom/${relId}`}
                  className="inline-flex items-center rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-200 hover:border-accent transition-colors duration-150"
                >
                  {symptomById(relId)?.name ?? relId}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
