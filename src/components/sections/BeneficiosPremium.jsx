import { benefits } from "../../data/benefits";
import { HeartIcon } from "../ui/Icons";

const icons = [
  <svg key="1" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>,
  <svg key="2" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0-9 9 9 9 0 0 0 18 0 6 6 0 0 0-9-9z"/></svg>,
  <svg key="3" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>,
  <svg key="4" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  <svg key="5" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>,
];

const BeneficiosPremium = () => {
  return (
    <section id="beneficios" className="relative py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(217,197,232,0.16),transparent_70%)] -z-10"></div>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/50 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.8)]">
            Beneficios del bienestar
          </span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-tight text-plum drop-shadow-[0_18px_50px_rgba(81,38,83,0.12)]">Tu camino al bienestar integral</h2>
          <p className="mt-3 max-w-3xl text-base text-plum-light sm:text-lg">
            Descubrí la importancia de los masajes como un espacio de cuidado, relajación y autocuidado.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <article key={benefit.id} className="card-soft reveal flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-soft/40 to-lavender/40 text-violet-deep shadow-[0_18px_50px_-20px_rgba(148,87,162,0.9)]">
                  {icons[idx] || icons[0]}
                </div>
                <h3 className="font-display text-xl text-plum">{benefit.title}</h3>
              </div>
              <ul className="flex flex-col gap-3 text-sm text-plum-light">
                {benefit.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <HeartIcon className="mt-1 h-4 w-4 flex-shrink-0 text-pink-soft" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosPremium;
