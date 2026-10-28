import { services } from "../data/services";
import { HeartIcon, LotusIcon } from "./ui/Icons";

const Masajes = () => {
  const handleReservar = (service) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("espaciofem:preselect", { detail: { serviceId: service.id } }));
    const el = document.getElementById("reservar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="masajes" className="relative py-16 sm:py-20">
      <LotusIcon className="decor-leaf -top-10 left-4 h-16 w-16 text-violet/40 sm:left-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="section-title-wrap">
          <h2 className="section-title">Masajes</h2>
        </div>
        <div className="mt-6 text-center">
          <p className="mx-auto max-w-2xl text-base text-plum-light sm:text-lg">
            Masajes descontracturantes, estéticos y relajantes, diseñados especialmente para vos.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="card-soft reveal flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="relative mx-auto h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border border-pink-soft shadow-soft sm:mx-0">
                <img src={service.image} alt={service.name} className="h-full w-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 to-pink-soft/10"></div>
              </div>
              <div className="flex flex-1 flex-col text-center sm:text-left">
                <h3 className="font-display text-xl text-plum sm:text-2xl">{service.name}</h3>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-plum-light sm:justify-start">
                  {service.short.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1">
                      <HeartIcon className="h-4 w-4 text-pink" />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-violet sm:justify-start">
                  <span>Duración: {service.duration}</span>
                  <span>Precio: {service.price}</span>
                </div>
                <div className="mt-4 flex justify-center sm:justify-start">
                  <button onClick={() => handleReservar(service)} className="btn-primary">
                    Reservar este masaje
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Masajes;
