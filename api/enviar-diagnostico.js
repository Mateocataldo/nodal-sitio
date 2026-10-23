// Cuando la persona lo pide desde el chat del diagnóstico, le manda a Nodal
// un mail con sus datos, el resumen, el diagnóstico y la conversación completa.
import { ipDe, permitido } from "../lib/limite.js";
import { enviarANodal, limpiar, MAIL_VALIDO } from "../lib/correo.js";

const ESTADOS = { fluye: "fluye", se_traba: "SE TRABA", a_profundizar: "a profundizar" };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "metodo" });
  const c = req.body && typeof req.body === "object" ? req.body : {};
  if (limpiar(c.sitio_web, 200)) return res.status(200).json({ ok: true });

  const datos = c.datos && typeof c.datos === "object" ? c.datos : {};
  const nombre = limpiar(datos.nombre, 80);
  const apellido = limpiar(datos.apellido, 80);
  const email = limpiar(datos.email, 160);
  const empresa = limpiar(datos.empresa, 120);
  if (!nombre || !apellido || !MAIL_VALIDO.test(email)) return res.status(400).json({ error: "datos" });

  const relato = limpiar(c.relato, 1200);
  const turnos = Array.isArray(c.turnos)
    ? c.turnos.slice(0, 3).map((t) => ({ pregunta: limpiar(t?.pregunta, 600), respuesta: limpiar(t?.respuesta, 1200) }))
    : [];
  const d = c.diagnostico && typeof c.diagnostico === "object" ? c.diagnostico : {};
  const proceso = Array.isArray(d.proceso) ? d.proceso.slice(0, 8) : [];
  if (!relato) return res.status(400).json({ error: "datos" });

  if (!permitido(`envio-diag:${ipDe(req)}`, 4, 30 * 60 * 1000)) return res.status(429).json({ error: "limite" });

  const linea = "─".repeat(44);
  const texto = [
    "Una persona hizo el diagnóstico en la web y pidió que la contacten.",
    "",
    "DATOS",
    `Nombre: ${nombre} ${apellido}`,
    `Email: ${email}`,
    ...(empresa ? [`Empresa: ${empresa}`] : []),
    `Idioma de la charla: ${c.lang === "en" ? "inglés" : "español"}`,
    "",
    linea,
    "RESUMEN",
    limpiar(d.resumen_para_nodal, 2000) || "(sin resumen)",
    "",
    linea,
    `DIAGNÓSTICO: ${limpiar(d.titulo, 200)}`,
    "",
    "Proceso:",
    ...proceso.map((p, i) => `${i + 1}. ${limpiar(p?.nombre, 80)} [${ESTADOS[p?.estado] || "?"}]: ${limpiar(p?.detalle, 300)}`),
    "",
    `Problema de fondo: ${limpiar(d.problema_de_fondo, 600)}`,
    `Cómo le afecta: ${limpiar(d.impacto, 600)}`,
    "",
    linea,
    "CONVERSACIÓN COMPLETA",
    "",
    `Cliente: ${relato}`,
    ...turnos.flatMap((t) => ["", `Asistente: ${t.pregunta}`, `Cliente: ${t.respuesta}`]),
  ].join("\n");

  const asunto = `Diagnóstico web: ${nombre} ${apellido}${empresa ? ` (${empresa})` : ""}`;
  const r = await enviarANodal({ asunto, texto, responderA: email });
  return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: r.motivo });
}
