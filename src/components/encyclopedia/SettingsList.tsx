import type { Setting } from "../../types"
import { groupByCategory } from "../../data/settings"
import SettingCard from "./SettingCard"

export default function SettingsList({ settings }: { settings: Setting[] }) {
  const groups = groupByCategory(settings)

  return (
    <div>
      {groups.map((group) => (
        <section key={group.category}>
          <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-2 mt-6 first:mt-0">
            {group.label}
          </h2>
          <div className="space-y-2">
            {group.settings.map((setting) => (
              <SettingCard key={setting.id} setting={setting} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
