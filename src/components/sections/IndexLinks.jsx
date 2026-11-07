import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../ui/Icons";

const CalendarIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </svg>
);

const QuestionIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 1.8-2.3 3.5" />
    <circle cx="12" cy="17" r="0.3" fill="currentColor" />
  </svg>
);

const SpaIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3c-2 2.5-3 4.5-3 6.5a3 3 0 0 0 6 0C15 7.5 14 5.5 12 3Z" />
    <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
  </svg>
);

const HeartbeatIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const LeafPairIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20c6-1 9-5 9-11-6 1-9 5-9 11Z" />
    <path d="M20 14c-4-1-7-4-7-9 4 1 7 4 7 9Z" />
  </svg>
);

const sections = [
  {
    to: "/tratamientos",
    icon: SpaIcon,
    image: "/assets/boton_1_masajes.png",
    title: "Tratamientos",
    text: "Masajes descontracturantes, relajantes y estéticos pensados para vos.",
  },
  {
    to: "/beneficios",
    icon: HeartbeatIcon,
    image: "/assets/boton_2_bienestar.png",
    title: "Beneficios",
    text: "Por qué un masaje es mucho más que un momento de relax.",
  },
  {
    to: "/sobre-nosotros",
    icon: LeafPairIcon,
    image: "/assets/boton_3_espacio.png",
    title: "Sobre nosotros",
    text: "Un refugio íntimo y cálido, exclusivo para mujeres.",
  },
  {
    to: "/preguntas-frecuentes",
    icon: QuestionIcon,
    image: null,
    title: "Preguntas frecuentes",
    text: "Todo lo que necesitás saber antes de tu turno.",
  },
  {
    to: "/reservar",
    icon: CalendarIcon,
    image: "/assets/boton_4_turnos.png",
    title: "Reservar turno",
    text: "Elegí día, horario y confirmá tu momento de bienestar.",
  },
];

const IndexLinks = () => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ to, icon: Icon, image, title, text }) => (
            <Link key={to} to={to} className="card-spa reveal group">
              {image ? (
                <div className="relative h-[42%] min-h-[170px] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="card-spa__img h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <svg
                    className="absolute -bottom-px left-0 h-8 w-full text-cream-50 sm:h-10"
                    viewBox="0 0 400 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 40 C 80 0, 160 40, 200 20 C 240 0, 320 40, 400 10 L 400 40 L 0 40 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              ) : (
                <div className="px-6 pt-6 sm:px-7 sm:pt-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-soft/40 to-lavender/40 text-violet-deep shadow-[0_18px_50px_-20px_rgba(148,87,162,0.9)]">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-2 p-6 pt-5 sm:p-7 sm:pt-5">
                <h2 className="font-display text-xl text-violet-deep">{title}</h2>
                <p className="text-sm text-violet-muted">{text}</p>
                <span className="btn-card mt-auto w-fit">
                  Descubrir más
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexLinks;
