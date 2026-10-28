import { useState } from "react";
import { services } from "../../data/services";
import { HeartIcon } from "../ui/Icons";

const opciones = [
  { id: "relajar", label: "Relajarme y desconectar", match: ["cuerpo-completo"] },
  { id: "tensiones", label: "Aliviar tensiones musculares", match: ["espalda-cervical-hombros-lumbar", "espalda-cervical-hombros-brazos-lumbar"] },
  { id: "tiempo", label: "Dedicar tiempo a mi bienestar", match: ["cuerpo-completo"] },
  { id: "piernas", label: "Trabajar piernas y cuerpo completo", match: ["piernas-completas", "piernas-completas-ciatica"] },
];

const EncontrarMasaje = () => {
  const [selected, setSelected] = useState(null);

  const results = selected ? services.filter((s) => selected.match.includes(s.id)) : [];

  const handleReservar = (service) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("espaciofem:preselect", { detail: { serviceId: service.id } }));
    const el = document.getElementById("reservar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const consultar = () => {
    const base = "https://wa.me/5491151354124";
    const msg = encodeURIComponent("Hola! Me gustaría que me ayuden a elegir el masaje ideal para mí.");
    window.open(`${base}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="card-soft overflow-hidden">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
                Encontrá tu masaje ideal
              </span>
              <h2 className="font-display text-3xl text-plum sm:text-4xl">¿Qué necesitás hoy?</h2>
              <p className="mt-4 text-base text-plum-light">
                Seleccioná la opción que mejor se adapte a lo que buscás y te mostramos los tratamientos más acordes.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {opciones.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelected(op)}
                    className={`rounded-pill px-5 py-2 text-sm transition-all ${selected?.id === op.id ? "bg-violet text-cream-50" : "border border-violet/40 text-violet-deep hover:bg-violet/5"}`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
              {selected && (
                <div className="mt-8 flex flex-col gap-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-deep">Recomendados para vos</p>
                  {results.length === 0 && <p className="text-sm text-plum-light">Te ayudamos a elegir por WhatsApp.</p>}
                  {results.map((s) => (
                    <div key={s.id} className="flex flex-col gap-3 rounded-card border border-pink-soft/40 bg-cream-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-display text-xl text-plum">{s.name}</p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-plum-light">
                          <HeartIcon className="h-4 w-4 text-pink-soft" />
                          {s.short.join(" · ")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleReservar(s)} className="btn-primary">Reservar</button>
                        <button onClick={consultar} className="btn-secondary">Consultar por WhatsApp</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-pink-soft/25 to-lavender/20 blur-3xl" aria-hidden="true"></div>
              <div className="relative overflow-hidden rounded-[40px]">
                <img src="/assets/flyer-beneficios.jpeg" alt="Bienestar y relajación" className="h-[420px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncontrarMasaje;
