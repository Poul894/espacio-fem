import { Link } from "react-router-dom";
import { services } from "../../data/services";

const Tratamientos = () => {
  return (
    <section id="tratamientos" className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/50 px-5 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.8)]">
            Tratamientos
          </span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-tight text-plum drop-shadow-[0_18px_50px_rgba(81,38,83,0.12)]">Tratamientos y masajes</h2>
          <p className="mt-3 max-w-2xl text-base text-plum-light sm:text-lg">
            Elegí uno para ver toda la información y reservar.
          </p>
        </div>
        <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/tratamientos/${service.id}`}
              className="group relative flex flex-col overflow-hidden rounded-[16px] border border-pink-soft/40 text-left shadow-[0_30px_70px_-60px_rgba(81,38,83,0.9)] transition-all hover:-translate-y-1 hover:border-violet/70"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/28 to-transparent"></div>
              </div>
              <div className="flex flex-1 flex-col gap-1 bg-cream-50/95 px-2.5 py-2">
                <p className="line-clamp-2 text-xs font-medium text-plum">{service.name}</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-violet-deep">{service.price}</p>
                <span className="mt-auto pt-1 text-[10px] uppercase tracking-[0.24em] text-violet transition-colors group-hover:text-violet-deep">
                  Ver detalle →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tratamientos;
