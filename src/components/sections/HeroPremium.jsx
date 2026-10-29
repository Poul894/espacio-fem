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
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroPremium;
