import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { defaultThemeId, themeById } from "../data/themes"
import type { AccentTheme } from "../types"

interface ThemeContextValue {
  themeId: string
  theme: AccentTheme
  setThemeId: (id: string) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage<string>("wg-theme", defaultThemeId)
  const theme = themeById(themeId)

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", theme.accent)
  }, [theme.accent])

  return <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
