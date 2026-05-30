import type { Setting } from "../../types"
import { groupByCategory } from "../../data/settings"
import SettingCard from "./SettingCard"

export default function SettingsList({ settings }: { settings: Setting[] }) {
  const groups = groupByCategory(settings)

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.category}>
          {/* Category header: label + count + rule line */}
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-300">
              {group.label}
            </h2>
            <span className="text-[11px] font-semibold text-neutral-600 tnum">
              {group.settings.length}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent" />
          </div>

          <div className="space-y-2">
            {group.settings.map((setting, i) => (
              <div
                key={setting.id}
                className="item-enter"
                style={{ animationDelay: `${Math.min(i, 10) * 28}ms` }}
              >
                <SettingCard setting={setting} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
