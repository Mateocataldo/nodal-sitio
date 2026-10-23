// Límite simple de pedidos por persona (por IP), para que nadie abuse
// del diagnóstico ni del formulario. Vive en memoria: alcanza para un
// sitio chico; si el tráfico crece conviene pasarlo a un servicio externo.
const registros = new Map();

export function ipDe(req) {
  const reenviada = req.headers["x-forwarded-for"];
  if (typeof reenviada === "string" && reenviada) return reenviada.split(",")[0].trim();
  return req.socket?.remoteAddress || "desconocida";
}

export function permitido(clave, maximo, ventanaMs) {
  const ahora = Date.now();
  const lista = (registros.get(clave) || []).filter((t) => ahora - t < ventanaMs);
  if (lista.length >= maximo) { registros.set(clave, lista); return false; }
  lista.push(ahora);
  registros.set(clave, lista);
  if (registros.size > 5000) registros.clear();
  return true;
}
