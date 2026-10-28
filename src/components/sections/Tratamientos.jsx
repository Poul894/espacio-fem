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

  return (
    <section id="tratamientos" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
            Tratamientos
          </span>
          <h2 className="font-display text-3xl text-plum sm:text-4xl lg:text-5xl">Tratamientos y masajes</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-light sm:text-lg">
            Masajes descontracturantes, estéticos y relajantes, diseñados especialmente para vos.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="card-soft reveal grid gap-6 overflow-hidden p-0 sm:grid-cols-[240px_1fr]">
              <div className="relative h-64 w-full sm:h-full">
                <img src={service.image} alt={service.name} className="h-full w-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/15 to-transparent"></div>
              </div>
              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-2xl text-plum sm:text-3xl">{service.name}</h3>
                  <p className="mt-2 text-sm text-plum-light">{service.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-plum-light">
                  {service.short.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 rounded-pill border border-pink-soft/60 px-3 py-1">
                      <HeartIcon className="h-4 w-4 text-pink-soft" />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-violet-deep">
                  <span>Duración: {service.duration}</span>
                  <span>Precio: {service.price}</span>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <button onClick={() => handleReservar(service)} className="btn-primary">Reservar este masaje</button>
                  <a href={siteConfigWhatsapp(service)} target="_blank" rel="noopener noreferrer" className="btn-secondary">Consultar</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const siteConfigWhatsapp = (service) => {
  const base = "https://wa.me/5491151354124";
  const msg = encodeURIComponent(`Hola! Me gustaría consultar por el tratamiento: ${service.name}`);
  return `${base}?text=${msg}`;
};

export default Tratamientos;
