export const siteConfig = {
  name: "Espacio Fem",
  slogan: "Un refugio para tu bienestar y calma",
  phrase: "Tu bienestar, mi prioridad",
  closingPhrase: "Tu momento también importa",
  exclusive: "Espacio exclusivo para mujeres",
  whatsappNumber: "5491151354124",
  whatsappUrl: "https://wa.me/5491151354124",
  instagram: "https://instagram.com/",
  addressNote: "Consultar ubicación al reservar",
  horarios: {
    diasAtencion: [1, 2, 3, 4, 5, 6], // 0=Domingo,1=Lunes,...,6=Sabado
    diasSinAtencion: [], // ['2025-10-12'] etc
    turnosPorHora: [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ]
  },
  seccionReservasActiva: true
};

export const getHorariosDisponibles = () => siteConfig.horarios.turnosPorHora;
export const getDiasAtencion = () => siteConfig.horarios.diasAtencion;
export const getDiasSinAtencion = () => siteConfig.horarios.diasSinAtencion;
