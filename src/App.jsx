import Header from "./components/Header";
import HeroPremium from "./components/sections/HeroPremium";
import IndexLinks from "./components/sections/IndexLinks";
import ContactoFooter from "./components/ContactoFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import MobileBottomBar from "./components/layout/MobileBottomBar";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "./App.css";

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <HeroPremium />
        <IndexLinks />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
}

export default App;
