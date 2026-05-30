import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls to the top of the page on every route change. React Router preserves
 * scroll position by default; this forces every navigation to start at the top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname])

  return null
}
