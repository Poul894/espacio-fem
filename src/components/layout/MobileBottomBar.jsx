import { siteConfig } from "../../data/config";
import { WhatsAppIcon } from "../ui/Icons";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 bg-cream-50/95 px-3 py-2 shadow-[0_-10px_40px_-20px_rgba(81,38,83,0.6)] backdrop-blur md:hidden">
      <a href="#reservar" className="btn-primary flex-1 text-center text-xs">Reservar</a>
      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 justify-center text-xs">
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
};

export default MobileBottomBar;
