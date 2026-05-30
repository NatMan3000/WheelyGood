import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { games } from "../data/settings"
import type { GameId } from "../types"

interface GameContextValue {
  gameId: GameId
  game: { id: GameId; name: string }
  setGameId: (id: GameId) => void
}

const GameContext = createContext<GameContextValue | null>(null)

const defaultGameId: GameId = "fh6"

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameId, setGameId] = useLocalStorage<GameId>("wg-game", defaultGameId)
  const game = games.find((g) => g.id === gameId) ?? games[0]
  return <GameContext.Provider value={{ gameId, game, setGameId }}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}
