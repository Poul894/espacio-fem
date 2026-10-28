import { siteConfig } from "../../data/config";
import { HeartIcon, WhatsAppIcon } from "../ui/Icons";

const ContactoFinal = () => {
  return (
    <section id="contacto" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="card-soft overflow-hidden">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
                Contacto
              </span>
              <h2 className="font-display text-3xl text-plum sm:text-4xl lg:text-5xl">¿Listo para tu momento de bienestar?</h2>
              <p className="mt-4 text-base text-plum-light sm:text-lg">
                Reservá tu turno o consultá disponibilidad por WhatsApp. Te respondemos con gusto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#reservar" className="btn-primary">Quiero reservar mi turno</a>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <WhatsAppIcon className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">WhatsApp</p>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg text-plum hover:text-violet-deep">
                    {siteConfig.whatsappNumber.replace("549", "15")}
                  </a>
                </div>
                <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">Instagram</p>
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg text-plum hover:text-violet-deep">
                    (placeholder)
                  </a>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <HeartIcon className="h-5 w-5 text-pink-soft" />
                <p className="font-script text-2xl text-violet">{siteConfig.closingPhrase} ♡</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-pink-soft/25 to-lavender/20 blur-3xl" aria-hidden="true"></div>
              <div className="relative overflow-hidden rounded-[40px]">
                <img src="/assets/flyer-servicios.jpeg" alt="Espacio Fem - Contacto" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoFinal;
