import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useLocalStorage } from "./useLocalStorage"
import type { Profile } from "../types"

const STORAGE_KEY = "wg-profiles-v1"
const CURRENT_VERSION = 1

interface ProfileStore {
  version: number
  profiles: Profile[]
}

/** Input for creating a profile — id/timestamps are assigned by the store. */
export type NewProfileInput = Omit<Profile, "id" | "createdAt" | "updatedAt">

interface ProfilesContextValue {
  profiles: Profile[]
  getProfile: (id: string) => Profile | undefined
  createProfile: (input: NewProfileInput) => Profile
  updateProfile: (id: string, patch: Partial<NewProfileInput>) => void
  deleteProfile: (id: string) => void
  duplicateProfile: (id: string) => Profile | undefined
}

const ProfilesContext = createContext<ProfilesContextValue | null>(null)

function nowIso() {
  return new Date().toISOString()
}

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useLocalStorage<ProfileStore>(STORAGE_KEY, {
    version: CURRENT_VERSION,
    profiles: [],
  })

  const profiles = store.profiles

  const setProfiles = useCallback(
    (next: Profile[]) => setStore({ version: CURRENT_VERSION, profiles: next }),
    [setStore],
  )

  const getProfile = useCallback((id: string) => profiles.find((p) => p.id === id), [profiles])

  const createProfile = useCallback(
    (input: NewProfileInput): Profile => {
      const profile: Profile = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: nowIso(),
        updatedAt: nowIso(),
      }
      setProfiles([profile, ...profiles])
      return profile
    },
    [profiles, setProfiles],
  )

  const updateProfile = useCallback(
    (id: string, patch: Partial<NewProfileInput>) => {
      setProfiles(
        profiles.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: nowIso() } : p)),
      )
    },
    [profiles, setProfiles],
  )

  const deleteProfile = useCallback(
    (id: string) => setProfiles(profiles.filter((p) => p.id !== id)),
    [profiles, setProfiles],
  )

  const duplicateProfile = useCallback(
    (id: string): Profile | undefined => {
      const src = profiles.find((p) => p.id === id)
      if (!src) return undefined
      const copy: Profile = {
        ...src,
        id: crypto.randomUUID(),
        name: `${src.name} (copy)`,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      }
      setProfiles([copy, ...profiles])
      return copy
    },
    [profiles, setProfiles],
  )

  return (
    <ProfilesContext.Provider
      value={{ profiles, getProfile, createProfile, updateProfile, deleteProfile, duplicateProfile }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

export function useProfiles(): ProfilesContextValue {
  const ctx = useContext(ProfilesContext)
  if (!ctx) throw new Error("useProfiles must be used within ProfilesProvider")
  return ctx
}
