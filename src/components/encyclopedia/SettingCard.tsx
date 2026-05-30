import { Link } from "react-router-dom"
import type { Setting } from "../../types"
import { highlightAcronyms } from "../../utils/highlightAcronyms"

export default function SettingCard({ setting }: { setting: Setting }) {
  const firstSentence = setting.description.split(". ")[0]

  return (
    <Link
      to={`/setting/${setting.id}`}
      className="block rounded-lg bg-neutral-900 border border-neutral-800 p-4 min-h-[44px] hover:border-accent card-hover"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-white">{setting.name}</span>
        {setting.abbreviation && (
          <span className="rounded bg-neutral-800 text-red-500 font-semibold px-2 py-0.5 text-xs">
            {setting.abbreviation}
          </span>
        )}
      </div>
      <p className="text-neutral-400 text-sm line-clamp-2 mt-1">{highlightAcronyms(firstSentence)}</p>
    </Link>
  )
}
