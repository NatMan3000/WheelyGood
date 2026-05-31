import type { GameId } from "../../types"
import { games } from "../../data/settings"
import { asset } from "../../utils/asset"

const SRC: Record<GameId, string> = {
  fh6: asset("game-fh6.png"),
  "f1-25": asset("game-f1.png"),
}

/** A game's logo on a uniform white chip. Pass size via className (default h-6 w-6). */
export default function GameLogo({ gameId, className = "h-6 w-6" }: { gameId: GameId; className?: string }) {
  const name = games.find((g) => g.id === gameId)?.name ?? gameId
  return (
    <span className={`inline-grid shrink-0 place-items-center overflow-hidden rounded bg-white ${className}`}>
      <img
        src={SRC[gameId]}
        alt={name}
        title={name}
        draggable={false}
        className="h-full w-full object-contain p-0.5"
      />
    </span>
  )
}
