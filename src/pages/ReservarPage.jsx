import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import PasosReserva from "../components/sections/PasosReserva";
import Reservar from "../components/Reservar";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ReservarPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Reservar"
          eyebrow="Reservar turno"
          title="Tu momento de bienestar te espera"
          lead="Elegí fecha, horario y completá tus datos. Te confirmamos por WhatsApp."
          tight
        />
        <Reservar />
        <PasosReserva />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default ReservarPage;
