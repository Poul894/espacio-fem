import { Link } from "react-router-dom";
import { LotusIcon } from "./Icons";

const PageHero = ({ eyebrow, title, lead, crumb, children }) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div
        className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-pink-soft/30 to-lavender/25 blur-3xl"
        aria-hidden="true"
      />
      <LotusIcon className="decor-leaf -top-4 left-4 h-20 w-20 text-violet/25 sm:left-10" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <nav aria-label="Migas de pan" className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-plum-light">
          <Link to="/" className="transition-colors hover:text-violet-deep">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span className="text-violet-deep">{crumb}</span>
        </nav>

        <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/50 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.8)]">
          {eyebrow}
        </span>
        <h1 className="font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-tight text-plum drop-shadow-[0_18px_50px_rgba(81,38,83,0.12)]">
          {title}
        </h1>
        {lead && <p className="mx-auto mt-4 max-w-2xl text-base text-plum-light sm:text-lg">{lead}</p>}
        {children && <div className="mt-7 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
