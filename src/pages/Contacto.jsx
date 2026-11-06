import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import ContactoFinal from "../components/sections/ContactoFinal";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Contacto = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Contacto"
          eyebrow="Contacto"
          title="¿Lista para tu momento de bienestar?"
        />
        <ContactoFinal />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default Contacto;
