import { useState } from "react";
import { siteConfig } from "../data/config";
import { WhatsAppIcon } from "./ui/Icons";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tratamientos", label: "Tratamientos" },
  { href: "#videos", label: "Videos" },
  { href: "#sobre-mi", label: "Sobre nosotros" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-cream-50/98 shadow-[0_1px_0_rgba(81,38,83,0.08)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-1.5 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="Espacio Fem - Inicio">
          <img src="/assets/logo.jpeg" alt="Logo Espacio Fem - Un refugio para tu bienestar y calma" className="h-10 w-10 rounded-full object-cover shadow-soft" loading="lazy" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base uppercase tracking-[0.5em] text-plum">Espacio Fem</span>
            <span className="text-[10px] tracking-[0.32em] uppercase text-violet-muted">Bienestar &amp; Calma</span>
          </div>
        </a>
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-plum-light">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-violet-deep">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#reservar" className="hidden h-9 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-button transition-all hover:-translate-y-0.5 lg:inline-flex">Reservar turno</a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center justify-center gap-2 rounded-pill border border-violet/70 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-deep transition-all hover:-translate-y-0.5 hover:bg-violet/5 lg:inline-flex">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-soft/70 text-plum"
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
          <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-2.5 text-sm text-plum-light sm:px-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-2 py-2 hover:bg-pink-soft/30 hover:text-violet-deep" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#reservar" className="mt-2 inline-flex h-9 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream-50" onClick={() => setOpen(false)}>Reservar turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex h-9 items-center justify-center gap-2 rounded-pill border border-violet/70 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-deep">
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
