import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SetupProvider } from './hooks/useSetup'
import { GameProvider } from './hooks/useGame'
import { ProfilesProvider } from './hooks/useProfiles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SetupProvider>
        <GameProvider>
          <ProfilesProvider>
            <App />
          </ProfilesProvider>
        </GameProvider>
      </SetupProvider>
    </BrowserRouter>
  </StrictMode>,
)
