import { useState } from "react";
import { HeartIcon } from "../ui/Icons";

const faqs = [
  {
    q: "¿Cómo reservo mi turno?",
    a: "Podés reservar desde esta web con el formulario o directamente por WhatsApp. Al seleccionar un masaje, podés enviarnos un mensaje con tu preferencia de fecha y horario."
  },
  {
    q: "¿Es exclusivo para mujeres?",
    a: "Sí, Espacio Fem es un espacio exclusivo para mujeres."
  },
  {
    q: "¿Cuánto dura cada masaje?",
    a: "La duración puede variar según el tratamiento. En cada tarjeta figura la información correspondiente."
  },
  {
    q: "¿Cómo me preparo para mi turno?",
    a: "Te recomendamos llegar con ropa cómoda. Si tenés alguna duda o preferencia, podés dejarla en el comentario al reservar o consultarnos por WhatsApp."
  },
];

const PreguntasFrecuentes = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="preguntas-frecuentes" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-violet/40 px-5 py-1 text-xs uppercase tracking-[0.4em] text-violet-deep">
            Preguntas frecuentes
          </span>
          <h2 className="font-display text-3xl text-plum sm:text-4xl">Dudas habituales</h2>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <article key={idx} className="card-soft overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                aria-expanded={open === idx}
              >
                <div className="flex items-center gap-3">
                  <HeartIcon className="h-5 w-5 text-pink-soft" />
                  <span className="text-base font-medium text-plum sm:text-lg">{faq.q}</span>
                </div>
                <span className="text-violet-deep">{open === idx ? "−" : "+"}</span>
              </button>
              {open === idx && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-sm text-plum-light">{faq.a}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
