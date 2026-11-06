import { HeartIcon } from "../ui/Icons";

const Testimonios = () => {
  return (
    <section className="relative pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-8">
        <div className="card-soft reveal mx-auto flex max-w-2xl flex-col items-center gap-4 p-8 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep">
            Experiencias
          </span>
          <h2 className="font-display text-2xl text-plum sm:text-3xl">Dejá tu experiencia</h2>
          <p className="max-w-md text-sm text-plum-light sm:text-base">
            Si ya pasaste por Espacio Fem, podés dejarnos tu experiencia por WhatsApp y la sumamos aquí.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/5491151354124?text=Hola%21%20Quisiera%20dejar%20mi%20experiencia%20en%20Espacio%20Fem." target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-7 text-sm font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-[0_18px_60px_-20px_rgba(81,38,83,0.9)] transition-all hover:-translate-y-0.5">
            <HeartIcon className="mr-2 h-5 w-5" />
            Dejar mi experiencia
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
