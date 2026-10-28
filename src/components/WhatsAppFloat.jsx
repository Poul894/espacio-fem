import { siteConfig } from "../data/config";
import { WhatsAppIcon } from "./ui/Icons";

const WhatsAppFloat = () => {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep text-cream-50 shadow-button transition-all hover:-translate-y-1 md:flex lg:bottom-6"
      aria-label="Consultar por WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppFloat;
