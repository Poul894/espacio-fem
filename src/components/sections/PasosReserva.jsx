import { HeartIcon } from "../ui/Icons";

const pasos = [
  { num: "01", title: "Elegí el masaje que te interesa", desc: "Explorá los tratamientos y seleccioná el que más se ajuste a lo que necesitás." },
  { num: "02", title: "Consultá disponibilidad y coordiná tu turno", desc: "Reservá desde la web o consultá por WhatsApp para coordinar fecha y horario." },
  { num: "03", title: "Disfrutá tu momento de bienestar", desc: "Llegá, relajate y disfrutá de una atención personalizada en un espacio pensado para vos." },
];

const PasosReserva = () => {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
            Experiencia de atención
          </span>
          <h2 className="font-display text-3xl text-plum sm:text-4xl">Así es tu turno en Espacio Fem</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pasos.map((paso) => (
            <article key={paso.num} className="card-soft reveal flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-violet/40">{paso.num}</span>
                <HeartIcon className="h-6 w-6 text-pink-soft" />
              </div>
              <h3 className="font-display text-xl text-plum sm:text-2xl">{paso.title}</h3>
              <p className="text-sm text-plum-light">{paso.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PasosReserva;
