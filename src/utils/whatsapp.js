import { siteConfig } from "../data/config";

export const buildReservaMessage = ({ nombre, telefono, masaje, fecha, hora, comentario }) => {
  const lines = [
    `Hola! Quiero reservar un turno en ${siteConfig.name}.`,
    `Masaje: ${masaje}`,
    `Fecha: ${fecha}`,
    `Hora: ${hora}`,
    `Nombre: ${nombre}`,
  ];
  if (telefono) {
    lines.push(`Teléfono: ${telefono}`);
  }
  if (comentario && comentario.trim()) {
    lines.push(`Comentario: ${comentario.trim()}`);
  }
  return encodeURIComponent(lines.join("\n"));
};

export const openReservaWhatsApp = (data) => {
  const msg = buildReservaMessage(data);
  window.open(`${siteConfig.whatsappUrl}?text=${msg}`, "_blank", "noopener,noreferrer");
};
