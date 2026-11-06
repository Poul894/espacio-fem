import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getServiceById, services } from "../data/services";
import { siteConfig } from "../data/config";
import Header from "../components/Header";
import ContactoFooter from "../components/ContactoFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import MobileBottomBar from "../components/layout/MobileBottomBar";
import { HeartIcon, LotusIcon, WhatsAppIcon } from "../components/ui/Icons";

const CheckIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const whatsappUrl = (service) => {
  const msg = encodeURIComponent(`Hola! Me gustaría consultar por el tratamiento: ${service.name}`);
  return `${siteConfig.whatsappUrl}?text=${msg}`;
};

const Tratamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = getServiceById(id);

  useEffect(() => {
    document.title = service ? `${service.name} | Espacio Fem` : "Tratamiento no encontrado | Espacio Fem";
    return () => {
      document.title = "Espacio Fem";
    };
  }, [service]);

  const reservar = () => {
    if (!service) return;
    navigate("/reservar", { state: { serviceId: service.id } });
  };

  if (!service) {
    return (
      <div className="min-h-screen pb-16 md:pb-0">
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
          <div className="card-soft max-w-lg p-8 text-center sm:p-10">
            <LotusIcon className="mx-auto h-12 w-12 text-violet/60" />
            <h1 className="mt-4 font-display text-3xl text-plum">No encontramos ese tratamiento</h1>
            <p className="mt-3 text-sm text-plum-light">Puede que el enlace haya cambiado. Volvé a ver todos los tratamientos disponibles.</p>
            <Link to="/tratamientos" className="btn-primary mt-6">Ver tratamientos</Link>
          </div>
        </main>
        <ContactoFooter />
        <WhatsAppFloat />
        <MobileBottomBar />
      </div>
    );
  }

  const otros = services.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main className="pt-20 sm:pt-24">
        <section className="relative overflow-hidden py-8 sm:py-12">
          <LotusIcon className="decor-leaf right-4 top-6 h-20 w-20 text-violet/25 sm:right-10" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav aria-label="Migas de pan" className="mb-6 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-plum-light">
              <Link to="/" className="transition-colors hover:text-violet-deep">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link to="/tratamientos" className="transition-colors hover:text-violet-deep">Tratamientos</Link>
              <span aria-hidden="true">/</span>
              <span className="text-violet-deep">{service.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[32px] border border-pink-soft/50 shadow-card">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-[320px] w-full object-cover object-center sm:h-[420px] lg:h-[540px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2">
                  {service.short.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 rounded-pill bg-cream-50/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-violet-deep backdrop-blur">
                      <HeartIcon className="h-3.5 w-3.5 text-pink" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep">
                  {service.tagline}
                </span>
                <h1 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-tight text-plum">{service.name}</h1>
                <p className="text-base text-plum-light sm:text-lg">{service.intro}</p>

                <div className="flex flex-wrap items-center gap-6 rounded-card border border-pink-soft/50 bg-cream-50/80 px-5 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-plum-light">Precio</p>
                    <p className="font-display text-2xl text-plum">{service.price}</p>
                  </div>
                  <div className="h-10 w-px bg-pink-soft/60" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-plum-light">Duración</p>
                    <p className="font-display text-2xl text-plum">{service.duration}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={reservar} className="btn-primary">Reservar este masaje</button>
                  <a href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <WhatsAppIcon className="h-4 w-4" />
                    Consultar
                  </a>
                </div>

                <p className="text-xs text-plum-light">
                  {siteConfig.exclusive} · {siteConfig.addressNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="card-soft p-6 sm:p-8">
                <h2 className="font-display text-2xl text-plum sm:text-3xl">Beneficios</h2>
                <ul className="mt-4 grid gap-3">
                  {service.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-plum-light">
                      <HeartIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-soft p-6 sm:p-8">
                <h2 className="font-display text-2xl text-plum sm:text-3xl">Qué incluye</h2>
                <ul className="mt-4 grid gap-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-plum-light">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet-deep">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <div className="card-soft p-6">
                <h2 className="font-display text-xl text-plum sm:text-2xl">Ideal para vos</h2>
                <ul className="mt-4 grid gap-2 text-sm text-plum-light">
                  {service.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-soft p-6">
                <h2 className="font-display text-xl text-plum sm:text-2xl">Zonas que trabajamos</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.zones.map((zone) => (
                    <span key={zone} className="rounded-pill border border-pink-soft/60 bg-cream-50/80 px-3 py-1 text-xs text-plum-light">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-soft p-6">
                <h2 className="font-display text-xl text-plum sm:text-2xl">Después del masaje</h2>
                <ul className="mt-4 grid gap-2 text-sm text-plum-light">
                  {service.recommendations.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-8 sm:pb-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="card-soft relative overflow-hidden p-8 text-center sm:p-10">
              <div className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-pink-soft/25 to-lavender/25 blur-3xl" aria-hidden="true" />
              <p className="relative text-[10px] uppercase tracking-[0.35em] text-violet-deep">Reservá tu momento</p>
              <h2 className="relative mt-3 font-display text-3xl text-plum sm:text-4xl">Tu bienestar empieza con una pausa</h2>
              <p className="relative mt-3 text-plum-light">Elegí día y horario para tu masaje y confirmá tu turno en pocos pasos.</p>
              <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={reservar} className="btn-primary">Reservar turno</button>
                <Link to="/tratamientos" className="btn-secondary">Ver otros tratamientos</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl text-plum sm:text-3xl">Otros tratamientos</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otros.map((item) => (
                <Link key={item.id} to={`/tratamientos/${item.id}`} className="group card-soft overflow-hidden p-0">
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-medium text-plum">{item.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-violet-deep">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactoFooter />
      <WhatsAppFloat />
      <MobileBottomBar />
    </div>
  );
};

export default Tratamiento;
