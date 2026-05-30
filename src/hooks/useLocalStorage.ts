import { useState, useEffect, useCallback } from "react"

/** Persist a JSON-serialisable value in localStorage, SSR/quota safe. */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* quota / private mode — ignore */
    }
  }, [key, value])

  const set = useCallback((v: T) => setValue(v), [])
  return [value, set]
}
