import { useEffect, useState } from "react"

// Minimal type for the non-standard beforeinstallprompt event (Chromium).
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const DISMISS_KEY = "wg-install-dismissed"

/**
 * Shows a small "Install" banner when the browser offers installation
 * (Chromium fires `beforeinstallprompt`). iOS Safari has no programmatic
 * install, so this simply never shows there — that's expected.
 */
export default function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === "1") return
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  if (!deferred) return null

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1")
    setDeferred(null)
  }

  const install = async () => {
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 mx-auto max-w-md px-4 md:bottom-6 md:left-56">
      <div className="flex items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-900/95 backdrop-blur px-4 py-3 shadow-lg">
        <img src="/icon.svg" alt="" className="h-9 w-9 rounded-lg shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">Install WheelyGood</p>
          <p className="text-xs text-neutral-400">Add to your home screen for offline use at the rig.</p>
        </div>
        <button
          onClick={install}
          className="shrink-0 rounded-lg bg-accent text-black px-3 py-2 text-sm font-medium min-h-[44px]"
        >
          Install
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-neutral-500 hover:text-white transition-colors duration-150 px-1"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
