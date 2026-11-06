import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import SobreEspacio from "../components/sections/SobreEspacio";
import Testimonios from "../components/sections/Testimonios";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SobreNosotros = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Sobre nosotros"
          eyebrow="Conocé Espacio Fem"
          title="Un refugio íntimo, pensado para vos"
          lead="Un espacio cálido y exclusivo para mujeres, donde cada masaje está pensado para que puedas desconectar del ritmo diario."
        />
        <SobreEspacio />
        <Testimonios />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default SobreNosotros;
