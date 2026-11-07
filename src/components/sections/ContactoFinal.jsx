import { Link } from "react-router-dom";
import { siteConfig } from "../../data/config";
import { HeartIcon, WhatsAppIcon } from "../ui/Icons";

const ContactoFinal = () => {
  return (
    <section className="relative pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="card-soft overflow-hidden">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-base text-plum-light sm:text-lg">
                Reservá tu turno o consultá disponibilidad por WhatsApp. Te respondemos con gusto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/reservar" className="btn-primary">Quiero reservar mi turno</Link>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <WhatsAppIcon className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">WhatsApp</p>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg text-plum hover:text-violet-deep">
                    {siteConfig.whatsappNumber.replace("549", "")}
                  </a>
                </div>
                <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">Ubicación</p>
                  <p className="mt-2 block text-lg text-plum">{siteConfig.addressNote}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <HeartIcon className="h-5 w-5 text-pink-soft" />
                <p className="font-script text-2xl text-violet">{siteConfig.closingPhrase} ♡</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoFinal;
