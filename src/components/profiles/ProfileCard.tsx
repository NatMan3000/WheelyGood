import { Link } from "react-router-dom"
import type { Profile } from "../../types"
import { setupById } from "../../data/setups"
import { games } from "../../data/settings"

export default function ProfileCard({ profile }: { profile: Profile }) {
  const setup = setupById(profile.setup)
  const gameName = games.find((g) => g.id === profile.game)?.name ?? profile.game
  const updatedLabel = new Date(profile.updatedAt).toLocaleDateString()

  return (
    <Link
      to={`/saves/${profile.id}`}
      className="block rounded-lg bg-neutral-900 border border-neutral-800 p-4 min-h-[44px] hover:border-accent card-hover"
    >
      <span className="font-medium text-white">{profile.name}</span>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs">
          {setup.shortName}
        </span>
        <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs">
          {gameName}
        </span>
        {profile.surface && (
          <span className="rounded bg-neutral-800 text-neutral-300 px-2 py-0.5 text-xs capitalize">
            {profile.surface}
          </span>
        )}
      </div>
      <p className="text-neutral-500 text-xs mt-2">Updated {updatedLabel}</p>
    </Link>
  )
}
