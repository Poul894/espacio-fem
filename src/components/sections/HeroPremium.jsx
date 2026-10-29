import { siteConfig } from "../../data/config";
import { HeartIcon, WhatsAppIcon } from "../ui/Icons";

const HeroPremium = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-24">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover object-center"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,197,232,0.18),transparent_55%)]"></div>
      </div>
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[48%_52%] lg:gap-12 xl:gap-16">
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-pill border border-violet/50 px-5 py-1 text-[10px] uppercase tracking-[0.5em] text-violet-deep shadow-[0_10px_40px_-20px_rgba(81,38,83,0.8)]">
            {siteConfig.exclusive}
          </span>
          <h1 className="max-w-[620px] font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.06] text-plum drop-shadow-[0_20px_60px_rgba(81,38,83,0.12)]">
            Tu momento de bienestar empieza acá
          </h1>
          <p className="mt-5 max-w-[550px] text-base text-plum-light sm:text-lg">
            Masajes estéticos y relajantes pensados para ayudarte a desconectar, dedicarte tiempo y reconectar con tu bienestar.
          </p>
          <p className="mt-5 font-script text-[clamp(2.1rem,4.5vw,3.6rem)] text-violet drop-shadow-[0_10px_40px_rgba(148,87,162,0.16)]">
            {siteConfig.phrase} <HeartIcon className="ml-1 inline h-5 w-5 text-pink-soft" />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <a href="#reservar" className="inline-flex h-11 items-center justify-center rounded-pill bg-gradient-to-r from-violet to-violet-deep px-7 text-sm font-semibold uppercase tracking-[0.16em] text-cream-50 shadow-[0_18px_60px_-20px_rgba(81,38,83,0.9)] transition-all hover:-translate-y-0.5">Reservar mi turno</a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-violet/80 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.7)] transition-all hover:-translate-y-0.5 hover:bg-violet/5">
              <WhatsAppIcon className="h-5 w-5" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
        <div className="relative z-10 hidden lg:block">
          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <img
              src="/assets/masaje-portada.jpeg"
              alt="Masaje relajante en Espacio Fem"
              className="h-[420px] w-full object-cover object-center lg:h-[560px] xl:h-[620px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
