import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Tratamiento from './pages/Tratamiento.jsx'
import Admin from './pages/Admin.jsx'
import ScrollManager from './components/ScrollManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tratamientos/:id" element={<Tratamiento />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
