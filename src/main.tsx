import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TrackerForm from './TrackerForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrackerForm />
  </StrictMode>,
)