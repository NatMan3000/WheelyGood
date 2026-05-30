import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './hooks/useTheme'
import { SetupProvider } from './hooks/useSetup'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SetupProvider>
          <App />
        </SetupProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
