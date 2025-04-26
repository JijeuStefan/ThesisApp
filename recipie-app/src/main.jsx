import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchRecipies from './app/pages/searchRecipies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchRecipies />
  </StrictMode>,
)
