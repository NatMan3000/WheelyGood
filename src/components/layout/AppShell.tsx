import { Outlet } from "react-router-dom"
import BottomNav from "./BottomNav"
import Sidebar from "./Sidebar"
import PWAInstallPrompt from "../PWAInstallPrompt"

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Sidebar />
      <BottomNav />
      {/* pb-24 clears bottom nav on mobile; md:pl-56 clears sidebar on desktop */}
      <main className="pb-24 md:pb-8 md:pl-56">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <Outlet />
        </div>
      </main>
      <PWAInstallPrompt />
    </div>
  )
}
