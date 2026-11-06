import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import PreguntasFrecuentesSection from "../components/sections/PreguntasFrecuentes";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PreguntasFrecuentes = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Preguntas frecuentes"
          eyebrow="Preguntas frecuentes"
          title="Dudas habituales"
          lead="Todo lo que necesitás saber antes de reservar tu turno."
        />
        <PreguntasFrecuentesSection />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default PreguntasFrecuentes;
