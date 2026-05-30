import { Link } from "react-router-dom"
import type { Profile } from "../../types"
import GameLogo from "../shared/GameLogo"
import SetupLogo from "../shared/SetupLogo"

export default function ProfileCard({ profile }: { profile: Profile }) {
  const updatedLabel = new Date(profile.updatedAt).toLocaleDateString()

  return (
    <Link
      to={`/saves/${profile.id}`}
      className="block rounded-lg bg-neutral-900 border border-neutral-800 p-4 min-h-[44px] hover:border-accent card-hover"
    >
      <span className="font-medium text-white">{profile.name}</span>
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <SetupLogo setupId={profile.setup} className="h-6 w-6" />
        <GameLogo gameId={profile.game} className="h-6 w-6" />
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
