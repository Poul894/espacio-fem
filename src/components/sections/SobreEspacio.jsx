import { HeartIcon } from "../ui/Icons";

const SobreEspacio = () => {
  return (
    <section id="sobre-mi" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-lavender/25 to-pink-soft/20 blur-3xl" aria-hidden="true"></div>
          <div className="relative overflow-hidden rounded-[40px] border border-white/80 shadow-soft">
            <img src="/assets/flyer-beneficios.jpeg" alt="Ambiente cálido de Espacio Fem" className="h-[420px] w-full object-cover sm:h-[520px]" loading="lazy" />
          </div>
        </div>
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
            Conocé Espacio Fem
          </span>
          <h2 className="font-display text-3xl text-plum sm:text-4xl lg:text-5xl">Un espacio pensado para vos</h2>
          <p className="mt-6 text-base text-plum-light sm:text-lg">
            Espacio Fem es un refugio íntimo, cálido y exclusivo para mujeres, donde cada masaje está pensado para que puedas desconectar del ritmo diario y dedicarte un momento solo para vos.
          </p>
          <p className="mt-4 text-base text-plum-light sm:text-lg">
            Atención personalizada, ambiente tranquilo y un cuidado delicado para que te vayas sintiéndote renovada, relajada y cómoda.
          </p>
          <div className="mt-8 flex items-center gap-3 text-plum">
            <HeartIcon className="h-5 w-5 text-pink-soft" />
            <p className="font-script text-2xl text-violet">Tu bienestar, mi prioridad ♡</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreEspacio;
