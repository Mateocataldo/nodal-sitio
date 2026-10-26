// Envío de mails a Nodal con Resend (un servicio de envío de mails).
// Si todavía no está configurado, en la compu guarda el mail en
// "mensajes-recibidos.txt" para poder probar el sitio.
import { appendFile } from "node:fs/promises";

const DESTINO = process.env.CONTACTO_DESTINO || "mcataldo@nodaldevelopments.com";
const REMITENTE = process.env.CONTACTO_REMITENTE || "Sitio Nodal <web@nodaldevelopments.com>";

export const MAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const limpiar = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Devuelve { ok: true } o { ok: false, motivo }
export async function enviarANodal({ asunto, texto, responderA }) {
  if (!process.env.RESEND_API_KEY) {
    // Publicado (Netlify corre sobre AWS Lambda) no se puede guardar en archivo
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY) {
      console.error("Falta configurar RESEND_API_KEY: el mail no se envió.");
      return { ok: false, motivo: "sin_configurar" };
    }
    const registro = `\n===== ${new Date().toLocaleString("es-AR")} · ${asunto} =====\n${texto}\n`;
    await appendFile(new URL("../mensajes-recibidos.txt", import.meta.url), registro, "utf8");
    console.log(`Mail guardado en mensajes-recibidos.txt (modo prueba): ${asunto}`);
    return { ok: true, prueba: true };
  }

  const envio = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: REMITENTE, to: [DESTINO], reply_to: responderA, subject: asunto, text: texto }),
  });
  if (!envio.ok) {
    console.error("No se pudo enviar el mail:", envio.status, await envio.text());
    return { ok: false, motivo: "envio" };
  }
  return { ok: true };
}
