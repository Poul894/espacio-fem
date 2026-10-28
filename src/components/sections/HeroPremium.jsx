import { siteConfig } from "../../data/config";
import { HeartIcon, WhatsAppIcon } from "../ui/Icons";

const HeroPremium = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pb-28">
      <div className="absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-pink-soft/25 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-[-30%] left-[-15%] h-[520px] w-[520px] rounded-full bg-lavender/25 blur-3xl" aria-hidden="true"></div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-6 py-1 text-xs uppercase tracking-[0.5em] text-violet-deep">
            {siteConfig.exclusive}
          </span>
          <h1 className="font-display text-4xl leading-tight text-plum sm:text-5xl lg:text-6xl xl:text-7xl">
            Tu momento de bienestar empieza acá
          </h1>
          <p className="mt-6 max-w-xl text-base text-plum-light sm:text-lg">
            Masajes estéticos y relajantes pensados para ayudarte a desconectar, dedicarte tiempo y reconectar con tu bienestar.
          </p>
          <p className="mt-6 font-script text-3xl text-violet sm:text-4xl">
            {siteConfig.phrase} <HeartIcon className="ml-1 inline h-6 w-6 text-pink-soft" />
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#reservar" className="btn-primary">Reservar mi turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
          </div>
          <div className="mt-12 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 px-4 py-4 text-center shadow-card">
              <p className="text-sm font-semibold text-plum">Atención personalizada</p>
              <p className="mt-1 text-xs text-plum-light">Pensada especialmente para vos</p>
            </div>
            <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 px-4 py-4 text-center shadow-card">
              <p className="text-sm font-semibold text-plum">Un espacio para vos</p>
              <p className="mt-1 text-xs text-plum-light">Cálido, íntimo y exclusivo para mujeres</p>
            </div>
            <div className="rounded-card border border-pink-soft/40 bg-cream-50/80 px-4 py-4 text-center shadow-card">
              <p className="text-sm font-semibold text-plum">Bienestar y relajación</p>
              <p className="mt-1 text-xs text-plum-light">Momento para desconectar</p>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-10 rounded-[48px] bg-gradient-to-br from-pink-soft/30 via-lavender/25 to-transparent blur-3xl" aria-hidden="true"></div>
            <div className="relative overflow-hidden rounded-[48px] border border-white/80 shadow-soft">
              <img
                src="/assets/masaje-portada.jpeg"
                alt="Masaje relajante en Espacio Fem"
                className="h-[420px] w-full object-cover object-center sm:h-[520px] lg:h-[640px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-plum/10 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-center text-cream-50">
                <p className="font-script text-3xl sm:text-4xl">Un refugio para tu bienestar y calma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
