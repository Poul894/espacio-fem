import { siteConfig } from "../../data/config";
import { WhatsAppIcon } from "../ui/Icons";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 bg-cream-50/98 px-3 pb-[calc(env(safe-area-inset-bottom,0)+0.5rem)] pt-2 shadow-[0_-10px_40px_-20px_rgba(81,38,83,0.6)] backdrop-blur md:hidden">
      <a href="#reservar" className="inline-flex h-10 flex-1 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep text-xs font-semibold uppercase tracking-[0.16em] text-cream-50">Reservar</a>
      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-pill border border-violet/70 text-xs font-semibold uppercase tracking-[0.16em] text-violet-deep">
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
};

export default MobileBottomBar;
