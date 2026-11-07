import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageHero from "../components/ui/PageHero";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import EncontrarMasaje from "../components/sections/EncontrarMasaje";
import { useServices } from "../hooks/useServices";
import { ArrowRightIcon, HeartIcon } from "../components/ui/Icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Tratamientos = () => {
  useScrollReveal();
  const services = useServices();

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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <article key={service.id} className="card-spa reveal">
                  <div className="relative h-[42%] min-h-[180px] w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="card-spa__img h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-plum/5 to-transparent" />
                    <svg
                      className="absolute -bottom-px left-0 h-8 w-full text-cream-50 sm:h-10"
                      viewBox="0 0 400 40"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 40 C 80 0, 160 40, 200 20 C 240 0, 320 40, 400 10 L 400 40 L 0 40 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6 pt-5 sm:p-7 sm:pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-3xl text-violet/30">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="rounded-pill border border-violet/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-muted">
                        {service.duration === "Consultar" ? "Consultar duración" : service.duration}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl text-violet-deep">{service.name}</h2>
                    <p className="font-body text-sm text-violet-muted">{service.tagline}</p>

                    <div className="flex flex-wrap gap-2">
                      {service.short.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 rounded-pill bg-cream-100/80 px-3 py-1 text-[11px] font-body text-violet-muted">
                          <HeartIcon className="h-3 w-3 text-pink" />
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <p className="font-display text-xl text-violet-deep">{service.price}</p>
                      <Link to={`/tratamientos/${service.id}`} className="btn-card">
                        Ver detalle
                        <ArrowRightIcon className="h-3.5 w-3.5" />
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
