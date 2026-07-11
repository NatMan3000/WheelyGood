import { Link } from "react-router-dom"
import type { Setting } from "../../types"
import { highlightAcronyms } from "../../utils/highlightAcronyms"
import { contextValue, formatValue } from "../../data/settings"
import { useSetup } from "../../hooks/useSetup"
import { useGame } from "../../hooks/useGame"
import OledTag from "../shared/OledTag"
import Icon from "../shared/Icon"

export default function SettingCard({ setting }: { setting: Setting }) {
  const { setupId } = useSetup()
  const { gameId } = useGame()
  const firstSentence = setting.description.split(". ")[0]

  // The at-a-glance answer: what to run this at, for the active rig + game.
  const cv = contextValue(setting, setupId, gameId)

  return (
    <Link
      to={`/setting/${setting.id}`}
      className="group flex items-center gap-3.5 rounded-xl bg-neutral-900 border border-neutral-800 p-3 hover:border-accent card-hover"
    >
      <OledTag code={setting.abbreviation} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white truncate">{setting.name}</span>
          {setting.unverified && (
            <span className="shrink-0 rounded bg-amber-500/15 text-amber-400 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              Draft
            </span>
          )}
        </div>
        <p className="text-neutral-400 text-sm line-clamp-2 mt-0.5">
          {highlightAcronyms(firstSentence)}
        </p>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <span
          className={[
            "text-sm font-semibold tnum",
            cv.source === "rec" ? "text-accent" : "text-neutral-300",
          ].join(" ")}
        >
          {formatValue(setting, cv.value)}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-neutral-600">
          {cv.source === "rec" ? "your rig" : "default"}
        </span>
      </div>

      <Icon
        name="chevron"
        className="h-5 w-5 shrink-0 text-neutral-600 transition-[color,transform] duration-150 group-hover:text-accent group-hover:translate-x-0.5"
      />
    </Link>
  )
}
