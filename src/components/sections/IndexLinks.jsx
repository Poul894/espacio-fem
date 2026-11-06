import { Link } from "react-router-dom";

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
    title: "Tratamientos",
    text: "Masajes descontracturantes, relajantes y estéticos pensados para vos.",
  },
  {
    to: "/beneficios",
    icon: HeartbeatIcon,
    title: "Beneficios",
    text: "Por qué un masaje es mucho más que un momento de relax.",
  },
  {
    to: "/sobre-nosotros",
    icon: LeafPairIcon,
    title: "Sobre nosotros",
    text: "Un refugio íntimo y cálido, exclusivo para mujeres.",
  },
  {
    to: "/preguntas-frecuentes",
    icon: QuestionIcon,
    title: "Preguntas frecuentes",
    text: "Todo lo que necesitás saber antes de tu turno.",
  },
  {
    to: "/reservar",
    icon: CalendarIcon,
    title: "Reservar turno",
    text: "Elegí día, horario y confirmá tu momento de bienestar.",
  },
];

const IndexLinks = () => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ to, icon: Icon, title, text }) => (
            <Link key={to} to={to} className="card-soft reveal group flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-soft/40 to-lavender/40 text-violet-deep shadow-[0_18px_50px_-20px_rgba(148,87,162,0.9)]">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl text-plum">{title}</h2>
                <p className="mt-2 text-sm text-plum-light">{text}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet transition-colors group-hover:text-violet-deep">
                Descubrir más →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexLinks;
