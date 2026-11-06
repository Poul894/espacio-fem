import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import EncontrarMasaje from "../components/sections/EncontrarMasaje";
import { services } from "../data/services";
import { HeartIcon } from "../components/ui/Icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const accents = ["from-pink-soft/50 to-pink/30", "from-lavender/50 to-violet/25", "from-gold-light/60 to-gold/25"];

const Tratamientos = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        <PageHero
          crumb="Tratamientos"
          eyebrow="Tratamientos"
          title="Masajes pensados para vos"
          lead="Descontracturantes, estéticos y relajantes. Elegí el que más se ajuste a lo que tu cuerpo necesita hoy."
        />

        <section className="relative pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <article key={service.id} className="card-soft reveal flex flex-col overflow-hidden">
                  <div className={`h-2 w-full bg-gradient-to-r ${accents[idx % accents.length]}`} />
                  <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-3xl text-violet/35">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="rounded-pill border border-violet/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-deep">
                        {service.duration === "Consultar" ? "Consultar duración" : service.duration}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl text-plum">{service.name}</h2>
                    <p className="text-sm text-plum-light">{service.tagline}</p>

                    <div className="flex flex-wrap gap-2">
                      {service.short.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 rounded-pill bg-cream-100/80 px-3 py-1 text-[11px] text-plum-light">
                          <HeartIcon className="h-3 w-3 text-pink" />
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <p className="font-display text-xl text-plum">{service.price}</p>
                      <Link to={`/tratamientos/${service.id}`} className="btn-secondary px-5 py-2 text-xs">
                        Ver detalle →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <EncontrarMasaje />
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default Tratamientos;
