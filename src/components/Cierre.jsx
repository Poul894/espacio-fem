import { HeartIcon } from "./ui/Icons";

const Cierre = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="font-script text-3xl text-violet sm:text-4xl">
          Tu momento también importa <HeartIcon className="ml-1 inline h-6 w-6 text-pink" />
        </p>
        <div className="mt-6">
          <a href="#reservar" className="btn-primary">Reservar turno</a>
        </div>
      </div>
    </section>
  );
};

export default Cierre;
