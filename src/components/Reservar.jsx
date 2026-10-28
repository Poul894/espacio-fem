import { useEffect, useMemo, useState } from "react";
import { services } from "../data/services";
import { siteConfig } from "../data/config";
import { openReservaWhatsApp } from "../utils/whatsapp";
import { HeartIcon, LotusIcon } from "./ui/Icons";

const steps = ["Elegir masaje", "Elegir fecha", "Elegir horario", "Tus datos", "Confirmar"];

const getTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const Reservar = () => {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [ocupados, setOcupados] = useState({});

  const service = useMemo(() => services.find((s) => s.id === serviceId) || services[0], [serviceId]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("espaciofem:reservas");
      if (saved) {
        setOcupados(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const id = e.detail?.serviceId;
      if (id) {
        setServiceId(id);
        setStep(0);
        setHora("");
      }
    };
    window.addEventListener("espaciofem:preselect", handler);
    return () => window.removeEventListener("espaciofem:preselect", handler);
  }, []);

  const today = getTodayISO();
  const horarios = siteConfig.horarios.turnosPorHora;
  const diasSinAtencion = new Set(siteConfig.horarios.diasSinAtencion || []);
  const diasAtencion = siteConfig.horarios.diasAtencion || [1,2,3,4,5,6];

  const isDateDisabled = (isoDate) => {
    if (!isoDate) return true;
    if (isoDate < today) return true;
    if (diasSinAtencion.has(isoDate)) return true;
    const d = new Date(`${isoDate}T00:00:00`);
    const day = d.getDay();
    return !diasAtencion.includes(day);
  };

  const isHoraOcupada = (isoDate, h) => {
    if (!isoDate || !h) return false;
    return Boolean(ocupados[isoDate]?.includes(h));
  };

  const canNext = () => {
    if (step === 0) return Boolean(serviceId);
    if (step === 1) return Boolean(fecha) && !isDateDisabled(fecha);
    if (step === 2) return Boolean(hora) && !isHoraOcupada(fecha, hora);
    if (step === 3) return nombre.trim().length >= 2;
    return true;
  };

  const next = () => {
    if (step < 4 && canNext()) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const confirmar = () => {
    if (!nombre.trim() || !fecha || !hora || !service) return;
    const key = fecha;
    const updated = { ...ocupados };
    updated[key] = Array.from(new Set([...(updated[key] || []), hora]));
    setOcupados(updated);
    try {
      localStorage.setItem("espaciofem:reservas", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    openReservaWhatsApp({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      masaje: service.name,
      fecha,
      hora,
      comentario
    });
  };

  return (
    <section id="reservar" className="relative py-16 sm:py-20">
      <LotusIcon className="decor-leaf -top-8 right-4 h-16 w-16 text-violet/40 sm:right-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="section-title-wrap">
          <h2 className="section-title">Reservar turno</h2>
        </div>
        <div className="mt-6 text-center">
          <p className="text-plum-light">Elegí tu masaje, fecha y horario. Te redirigimos a WhatsApp para confirmar.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-plum-light">
          {steps.map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${idx === step ? "border-violet bg-violet text-cream-50" : idx < step ? "border-violet/60 text-violet" : "border-pink-soft text-plum-light"}`}>
                {idx + 1}
              </span>
              <span className={idx === step ? "text-violet" : ""}>{s}</span>
              {idx < steps.length - 1 && <span className="hidden sm:inline">—</span>}
            </div>
          ))}
        </div>
        <div className="card-soft mt-8 p-6 sm:p-8">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-plum">Paso 1: Elegí tu masaje</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`flex flex-col items-start gap-1 rounded-card border px-4 py-3 text-left transition-all ${serviceId === s.id ? "border-violet bg-violet/10" : "border-pink-soft hover:border-violet/60"}`}
                  >
                    <span className="font-medium text-plum">{s.name}</span>
                    <span className="text-sm text-plum-light">{s.short.join(" · ")}</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-violet">Duración: {s.duration} · Precio: {s.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-plum">Paso 2: Elegí fecha</h3>
              <input
                type="date"
                min={today}
                value={fecha}
                onChange={(e) => {
                  const val = e.target.value;
                  setFecha(val);
                  setHora("");
                }}
                className="w-full max-w-xs rounded-pill border border-pink-soft bg-white/80 px-4 py-2 text-plum focus:border-violet focus:ring-violet"
              />
              {fecha && isDateDisabled(fecha) && (
                <p className="text-sm text-plum-light">Ese día no hay atención o ya pasó. Elegí otro día.</p>
              )}
              <p className="text-xs text-plum-light">Días de atención: Lunes a Sábado (configurable desde config.js).</p>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-plum">Paso 3: Elegí horario</h3>
              <p className="text-sm text-plum-light">Fecha: <span className="text-plum">{fecha || "—"}</span></p>
              <div className="flex flex-wrap gap-2">
                {horarios.map((h) => {
                  const ocupado = fecha ? isHoraOcupada(fecha, h) : false;
                  const disabled = !fecha || ocupado;
                  return (
                    <button
                      key={h}
                      disabled={disabled}
                      onClick={() => setHora(h)}
                      className={`rounded-pill px-4 py-2 text-sm transition-all ${disabled ? "cursor-not-allowed border border-pink-soft/60 text-plum-light/60" : hora === h ? "bg-violet text-cream-50" : "border border-violet/60 text-violet hover:bg-violet/5"}`}
                    >
                      {h}{ocupado ? " (Ocupado)" : ""}
                    </button>
                  );
                })}
              </div>
              {!fecha && <p className="text-sm text-plum-light">Primero elegí una fecha.</p>}
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-plum">Paso 4: Tus datos</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-plum-light">
                  Nombre y apellido *
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="rounded-pill border border-pink-soft bg-white/80 px-4 py-2 text-plum focus:border-violet focus:ring-violet" placeholder="¿Cómo te llamamos?" />
                </label>
                <label className="flex flex-col gap-1 text-sm text-plum-light">
                  Teléfono (opcional)
                  <input value={telefono} onChange={(e) => setTelefono(e.target.value)} className="rounded-pill border border-pink-soft bg-white/80 px-4 py-2 text-plum focus:border-violet focus:ring-violet" placeholder="11xxxxxxx" />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm text-plum-light">
                Comentario (opcional)
                <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={3} className="rounded-card border border-pink-soft bg-white/80 px-4 py-2 text-plum focus:border-violet focus:ring-violet" placeholder="Alguna preferencia o consulta..." />
              </label>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-plum">Paso 5: Resumen y confirmación</h3>
              <div className="rounded-card border border-pink-soft bg-white/60 p-4 text-sm text-plum-light">
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><span className="text-plum">Masaje:</span> {service?.name}</p>
                  <p><span className="text-plum">Fecha:</span> {fecha}</p>
                  <p><span className="text-plum">Hora:</span> {hora}</p>
                  <p><span className="text-plum">Nombre:</span> {nombre}</p>
                  {telefono && <p><span className="text-plum">Teléfono:</span> {telefono}</p>}
                </div>
                {comentario && <p className="mt-2"><span className="text-plum">Comentario:</span> {comentario}</p>}
              </div>
              <p className="text-sm text-plum-light">Al confirmar, guardamos el turno (en este dispositivo) y te abrimos WhatsApp con el mensaje prellenado.</p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button onClick={prev} disabled={step === 0} className="btn-secondary disabled:opacity-40">Volver</button>
            {step < 4 ? (
              <button onClick={next} disabled={!canNext()} className="btn-primary disabled:opacity-40">Siguiente</button>
            ) : (
              <button onClick={confirmar} className="btn-primary">Confirmar y enviar por WhatsApp <HeartIcon className="h-4 w-4" /></button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservar;
