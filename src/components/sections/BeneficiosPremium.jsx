import { benefits } from "../../data/benefits";
import { HeartIcon, LotusIcon } from "../ui/Icons";

const icons = [
  <svg key="1" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>,
  <svg key="2" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0-9 9 9 9 0 0 0 18 0 6 6 0 0 0-9-9z"/></svg>,
  <svg key="3" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>,
  <svg key="4" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  <svg key="5" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>,
];

const BeneficiosPremium = () => {
  return (
    <section id="beneficios" className="relative py-16 sm:py-20 lg:py-24">
      <LotusIcon className="decor-leaf -top-10 left-4 h-16 w-16 text-violet/25 sm:left-12" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
            Beneficios del bienestar
          </span>
          <h2 className="font-display text-3xl text-plum sm:text-4xl lg:text-5xl">Tu camino al bienestar integral</h2>
          <p className="mt-4 max-w-3xl text-base text-plum-light sm:text-lg">
            Descubrí la importancia de los masajes como un espacio de cuidado, relajación y autocuidado.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <article key={benefit.id} className="card-soft reveal flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-soft/40 to-lavender/40 text-violet-deep">
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
