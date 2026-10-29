import { siteConfig } from "../../data/config";
import { HeartIcon, WhatsAppIcon } from "../ui/Icons";

const HeroPremium = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
      <div className="absolute -top-40 right-[-10%] h-[360px] w-[360px] rounded-full bg-pink-soft/20 blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-[-35%] left-[-15%] h-[420px] w-[420px] rounded-full bg-lavender/20 blur-3xl" aria-hidden="true"></div>
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[48%_52%] lg:gap-12 xl:gap-16">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-[10px] uppercase tracking-[0.5em] text-violet-deep">
            {siteConfig.exclusive}
          </span>
          <h1 className="max-w-[620px] font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.08] text-plum">
            Tu momento de bienestar empieza acá
          </h1>
          <p className="mt-5 max-w-[550px] text-base text-plum-light sm:text-lg">
            Masajes estéticos y relajantes pensados para ayudarte a desconectar, dedicarte tiempo y reconectar con tu bienestar.
          </p>
          <p className="mt-5 font-script text-[clamp(2rem,4vw,3.25rem)] text-violet">
            {siteConfig.phrase} <HeartIcon className="ml-1 inline h-5 w-5 text-pink-soft" />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <a href="#reservar" className="inline-flex h-11 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-7 text-sm font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-button transition-all hover:-translate-y-0.5">Reservar mi turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-violet/70 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-violet-deep transition-all hover:-translate-y-0.5 hover:bg-violet/5">
              <WhatsAppIcon className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="relative z-10">
          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-pink-soft/25 via-lavender/20 to-transparent blur-3xl" aria-hidden="true"></div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/80 shadow-soft">
              <img
                src="/assets/masaje-portada.jpeg"
                alt="Masaje relajante en Espacio Fem"
                className="h-[380px] w-full object-cover object-center sm:h-[460px] lg:h-[560px] xl:h-[600px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/25 via-plum/5 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
