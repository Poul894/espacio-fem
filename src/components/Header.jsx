import { useState } from "react";
import { siteConfig } from "../data/config";
import { WhatsAppIcon } from "./ui/Icons";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#masajes", label: "Masajes" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#sobre-mi", label: "Sobre mí / El espacio" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-cream-50/95 backdrop-blur-lg shadow-[0_1px_0_rgba(81,38,83,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Espacio Fem - Inicio">
          <img src="/assets/logo.jpeg" alt="Logo Espacio Fem - Un refugio para tu bienestar y calma" className="h-12 w-12 rounded-full object-cover shadow-soft" loading="lazy" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg uppercase tracking-[0.5em] text-plum">Espacio Fem</span>
            <span className="text-xs tracking-[0.32em] uppercase text-violet-muted">Bienestar &amp; Calma</span>
          </div>
        </a>
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-plum-light">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-violet-deep">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#reservar" className="btn-primary hidden lg:inline-flex">Reservar turno</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp hidden lg:inline-flex">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-soft/70 text-plum"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden border-t border-pink-soft/60 bg-cream-50/98">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-plum-light sm:px-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-2 py-2 hover:bg-pink-soft/30 hover:text-violet-deep" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#reservar" className="mt-2 btn-primary justify-center" onClick={() => setOpen(false)}>Reservar turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
