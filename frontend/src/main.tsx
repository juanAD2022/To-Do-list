import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './components/Modal/context/ModalContext.tsx'
import {ProviderTask} from "./context/global.context"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <ProviderTask>
        <App/>
      </ProviderTask>
    </ModalProvider>
  </StrictMode>,
)
