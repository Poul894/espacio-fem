import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Tratamientos from './pages/Tratamientos.jsx'
import Tratamiento from './pages/Tratamiento.jsx'
import Beneficios from './pages/Beneficios.jsx'
import SobreNosotros from './pages/SobreNosotros.jsx'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx'
import ReservarPage from './pages/ReservarPage.jsx'
import Contacto from './pages/Contacto.jsx'
import Admin from './pages/Admin.jsx'
import ScrollManager from './components/ScrollManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
        <Route path="/tratamientos/:id" element={<Tratamiento />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/reservar" element={<ReservarPage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
