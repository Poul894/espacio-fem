import { siteConfig } from "../../data/config";
import { HeartIcon } from "../ui/Icons";

const HeroPremium = () => {
  return (
    <section id="inicio" className="relative overflow-hidden h-[90vh] min-h-[680px]">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover object-center"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent"></div>
      </div>
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center text-center px-4">
        <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/60 px-5 py-1 text-[10px] uppercase tracking-[0.5em] text-violet-deep shadow-[0_12px_40px_-18px_rgba(148,87,162,0.9)]">
          {siteConfig.exclusive}
        </span>
        <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] leading-[1.04] text-plum drop-shadow-[0_25px_70px_rgba(81,38,83,0.18)]">
          ESPACIO FEM
        </h1>
        <p className="mt-3 text-lg text-plum-light sm:text-xl">Masajes estéticos y relajantes</p>
        <p className="mt-4 font-script text-[clamp(2.2rem,6vw,4rem)] text-violet drop-shadow-[0_12px_50px_rgba(148,87,162,0.2)]">
          {siteConfig.phrase} <HeartIcon className="ml-1 inline h-6 w-6 text-pink-soft" />
        </p>
      </div>
    </section>
  );
};

export default HeroPremium;
