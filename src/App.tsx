import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import EncyclopediaPage from './pages/EncyclopediaPage'
import TroubleshooterPage from './pages/TroubleshooterPage'
import ProfilesPage from './pages/ProfilesPage'
import SettingsPage from './pages/SettingsPage'
import SettingDetailPage from './pages/SettingDetailPage'
import SymptomDetailPage from './pages/SymptomDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/learn" replace />} />
        <Route path="/learn" element={<EncyclopediaPage />} />
        <Route path="/fix" element={<TroubleshooterPage />} />
        <Route path="/saves" element={<ProfilesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      {/* Deep-linkable full-screen detail (outside the shell). */}
      <Route path="/setting/:id" element={<SettingDetailPage />} />
      <Route path="/symptom/:id" element={<SymptomDetailPage />} />
      <Route path="*" element={<Navigate to="/learn" replace />} />
    </Routes>
  )
}
