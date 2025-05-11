import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SearchRecipies from './app/pages/search/SearchRecipies.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchRecipies />
  </StrictMode>,
)
