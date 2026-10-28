import { siteConfig } from "../data/config";
import { HeartIcon, WhatsAppIcon } from "./ui/Icons";

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-lavender/40 blur-3xl" aria-hidden="true"></div>
      <div className="absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-pink-soft/40 blur-3xl" aria-hidden="true"></div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-violet">
            {siteConfig.exclusive}
          </span>
          <h1 className="font-display text-4xl uppercase tracking-[0.6em] text-plum sm:text-5xl lg:text-6xl">
            ESPACIO FEM
          </h1>
          <p className="mt-3 text-lg text-plum-light sm:text-xl">Masajes estéticos y relajantes</p>
          <p className="mt-6 font-script text-3xl text-violet sm:text-4xl">
            {siteConfig.phrase} <HeartIcon className="ml-1 inline h-6 w-6 text-pink" />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#reservar" className="btn-primary">Reservar turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WhatsAppIcon className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="relative z-10 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-lavender/40 via-pink-soft/30 to-transparent blur-2xl" aria-hidden="true"></div>
            <div className="relative overflow-hidden rounded-[48px] border border-white/70 shadow-soft">
              <img
                src="/assets/flyer-servicios.jpeg"
                alt="Ambiente cálido y relajado en Espacio Fem"
                className="h-[320px] w-[280px] object-cover sm:h-[420px] sm:w-[360px]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/40 to-transparent p-6 text-center text-cream-50">
                <p className="font-script text-2xl">Un refugio para tu bienestar y calma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
