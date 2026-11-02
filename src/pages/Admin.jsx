import { useEffect, useMemo, useState } from "react";
import { supabase, hasSupabase } from "../lib/supabase";
import { HeartIcon } from "../components/ui/Icons";

const getTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
};

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [date, setDate] = useState(getTodayISO());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const adminUser = import.meta.env.VITE_ADMIN_USER || "admin";
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "espaciofem";

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

  useEffect(() => {
    if (localStorage.getItem("espaciofem:admin") === "1") {
      setAuth(true);
    }
  }, []);

  const load = async () => {
    if (!hasSupabase || !supabase) {
      setError("Falta configurar Supabase");
      return;
    }
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .eq("date", date)
      .order("time", { ascending: true });
    if (err) {
      setError(err.message);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth) load();
  }, [auth, date]);

  const updateStatus = async (id, status) => {
    if (!hasSupabase || !supabase) return;
    const { error: err } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (err) {
      setError(err.message);
    } else {
      load();
    }
  };

  const grouped = useMemo(() => bookings, [bookings]);

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
        <form onSubmit={login} className="card-soft w-full max-w-sm p-6 flex flex-col gap-4">
          <div className="text-center">
            <h1 className="font-display text-2xl text-plum">Panel Admin</h1>
            <p className="text-sm text-plum-light">Ingresá para ver la agenda</p>
          </div>
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" className="rounded-pill border border-pink-soft px-4 py-2" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" className="rounded-pill border border-pink-soft px-4 py-2" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="btn-primary">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-plum">Agenda Espacio Fem</h1>
            <p className="text-sm text-plum-light">Turnos del día</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-pill border border-pink-soft px-4 py-2" />
            <button onClick={() => load()} className="btn-secondary">Actualizar</button>
            <a href="/" className="btn-secondary">Volver al sitio</a>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {loading && <p className="text-sm text-plum-light">Cargando...</p>}
        <div className="grid gap-3">
          {grouped.length === 0 && !loading && <p className="text-plum-light">No hay turnos para esta fecha.</p>}
          {grouped.map((b) => (
            <div key={b.id} className="card-soft p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-plum">{b.time}</span>
                  <span className={`text-xs uppercase tracking-[0.25em] ${b.status === "confirmed" ? "text-green-600" : b.status === "cancelled" ? "text-red-500" : "text-violet-deep"}`}>{b.status}</span>
                </div>
                <p className="text-plum"><span className="text-plum-light">Nombre:</span> {b.name}</p>
                {b.phone && <p className="text-plum-light">Tel: {b.phone}</p>}
                <p className="text-plum-light">Servicio: {b.service_name}</p>
                {b.comment && <p className="text-sm text-plum-light">Comentario: {b.comment}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => updateStatus(b.id, "confirmed")} className="btn-secondary">Marcar atendido/confirmado</button>
                <button onClick={() => updateStatus(b.id, "cancelled")} className="btn-secondary">Cancelar</button>
                <button onClick={() => updateStatus(b.id, "pending")} className="btn-secondary">Pasar a pendiente</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
