import { useState } from "react";
import { services } from "../../data/services";
import { HeartIcon } from "../ui/Icons";

const Tratamientos = () => {
  const [selected, setSelected] = useState(services[0] || null);

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
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/50 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.8)]">
            Tratamientos
          </span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-tight text-plum drop-shadow-[0_18px_50px_rgba(81,38,83,0.12)]">Tratamientos y masajes</h2>
          <p className="mt-3 max-w-2xl text-base text-plum-light sm:text-lg">
            Elegí uno para ver el detalle y reservar.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelected(service)}
              className={`group relative flex flex-col overflow-hidden rounded-[18px] border text-left shadow-[0_30px_70px_-60px_rgba(81,38,83,0.9)] transition-all ${selected?.id === service.id ? "border-violet/70 ring-1 ring-violet/40" : "border-pink-soft/40 hover:-translate-y-1"}`}
            >
              <div className="relative h-36 w-full">
                <img src={service.image} alt={service.name} className="h-full w-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/25 to-transparent"></div>
              </div>
              <div className="flex flex-col gap-1 bg-cream-50/90 px-3 py-2">
                <p className="text-sm font-medium text-plum line-clamp-2">{service.name}</p>
                <p className="text-xs uppercase tracking-[0.28em] text-violet-deep">{service.price}</p>
              </div>
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-8 card-soft grid gap-6 overflow-hidden p-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative h-64 w-full lg:h-full">
              <img src={selected.image} alt={selected.name} className="h-full w-full object-cover object-center" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/18 to-transparent"></div>
            </div>
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-2xl text-plum sm:text-3xl">{selected.name}</h3>
                <p className="mt-2 text-sm text-plum-light">{selected.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-plum-light">
                {selected.short.map((s, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 rounded-pill border border-pink-soft/60 px-3 py-1">
                    <HeartIcon className="h-4 w-4 text-pink-soft" />
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-violet-deep">
                <span>Duración: {selected.duration}</span>
                <span>Precio: {selected.price}</span>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <button onClick={() => handleReservar(selected)} className="inline-flex h-11 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-7 text-sm font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-[0_18px_60px_-20px_rgba(81,38,83,0.9)] transition-all hover:-translate-y-0.5">Reservar este masaje</button>
                <a href={siteConfigWhatsapp(selected)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center rounded-pill border border-violet/80 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.7)] transition-all hover:-translate-y-0.5 hover:bg-violet/5">Consultar por WhatsApp</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tratamientos;
