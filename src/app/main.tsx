/**
 * Creates our app
 * 
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// LETS US USE THEME COLORS IN ALL CSS SHEETS!! THIS IMPORT

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
