import { services } from "../../data/services";
import { HeartIcon } from "../ui/Icons";

const Tratamientos = () => {
  const handleReservar = (service) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("espaciofem:preselect", { detail: { serviceId: service.id } }));
    const el = document.getElementById("reservar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const siteConfigWhatsapp = (service) => {
    const base = "https://wa.me/5491151354124";
    const msg = encodeURIComponent(`Hola! Me gustaría consultar por el tratamiento: ${service.name}`);
    return `${base}?text=${msg}`;
  };

  return (
    <section id="tratamientos" className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep">
            Tratamientos
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-plum">Tratamientos y masajes</h2>
          <p className="mt-3 max-w-2xl text-base text-plum-light sm:text-lg">
            Masajes descontracturantes, estéticos y relajantes, diseñados especialmente para vos.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="card-soft reveal flex h-full flex-col overflow-hidden p-0">
              <div className="relative h-56 w-full">
                <img src={service.image} alt={service.name} className="h-full w-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/12 to-transparent"></div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <div>
                  <h3 className="font-display text-xl text-plum sm:text-2xl">{service.name}</h3>
                  <p className="mt-1.5 text-sm text-plum-light">{service.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-plum-light">
                  {service.short.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 rounded-pill border border-pink-soft/60 px-2.5 py-0.5">
                      <HeartIcon className="h-3.5 w-3.5 text-pink-soft" />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2 text-xs uppercase tracking-[0.32em] text-violet-deep">
                  <span>Duración: {service.duration}</span>
                  <span>Precio: {service.price}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => handleReservar(service)} className="inline-flex h-10 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-5 text-xs font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-button transition-all hover:-translate-y-0.5">Reservar este masaje</button>
                  <a href={siteConfigWhatsapp(service)} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center rounded-pill border border-violet/70 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-deep transition-all hover:-translate-y-0.5 hover:bg-violet/5">Consultar</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tratamientos;
