import { useEffect } from "react";
import Header from "./components/Header";
import HeroPremium from "./components/sections/HeroPremium";
import Tratamientos from "./components/sections/Tratamientos";
import Masajes from "./components/Masajes";
import EncontrarMasaje from "./components/sections/EncontrarMasaje";
import BeneficiosPremium from "./components/sections/BeneficiosPremium";
import SobreEspacio from "./components/sections/SobreEspacio";
import PasosReserva from "./components/sections/PasosReserva";
import Reservar from "./components/Reservar";
import PreguntasFrecuentes from "./components/sections/PreguntasFrecuentes";
import ContactoFinal from "./components/sections/ContactoFinal";
import Cierre from "./components/Cierre";
import ContactoFooter from "./components/ContactoFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import MobileBottomBar from "./components/layout/MobileBottomBar";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "./App.css";

function App() {
  useScrollReveal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePreselect = () => {};
    window.addEventListener("espaciofem:preselect", handlePreselect);
    return () => window.removeEventListener("espaciofem:preselect", handlePreselect);
  }, []);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <HeroPremium />
        <Tratamientos />
        <Masajes />
        <EncontrarMasaje />
        <BeneficiosPremium />
        <SobreEspacio />
        <PasosReserva />
        <Reservar />
        <PreguntasFrecuentes />
        <ContactoFinal />
        <Cierre />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
}

export default App;
