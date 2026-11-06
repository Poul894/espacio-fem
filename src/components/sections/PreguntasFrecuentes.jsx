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
    <section className="relative pb-16 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col gap-3">
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
