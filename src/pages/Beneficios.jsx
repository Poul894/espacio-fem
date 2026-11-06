import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import BeneficiosPremium from "../components/sections/BeneficiosPremium";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Beneficios = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Beneficios"
          eyebrow="Beneficios del bienestar"
          title="Tu camino al bienestar integral"
          lead="Descubrí la importancia de los masajes como un espacio de cuidado, relajación y autocuidado."
        />
        <BeneficiosPremium />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default Beneficios;
