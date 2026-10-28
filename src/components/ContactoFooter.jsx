import { siteConfig } from "../data/config";
import { HeartIcon, LotusIcon, WhatsAppIcon } from "./ui/Icons";

const navFooter = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#masajes", label: "Masajes" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#sobre-mi", label: "Sobre mí / El espacio" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
  { href: "#reservar", label: "Reservar turno" },
];

const ContactoFooter = () => {
  return (
    <footer className="relative mt-10 border-t border-pink-soft/60 bg-cream-50/90">
      <LotusIcon className="decor-leaf -top-10 left-4 h-14 w-14 text-violet/25 sm:left-10" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <img src="/assets/logo.jpeg" alt="Logo Espacio Fem" className="h-16 w-16 rounded-full object-cover shadow-soft" loading="lazy" />
          <p className="mt-4 font-display text-lg uppercase tracking-[0.45em] text-plum">Espacio Fem</p>
          <p className="mt-2 text-sm text-plum-light">{siteConfig.slogan}</p>
          <p className="mt-4 font-script text-2xl text-violet">
            {siteConfig.closingPhrase} <HeartIcon className="ml-1 inline h-5 w-5 text-pink-soft" />
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">Navegación</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-plum-light">
            {navFooter.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-violet-deep">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:items-end lg:text-right">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">Contacto</p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp {siteConfig.whatsappNumber.replace("549", "15")}
          </a>
          <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-plum-light hover:text-violet-deep">Instagram (placeholder)</a>
          <p className="text-xs text-plum-light">{siteConfig.addressNote}</p>
        </div>
      </div>
      <div className="border-t border-pink-soft/60 py-4">
        <p className="text-center text-xs text-plum-light">© {new Date().getFullYear()} Espacio Fem. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default ContactoFooter;
