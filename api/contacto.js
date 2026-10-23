// Formulario de contacto de la sección "Contacto".
import { ipDe, permitido } from "../lib/limite.js";
import { enviarANodal, limpiar, MAIL_VALIDO } from "../lib/correo.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "metodo" });
  const c = req.body && typeof req.body === "object" ? req.body : {};

  // Campo trampa: si viene lleno es un bot. Le decimos que salió bien y no hacemos nada.
  if (limpiar(c.sitio_web, 200)) return res.status(200).json({ ok: true });

  const nombre = limpiar(c.nombre, 80);
  const apellido = limpiar(c.apellido, 80);
  const email = limpiar(c.email, 160);
  const mensaje = limpiar(c.mensaje, 4000);
  const idioma = c.lang === "en" ? "inglés" : "español";

  if (!nombre || !apellido || !MAIL_VALIDO.test(email) || mensaje.length < 5) {
    return res.status(400).json({ error: "datos" });
  }
  if (!permitido(`contacto:${ipDe(req)}`, 5, 30 * 60 * 1000)) return res.status(429).json({ error: "limite" });

  const texto = [
    `Nombre: ${nombre} ${apellido}`,
    `Email: ${email}`,
    `Idioma del sitio: ${idioma}`,
    "",
    "Mensaje:",
    mensaje,
  ].join("\n");

  const r = await enviarANodal({ asunto: `Nueva consulta desde la web: ${nombre} ${apellido}`, texto, responderA: email });
  return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: r.motivo });
}
