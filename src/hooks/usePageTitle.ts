import { useEffect } from "react"

/** Keeps the document title in sync with the current page — matters in the
 *  installed PWA where the OS task switcher shows it. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · WheelyGood` : "WheelyGood"
    return () => {
      document.title = "WheelyGood"
    }
  }, [title])
}
