import { useEffect, useMemo, useState } from "react";
import { supabase, hasSupabase } from "../lib/supabase";
import { HeartIcon } from "../components/ui/Icons";

const getTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const getNowISO = () => {
  const d = new Date();
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const dayNames = [
  { id: 0, label: "Domingo" },
  { id: 1, label: "Lunes" },
  { id: 2, label: "Martes" },
  { id: 3, label: "Miércoles" },
  { id: 4, label: "Jueves" },
  { id: 5, label: "Viernes" },
  { id: 6, label: "Sábado" },
];

const defaultSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const [tab, setTab] = useState("agenda");
  const [date, setDate] = useState(getTodayISO());

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const [availability, setAvailability] = useState({
    diasAtencion: [1, 2, 3, 4, 5, 6],
    diasSinAtencion: [],
    turnosPorHora: defaultSlots,
  });
  const [savingAvail, setSavingAvail] = useState(false);

  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState("");
  const [savingVideos, setSavingVideos] = useState(false);

  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientSearch, setClientSearch] = useState("");
  const [clientNote, setClientNote] = useState({
    fecha: getTodayISO(),
    tratamiento: "",
    productos: "",
    aceiteCremas: "",
    recomendacion: "",
    nota: "",
  });
  const [savingClientNote, setSavingClientNote] = useState(false);

  const adminUser = import.meta.env.VITE_ADMIN_USER || "admin";
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "espaciofem";

  useEffect(() => {
    if (localStorage.getItem("espaciofem:admin") === "1") {
      setAuth(true);
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (user === adminUser && pass === adminPass) {
      setAuth(true);
      setError("");
      localStorage.setItem("espaciofem:admin", "1");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    localStorage.removeItem("espaciofem:admin");
    setAuth(false);
    setUser("");
    setPass("");
  };

  const loadBookings = async () => {
    if (!hasSupabase || !supabase) {
      setError("Falta configurar Supabase");
      return;
    }
    setLoadingBookings(true);
    setError("");
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    if (err) {
      setError(err.message);
    } else {
      setBookings(data || []);
    }
    setLoadingBookings(false);
  };

  const loadSettings = async () => {
    if (!hasSupabase || !supabase) return;
    const { data } = await supabase.from("settings").select("key,value");
    if (data) {
      for (const row of data) {
        if (row.key === "availability" && row.value) {
          setAvailability((prev) => ({ ...prev, ...row.value }));
        }
        if (row.key === "videos" && Array.isArray(row.value)) {
          setVideos(row.value);
        }
      }
    }
  };

  const loadClients = async () => {
    if (!hasSupabase || !supabase) return;
    setLoadingClients(true);
    const { data } = await supabase.from("clients").select("*").order("updated_at", { ascending: false });
    setClients(data || []);
    setLoadingClients(false);
  };

  useEffect(() => {
    if (auth) {
      loadBookings();
      loadSettings();
      loadClients();
    }
  }, [auth]);

  const updateStatus = async (id, status) => {
    if (!hasSupabase || !supabase) return;
    await supabase.from("bookings").update({ status }).eq("id", id);
    loadBookings();
  };

  const saveAvailability = async () => {
    if (!hasSupabase || !supabase) return;
    setSavingAvail(true);
    await supabase.from("settings").upsert({ key: "availability", value: availability, updated_at: new Date().toISOString() });
    setSavingAvail(false);
    alert("Disponibilidad guardada");
  };

  const saveVideos = async () => {
    if (!hasSupabase || !supabase) return;
    setSavingVideos(true);
    await supabase.from("settings").upsert({ key: "videos", value: videos, updated_at: new Date().toISOString() });
    setSavingVideos(false);
    alert("Videos guardados");
  };

  const addVideo = () => {
    if (!newVideo.trim()) return;
    setVideos((prev) => [...prev, { id: Date.now().toString(), url: newVideo.trim() }]);
    setNewVideo("");
  };

  const removeVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleDay = (dayId) => {
    setAvailability((prev) => {
      const exists = prev.diasAtencion.includes(dayId);
      if (exists) {
        return { ...prev, diasAtencion: prev.diasAtencion.filter((d) => d !== dayId) };
      }
      return { ...prev, diasAtencion: [...prev.diasAtencion, dayId].sort() };
    });
  };

  const toggleSlot = (slot) => {
    setAvailability((prev) => {
      const exists = prev.turnosPorHora.includes(slot);
      if (exists) {
        return { ...prev, turnosPorHora: prev.turnosPorHora.filter((s) => s !== slot) };
      }
      return { ...prev, turnosPorHora: [...prev.turnosPorHora, slot].sort() };
    });
  };

  const todayStr = getNowISO();
  const bookingsSorted = [...bookings].sort((a, b) => {
    if (a.date === b.date) return a.time.localeCompare(b.time);
    return a.date.localeCompare(b.date);
  });

  const nextBooking = bookingsSorted.find((b) => {
    if (b.status === "cancelled") return false;
    if (b.date > todayStr) return true;
    if (b.date === todayStr) return true;
    return false;
  });

  const totalPending = bookings.filter((b) => b.status === "pending").length;
  const totalConfirmed = bookings.filter((b) => b.status === "confirmed").length;
  const totalToday = bookings.filter((b) => b.date === todayStr && b.status !== "cancelled").length;
  const totalAll = bookings.filter((b) => b.status !== "cancelled").length;

  const bookingsByDate = bookings.filter((b) => b.date === date && b.status !== "cancelled").sort((a,b)=>a.time.localeCompare(b.time));

  const filteredClients = clients.filter((c) => {
    const term = clientSearch.toLowerCase();
    if (!term) return true;
    return (c.name || "").toLowerCase().includes(term) || (c.phone || "").toLowerCase().includes(term);
  });

  const openClient = async (bookingOrClient) => {
    if (!hasSupabase || !supabase) return;
    let client = null;
    if (bookingOrClient.phone) {
      const { data } = await supabase.from("clients").select("*").eq("phone", bookingOrClient.phone).maybeSingle();
      client = data;
    }
    if (!client && bookingOrClient.name) {
      const { data } = await supabase.from("clients").select("*").ilike("name", bookingOrClient.name).maybeSingle();
      client = data;
    }
    if (!client) {
      const { data } = await supabase.from("clients").insert({
        name: bookingOrClient.name || "",
        phone: bookingOrClient.phone || null,
        last_booking_date: bookingOrClient.date,
        last_booking_time: bookingOrClient.time,
        last_service: bookingOrClient.service_name,
        notes: []
      }).select().single();
      client = data;
      loadClients();
    } else {
      await supabase.from("clients").update({
        name: bookingOrClient.name || client.name,
        last_booking_date: bookingOrClient.date,
        last_booking_time: bookingOrClient.time,
        last_service: bookingOrClient.service_name,
        updated_at: new Date().toISOString()
      }).eq("id", client.id);
      loadClients();
    }
    setSelectedClient(client);
    setClientNote({ fecha: getTodayISO(), tratamiento: bookingOrClient.service_name || "", productos: "", aceiteCremas: "", recomendacion: "", nota: "" });
  };

  const saveClientNote = async () => {
    if (!selectedClient || !hasSupabase || !supabase) return;
    setSavingClientNote(true);
    const notes = Array.isArray(selectedClient.notes) ? [...selectedClient.notes] : [];
    notes.unshift({
      id: Date.now().toString(),
      ...clientNote,
      created_at: new Date().toISOString()
    });
    await supabase.from("clients").update({ notes, updated_at: new Date().toISOString() }).eq("id", selectedClient.id);
    setSelectedClient({ ...selectedClient, notes });
    loadClients();
    setSavingClientNote(false);
    setClientNote({ fecha: getTodayISO(), tratamiento: "", productos: "", aceiteCremas: "", recomendacion: "", nota: "" });
    alert("Nota guardada en la ficha del cliente");
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-cream via-pink-soft/10 to-lavender/10">
        <form onSubmit={login} className="card-soft w-full max-w-sm p-7 flex flex-col gap-4 shadow-[0_40px_80px_-60px_rgba(81,38,83,0.9)]">
          <div className="flex flex-col items-center text-center gap-2">
            <img src="/assets/logo.jpeg" alt="Espacio Fem" className="h-16 w-16 rounded-full object-cover shadow-[0_20px_60px_-30px_rgba(148,87,162,0.9)]" />
            <h1 className="font-display text-2xl text-plum">Panel Administrativo</h1>
            <p className="text-sm text-plum-light">Ingresá para gestionar agenda, clientes y configuración</p>
          </div>
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button className="btn-primary">Ingresar al panel</button>
          <a href="/" className="text-center text-sm text-plum-light hover:text-violet">Volver al sitio</a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-pink-soft/5">
      <header className="border-b border-pink-soft/40 bg-cream/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.jpeg" alt="Espacio Fem" className="h-12 w-12 rounded-full object-cover shadow-[0_18px_50px_-25px_rgba(148,87,162,0.9)]" />
            <div>
              <h1 className="font-display text-xl sm:text-2xl text-plum">Espacio Fem | Panel Admin</h1>
              <p className="text-xs text-plum-light">Gestión de agenda, clientes, disponibilidad y videos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="btn-secondary">Ir al sitio</a>
            <button onClick={logout} className="btn-secondary">Cerrar sesión</button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap gap-2 pb-3">
          <button onClick={() => setTab("agenda")} className={`rounded-pill px-4 py-1.5 text-sm ${tab === "agenda" ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>Agenda</button>
          <button onClick={() => setTab("clientes")} className={`rounded-pill px-4 py-1.5 text-sm ${tab === "clientes" ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>Clientes / Fichas</button>
          <button onClick={() => setTab("disponibilidad")} className={`rounded-pill px-4 py-1.5 text-sm ${tab === "disponibilidad" ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>Modificar turnos disponibles</button>
          <button onClick={() => setTab("videos")} className={`rounded-pill px-4 py-1.5 text-sm ${tab === "videos" ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>Videos del home</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col gap-8">
        {error && <div className="rounded-card border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-soft p-5 flex flex-col gap-1">
            <p className="text-sm text-plum-light">Próximo turno</p>
            {nextBooking ? (
              <>
                <p className="text-lg text-plum">{nextBooking.date} - {nextBooking.time}</p>
                <p className="text-sm text-plum-light">{nextBooking.name} · {nextBooking.service_name}</p>
              </>
            ) : (
              <p className="text-plum-light">Sin próximos turnos</p>
            )}
          </div>
          <div className="card-soft p-5 flex flex-col gap-1">
            <p className="text-sm text-plum-light">Turnos hoy</p>
            <p className="text-3xl font-display text-plum">{totalToday}</p>
          </div>
          <div className="card-soft p-5 flex flex-col gap-1">
            <p className="text-sm text-plum-light">Pendientes</p>
            <p className="text-3xl font-display text-plum">{totalPending}</p>
          </div>
          <div className="card-soft p-5 flex flex-col gap-1">
            <p className="text-sm text-plum-light">Confirmados / Total activos</p>
            <p className="text-3xl font-display text-plum">{totalConfirmed} / {totalAll}</p>
          </div>
        </section>

        {tab === "agenda" && (
          <section className="card-soft p-6 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-plum">Agenda</h2>
                <p className="text-sm text-plum-light">Ver turnos por fecha, cambiar estado o abrir ficha del cliente</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
                <button onClick={loadBookings} className="btn-secondary">Actualizar</button>
              </div>
            </div>
            {loadingBookings && <p className="text-sm text-plum-light">Cargando turnos...</p>}
            <div className="grid gap-3">
              {bookingsByDate.length === 0 && !loadingBookings && <p className="text-plum-light">No hay turnos para esta fecha.</p>}
              {bookingsByDate.map((b) => (
                <div key={b.id} className="rounded-card border border-pink-soft/40 bg-white/70 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-lg font-medium text-plum">{b.time}</span>
                      <span className={`text-xs uppercase tracking-[0.25em] ${b.status === "confirmed" ? "text-green-600" : b.status === "cancelled" ? "text-red-500" : "text-violet-deep"}`}>{b.status}</span>
                    </div>
                    <p className="text-plum"><span className="text-plum-light">Cliente:</span> {b.name}</p>
                    {b.phone && <p className="text-plum-light">Teléfono: {b.phone}</p>}
                    <p className="text-plum-light">Tratamiento: {b.service_name}</p>
                    {b.comment && <p className="text-sm text-plum-light">Comentario: {b.comment}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={() => openClient(b)} className="btn-secondary">Abrir ficha cliente</button>
                    <button onClick={() => updateStatus(b.id, "confirmed")} className="btn-secondary">Confirmar / Atendido</button>
                    <button onClick={() => updateStatus(b.id, "pending")} className="btn-secondary">Pasar a pendiente</button>
                    <button onClick={() => updateStatus(b.id, "cancelled")} className="btn-secondary">Cancelar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "clientes" && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="card-soft p-5 flex flex-col gap-4">
              <div>
                <h2 className="font-display text-2xl text-plum">Clientes</h2>
                <p className="text-sm text-plum-light">Listado con última visita</p>
              </div>
              <input value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} placeholder="Buscar por nombre o teléfono" className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
              <div className="flex flex-col gap-2 max-h-[560px] overflow-auto pr-1">
                {filteredClients.map((c) => (
                  <button key={c.id} onClick={() => setSelectedClient(c)} className={`text-left rounded-card border px-4 py-3 ${selectedClient?.id === c.id ? "border-violet bg-violet/5" : "border-pink-soft/40 bg-white/70"}`}>
                    <p className="text-plum">{c.name || "Sin nombre"}</p>
                    <p className="text-sm text-plum-light">{c.phone || "Sin teléfono"}</p>
                    {c.last_booking_date && <p className="text-xs text-plum-light mt-1">Última visita: {c.last_booking_date} {c.last_booking_time} · {c.last_service}</p>}
                  </button>
                ))}
                {filteredClients.length === 0 && <p className="text-sm text-plum-light">Sin clientes cargados aún</p>}
              </div>
            </div>
            <div className="card-soft p-6 flex flex-col gap-6">
              {!selectedClient ? (
                <div className="flex flex-col items-center text-center py-10 gap-2">
                  <p className="font-display text-xl text-plum">Seleccioná un cliente</p>
                  <p className="text-plum-light">Podés abrirlo desde la agenda o desde este listado para guardar notas, productos usados y recomendaciones.</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-plum">{selectedClient.name || "Ficha cliente"}</h2>
                      <p className="text-sm text-plum-light">{selectedClient.phone ? `Tel: ${selectedClient.phone}` : "Sin teléfono"}</p>
                    </div>
                    {selectedClient.last_booking_date && <p className="text-sm text-plum-light">Última visita: {selectedClient.last_booking_date} a las {selectedClient.last_booking_time} · {selectedClient.last_service}</p>}
                  </div>
                  <div className="rounded-card border border-pink-soft/40 bg-white/70 p-5 flex flex-col gap-4">
                    <h3 className="font-display text-xl text-plum">Agregar nota / seguimiento</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-1 text-sm text-plum-light">Fecha
                        <input type="date" value={clientNote.fecha} onChange={(e) => setClientNote({ ...clientNote, fecha: e.target.value })} className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
                      </label>
                      <label className="flex flex-col gap-1 text-sm text-plum-light">Tratamiento realizado
                        <input value={clientNote.tratamiento} onChange={(e) => setClientNote({ ...clientNote, tratamiento: e.target.value })} className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
                      </label>
                      <label className="flex flex-col gap-1 text-sm text-plum-light">Productos utilizados
                        <input value={clientNote.productos} onChange={(e) => setClientNote({ ...clientNote, productos: e.target.value })} className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
                      </label>
                      <label className="flex flex-col gap-1 text-sm text-plum-light">Cremas / Aceites usados
                        <input value={clientNote.aceiteCremas} onChange={(e) => setClientNote({ ...clientNote, aceiteCremas: e.target.value })} className="rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1 text-sm text-plum-light">Recomendación para el próximo turno
                      <textarea value={clientNote.recomendacion} onChange={(e) => setClientNote({ ...clientNote, recomendacion: e.target.value })} rows={3} className="rounded-card border border-pink-soft px-4 py-2 bg-white/80" />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-plum-light">Otras observaciones / notas
                      <textarea value={clientNote.nota} onChange={(e) => setClientNote({ ...clientNote, nota: e.target.value })} rows={3} className="rounded-card border border-pink-soft px-4 py-2 bg-white/80" />
                    </label>
                    <div className="flex justify-end">
                      <button onClick={saveClientNote} disabled={savingClientNote} className="btn-primary disabled:opacity-40">{savingClientNote ? "Guardando..." : "Guardar en ficha"}</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-xl text-plum">Historial de fichas</h3>
                    {(Array.isArray(selectedClient.notes) ? selectedClient.notes : []).length === 0 && <p className="text-plum-light">Aún no hay notas guardadas para este cliente.</p>}
                    {(Array.isArray(selectedClient.notes) ? selectedClient.notes : []).map((n) => (
                      <div key={n.id} className="rounded-card border border-pink-soft/40 bg-white/70 p-5 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between">
                          <p className="text-plum">Registro del {n.fecha}</p>
                          <p className="text-xs text-plum-light">{n.created_at ? new Date(n.created_at).toLocaleString() : ""}</p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 text-sm text-plum-light">
                          {n.tratamiento && <p><span className="text-plum">Tratamiento:</span> {n.tratamiento}</p>}
                          {n.productos && <p><span className="text-plum">Productos:</span> {n.productos}</p>}
                          {n.aceiteCremas && <p><span className="text-plum">Cremas/Aceites:</span> {n.aceiteCremas}</p>}
                        </div>
                        {n.recomendacion && <div><p className="text-plum text-sm">Recomendación</p><p className="text-sm text-plum-light">{n.recomendacion}</p></div>}
                        {n.nota && <div><p className="text-plum text-sm">Observaciones</p><p className="text-sm text-plum-light">{n.nota}</p></div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {tab === "disponibilidad" && (
          <section className="card-soft p-6 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-plum">Modificar turnos disponibles</h2>
                <p className="text-sm text-plum-light">Seleccioná qué días atiendes y qué horarios querés habilitar para que el cliente pueda elegir</p>
              </div>
              <button onClick={saveAvailability} disabled={savingAvail} className="btn-primary disabled:opacity-40">{savingAvail ? "Guardando..." : "Guardar disponibilidad"}</button>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-plum">Días de atención</h3>
              <div className="flex flex-wrap gap-2">
                {dayNames.map((d) => {
                  const active = availability.diasAtencion.includes(d.id);
                  return (
                    <button key={d.id} onClick={() => toggleDay(d.id)} className={`rounded-pill px-4 py-2 text-sm ${active ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>{d.label}</button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-plum">Horarios habilitados</h3>
              <div className="flex flex-wrap gap-2">
                {defaultSlots.map((s) => {
                  const active = availability.turnosPorHora.includes(s);
                  return (
                    <button key={s} onClick={() => toggleSlot(s)} className={`rounded-pill px-4 py-2 text-sm ${active ? "bg-violet text-cream-50" : "border border-violet/40 text-violet"}`}>{s}</button>
                  );
                })}
              </div>
              <p className="text-xs text-plum-light">Solo se van a mostrar al cliente los horarios que marques acá.</p>
            </div>
          </section>
        )}

        {tab === "videos" && (
          <section className="card-soft p-6 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-plum">Videos para mostrar en el home</h2>
                <p className="text-sm text-plum-light">Agregá URLs de YouTube (se mostrarán en la sección de videos)</p>
              </div>
              <button onClick={saveVideos} disabled={savingVideos} className="btn-primary disabled:opacity-40">{savingVideos ? "Guardando..." : "Guardar videos"}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <input value={newVideo} onChange={(e) => setNewVideo(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="flex-1 min-w-[260px] rounded-pill border border-pink-soft px-4 py-2 bg-white/80" />
              <button onClick={addVideo} className="btn-secondary">Agregar video</button>
            </div>
            <div className="grid gap-3">
              {videos.map((v) => (
                <div key={v.id} className="rounded-card border border-pink-soft/40 bg-white/70 p-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-plum-light break-all">{v.url}</p>
                  <button onClick={() => removeVideo(v.id)} className="btn-secondary">Quitar</button>
                </div>
              ))}
              {videos.length === 0 && <p className="text-plum-light">No hay videos cargados. Agregá al menos uno para mostrarlos en la home.</p>}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
