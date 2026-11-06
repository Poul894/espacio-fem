import { Link } from "react-router-dom";
import { siteConfig } from "../../data/config";
import { WhatsAppIcon } from "../ui/Icons";

const HeroPremium = () => {
  return (
    <section id="inicio" className="relative overflow-hidden h-[88vh] min-h-[560px]">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover object-center"
          src="/videos/hero-portada.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-end px-4 pb-16 text-center sm:pb-20">
        <span className="mb-5 inline-flex items-center gap-2 rounded-pill border border-plum/25 bg-cream-50/70 px-5 py-1.5 text-[10px] uppercase tracking-[0.4em] text-plum backdrop-blur-sm">
          {siteConfig.exclusive}
        </span>
        <h1 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-tight text-plum drop-shadow-[0_8px_30px_rgba(255,252,250,0.6)]">
          {siteConfig.slogan}
        </h1>
        <p className="mt-3 font-script text-2xl text-violet-deep sm:text-3xl">{siteConfig.phrase} ♡</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link to="/reservar" className="btn-hero btn-hero--filled">
            Reservar turno
          </Link>
          <Link to="/tratamientos" className="btn-hero">
            Ver tratamientos
          </Link>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-hero">
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroPremium;
