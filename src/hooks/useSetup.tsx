import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { defaultSetupId, setupById } from "../data/setups"
import type { Setup, SetupId } from "../types"

interface SetupContextValue {
  setupId: SetupId
  setup: Setup
  setSetupId: (id: SetupId) => void
}

const SetupContext = createContext<SetupContextValue | null>(null)

export function SetupProvider({ children }: { children: ReactNode }) {
  const [setupId, setSetupId] = useLocalStorage<SetupId>("wg-setup", defaultSetupId)
  const setup = setupById(setupId)
  return <SetupContext.Provider value={{ setupId, setup, setSetupId }}>{children}</SetupContext.Provider>
}

export function useSetup(): SetupContextValue {
  const ctx = useContext(SetupContext)
  if (!ctx) throw new Error("useSetup must be used within SetupProvider")
  return ctx
}
