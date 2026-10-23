// Servidor para probar el sitio en tu compu (npm run dev).
// En internet (Vercel) no se usa: allá las funciones de /api corren solas.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import diagnostico from "./api/diagnostico.js";
import contacto from "./api/contacto.js";
import enviarDiagnostico from "./api/enviar-diagnostico.js";

const PUERTO = Number(process.env.PORT) || 3000;
const PUBLICO = join(import.meta.dirname, "public");
const RUTAS = { "/api/diagnostico": diagnostico, "/api/contacto": contacto, "/api/enviar-diagnostico": enviarDiagnostico };
const TIPOS = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".json": "application/json",
  ".webp": "image/webp", ".txt": "text/plain; charset=utf-8",
};

function leerCuerpo(req) {
  return new Promise((resolver) => {
    let datos = "";
    req.on("data", (trozo) => { datos += trozo; if (datos.length > 64_000) req.destroy(); });
    req.on("end", () => { try { resolver(JSON.parse(datos || "{}")); } catch { resolver(null); } });
    req.on("error", () => resolver(null));
  });
}

// Imita las respuestas de Vercel: res.status(...).json(...)
function adaptar(res) {
  res.status = (codigo) => { res.statusCode = codigo; return res; };
  res.json = (obj) => { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(obj)); return res; };
  return res;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const funcion = RUTAS[url.pathname];

  if (funcion) {
    req.body = await leerCuerpo(req);
    adaptar(res);
    try { await funcion(req, res); }
    catch (e) { console.error(e); if (!res.headersSent) res.status(500).json({ error: "interno" }); }
    return;
  }

  let ruta = decodeURIComponent(url.pathname);
  if (ruta.endsWith("/")) ruta += "index.html";
  const archivo = normalize(join(PUBLICO, ruta));
  if (!archivo.startsWith(PUBLICO + sep)) { res.writeHead(403).end(); return; }
  try {
    const contenido = await readFile(archivo);
    res.writeHead(200, { "Content-Type": TIPOS[extname(archivo)] || "application/octet-stream" });
    res.end(contenido);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado");
  }
}).listen(PUERTO, () => {
  console.log(`\n  Sitio de Nodal funcionando en http://localhost:${PUERTO}\n`);
  if (!process.env.ANTHROPIC_API_KEY) console.log("  · Diagnóstico IA en modo demostración (falta ANTHROPIC_API_KEY en .env)");
  if (!process.env.RESEND_API_KEY) console.log("  · Formulario en modo prueba: los mails se guardan en mensajes-recibidos.txt\n");
});
