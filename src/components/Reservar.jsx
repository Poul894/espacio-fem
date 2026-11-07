import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../data/config";
import { HeartIcon, LotusIcon } from "./ui/Icons";
import { supabase, hasSupabase } from "../lib/supabase";
import { useServices } from "../hooks/useServices";

const steps = ["Elegir fecha", "Elegir horario", "Tus datos", "Confirmar"];

const getTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const num = priceStr.replace(/[^0-9]/g, "");
  return parseInt(num, 10) || 0;
};

const Reservar = () => {
  const location = useLocation();
  const services = useServices();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [ocupados, setOcupados] = useState({});
  const [saving, setSaving] = useState(false);
  const [showSenia, setShowSenia] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const [availability, setAvailability] = useState({
    diasAtencion: siteConfig.horarios.diasAtencion || [1,2,3,4,5,6],
    diasSinAtencion: siteConfig.horarios.diasSinAtencion || [],
    turnosPorHora: siteConfig.horarios.turnosPorHora || []
  });

  const [seniaConfig, setSeniaConfig] = useState({
    alias: "CAMBIAR_ALIAS_AQUI",
    titulo: "Seña para reservar tu turno",
    texto: "Para confirmar tu turno debés enviar el 50% del valor por transferencia al siguiente alias. Si no se recibe la seña dentro de los próximos 10 minutos, el turno se libera automáticamente.",
    mostrar_whatsapp: false
  });

  const service = useMemo(() => services.find((s) => s.id === serviceId) || services[0], [serviceId]);
  const priceNum = useMemo(() => parsePrice(service?.price), [service]);
  const seniaAmount = useMemo(() => Math.round(priceNum / 2), [priceNum]);

  const loadBookings = async () => {
    if (hasSupabase && supabase) {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("date, time, status, hold_expires_at")
          .or("status.eq.pending,status.eq.held,status.eq.confirmed");
        if (!error && data) {
          const map = {};
          const now = new Date();
          for (const b of data) {
            if (b.status === "cancelled") continue;
            if (b.status === "held" && b.hold_expires_at) {
              if (new Date(b.hold_expires_at) < now) continue;
            }
            if (!map[b.date]) map[b.date] = [];
            map[b.date].push(b.time);
          }
          setOcupados(map);
        }
      } catch (e) {
        // fallback
      }
    }
    try {
      const saved = localStorage.getItem("espaciofem:reservas");
      if (saved && Object.keys(ocupados).length === 0) {
        setOcupados(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  };

  const loadAvailability = async () => {
    if (hasSupabase && supabase) {
      try {
        const { data } = await supabase.from("settings").select("key,value").eq("key", "availability").maybeSingle();
        if (data && data.value) {
          setAvailability((prev) => ({ ...prev, ...data.value }));
        }
      } catch (e) {
        // ignore
      }
    }
  };

  const loadSenia = async () => {
    if (hasSupabase && supabase) {
      try {
        const { data } = await supabase.from("settings").select("key,value").eq("key", "senia").maybeSingle();
        if (data && data.value) {
          setSeniaConfig((prev) => ({ ...prev, ...data.value }));
        }
      } catch (e) {
        // ignore
      }
    }
  };

  useEffect(() => {
    loadBookings();
    loadAvailability();
    loadSenia();
  }, []);

  useEffect(() => {
    loadBookings();
  }, [step, fecha]);

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

  useEffect(() => {
    const id = location.state?.serviceId;
    if (id && services.some((s) => s.id === id)) {
      setServiceId(id);
      setStep(0);
      setHora("");
    }
  }, [location.state]);

  const today = getTodayISO();
  const horarios = availability.turnosPorHora || siteConfig.horarios.turnosPorHora;
  const diasSinAtencion = new Set(availability.diasSinAtencion || []);
  const diasAtencion = availability.diasAtencion || [1,2,3,4,5,6];

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
    if (step === 0) return Boolean(fecha) && !isDateDisabled(fecha);
    if (step === 1) return Boolean(hora) && !isHoraOcupada(fecha, hora);
    if (step === 2) return nombre.trim().length >= 2;
    return true;
  };

  const next = () => {
    if (step < 3 && canNext()) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const confirmar = async () => {
    if (!nombre.trim() || !fecha || !hora || !service) return;
    if (saving) return;
    setSaving(true);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const key = fecha;
    const updated = { ...ocupados };
    updated[key] = Array.from(new Set([...(updated[key] || []), hora]));
    setOcupados(updated);

    try {
      localStorage.setItem("espaciofem:reservas", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    if (hasSupabase && supabase) {
      try {
        const { data, error } = await supabase.from("bookings").insert({
          service_id: service.id,
          service_name: service.name,
          date: fecha,
          time: hora,
          name: nombre.trim(),
          phone: telefono.trim() || null,
          comment: comentario.trim() || null,
          status: "held",
          hold_expires_at: expiresAt
        }).select().single();
        if (!error && data) {
          setBookingId(data.id);
        }

        // guardar/actualizar cliente
        if (telefono.trim()) {
          const { data: existing } = await supabase.from("clients").select("id, notes").eq("phone", telefono.trim()).maybeSingle();
          if (existing) {
            await supabase.from("clients").update({
              name: nombre.trim(),
              last_booking_date: fecha,
              last_booking_time: hora,
              last_service: service.name,
              last_service_id: service.id,
              updated_at: new Date().toISOString()
            }).eq("id", existing.id);
          } else {
            await supabase.from("clients").insert({
              name: nombre.trim(),
              phone: telefono.trim(),
              last_booking_date: fecha,
              last_booking_time: hora,
              last_service: service.name,
              last_service_id: service.id,
              notes: []
            });
          }
        } else {
          const { data: existing } = await supabase.from("clients").select("id").ilike("name", nombre.trim()).limit(1).maybeSingle();
          if (existing) {
            await supabase.from("clients").update({
              last_booking_date: fecha,
              last_booking_time: hora,
              last_service: service.name,
              last_service_id: service.id,
              updated_at: new Date().toISOString()
            }).eq("id", existing.id);
          } else {
            await supabase.from("clients").insert({
              name: nombre.trim(),
              phone: null,
              last_booking_date: fecha,
              last_booking_time: hora,
              last_service: service.name,
              last_service_id: service.id,
              notes: []
            });
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }

    setSaving(false);
    setShowSenia(true);
  };

  return (
    <section id="reservar" className="relative py-16 sm:py-20">
      <LotusIcon className="decor-leaf -top-8 right-4 h-16 w-16 text-violet/40 sm:right-10" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-plum-light">Elegí fecha, horario y completá tus datos. Te redirigimos a WhatsApp para confirmar.</p>
        </div>
        <div className="mt-4 text-center text-sm text-plum-light">
          <p><span className="text-plum">Masaje seleccionado:</span> {service?.name} · {service?.price}</p>
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
              <h3 className="font-display text-2xl text-violet">Paso 1: Elegí fecha</h3>
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
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-violet">Paso 2: Elegí horario</h3>
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
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-violet">Paso 3: Tus datos</h3>
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
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl text-violet">Paso 4: Resumen y confirmación</h3>
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
              <p className="text-sm text-plum-light">Al confirmar se reservará el turno por 10 minutos para que puedas enviar la seña.</p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button onClick={prev} disabled={step === 0} className="btn-secondary disabled:opacity-40">Volver</button>
            {step < 3 ? (
              <button onClick={next} disabled={!canNext()} className="btn-primary disabled:opacity-40">Siguiente</button>
            ) : (
              <button onClick={confirmar} disabled={saving} className="btn-primary disabled:opacity-40">{saving ? "Reservando..." : "Reservar turno"} <HeartIcon className="h-4 w-4" /></button>
            )}
          </div>
        </div>
      </div>
      {showSenia && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-plum/40 backdrop-blur-sm" onClick={() => setShowSenia(false)}></div>
          <div className="relative w-full max-w-lg card-soft p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-pill border border-violet/40 px-4 py-1 text-[10px] uppercase tracking-[0.4em] text-violet-deep">Seña requerida</span>
              <h3 className="font-display text-2xl sm:text-3xl text-violet">{seniaConfig.titulo}</h3>
            </div>
            <div className="rounded-card border border-pink-soft bg-white/70 p-5 flex flex-col gap-3 text-center">
              <p className="text-sm text-plum-light">Tu turno</p>
              <p className="text-plum">{service?.name}</p>
              <p className="text-plum-light">{fecha} a las {hora} · {nombre}</p>
              <div className="mt-2 flex flex-col items-center gap-1">
                <p className="text-sm text-plum-light">Seña a abonar (50%)</p>
                <p className="text-3xl font-display text-plum">${seniaAmount}</p>
                <p className="text-xs text-plum-light">Valor total: {service?.price}</p>
              </div>
              <div className="mt-3 rounded-pill border border-violet/50 px-4 py-2">
                <p className="text-xs uppercase tracking-[0.3em] text-violet-deep">Alias para transferencia</p>
                <p className="mt-1 text-lg text-plum select-all">{seniaConfig.alias}</p>
              </div>
            </div>
            <p className="text-sm text-plum-light text-center">{seniaConfig.texto}</p>
            <p className="text-xs text-center text-plum-light">El turno queda reservado por 10 minutos. Si no se recibe la seña en ese tiempo, se libera automáticamente.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => setShowSenia(false)} className="btn-secondary">Entendido</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservar;
