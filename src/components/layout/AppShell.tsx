import { Outlet } from "react-router-dom"
import BottomNav from "./BottomNav"
import Sidebar from "./Sidebar"
import PWAInstallPrompt from "../PWAInstallPrompt"

export default function AppShell() {
  return (
    // App-shell layout: the viewport is locked to its height and never scrolls
    // itself — only <main> scrolls. This keeps the mobile bottom nav rooted as a
    // flex child instead of position:fixed, which otherwise drifts as iOS
    // Safari's address/toolbar chrome collapses on scroll. h-dvh tracks the
    // dynamic viewport so the nav sits flush above the home indicator.
    <div className="flex h-dvh flex-col overflow-hidden text-white tread-surface pt-[env(safe-area-inset-top)]">
      <Sidebar />
      {/* min-h-0 lets this flex child shrink so its own overflow can scroll;
          md:pl-56 clears the fixed desktop sidebar. */}
      <main className="min-h-0 flex-1 overflow-y-auto md:pl-56">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Outlet />
        </div>
      </main>
      <BottomNav />
      <PWAInstallPrompt />
    </div>
  )
}
