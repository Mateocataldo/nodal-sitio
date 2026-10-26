# Sitio web de Nodal

## Verlo en tu compu
1. Abrí una terminal en esta carpeta (`sitio-web`).
2. La primera vez: `npm install`
3. Después: `npm run dev`
4. Entrá a http://localhost:3000

Sin claves, el sitio funciona igual:
- El **diagnóstico con IA** corre en *modo demostración* (respuestas de ejemplo, marcadas en pantalla).
- El **formulario** guarda los mensajes en `mensajes-recibidos.txt` en vez de mandarlos por mail.

## Activar lo real
Copiá `.env.example` como `.env` y completá:
- `ANTHROPIC_API_KEY`: la clave de la API de Claude (console.anthropic.com). Con esto el diagnóstico pasa a ser IA de verdad. Cada diagnóstico cuesta unos centavos de dólar.
- `RESEND_API_KEY`: la clave de resend.com (gratis para pocos mails). Con esto los formularios llegan a mcataldo@nodaldevelopments.com, enviados desde web@nodaldevelopments.com (el dominio ya está verificado en Resend).

**Nunca compartas ni subas el archivo `.env`.**

## Publicarlo en internet (Hostinger, el que usamos)
El sitio vive en **Hostinger (plan Business)** con el dominio **nodaldevelopments.com**:
1. hPanel → **Crear sitio** → app **Node.js** → importar desde GitHub `Mateocataldo/nodal-sitio`, rama `main`.
2. Node 22 o 24 · instalación `npm install` · inicio `npm start` (corre `server.js`).
3. Variables de entorno: `ANTHROPIC_API_KEY`, `RESEND_API_KEY` (destino y remitente ya vienen configurados para nodaldevelopments.com).
4. Conectar el dominio nodaldevelopments.com a la app.
5. Cada cambio subido a GitHub se vuelve a publicar desde hPanel.

## Alternativa: Netlify
También está preparado para **Netlify** (plan gratis, permite uso comercial):
1. Subí esta carpeta a un repositorio privado de GitHub.
2. En netlify.com: **Add new project → Import an existing project → GitHub** → elegí el repositorio. La configuración se lee sola de `netlify.toml`.
3. Antes de publicar, en **Environment variables** cargá `ANTHROPIC_API_KEY` y `RESEND_API_KEY` (las mismas del `.env`).
4. Cada cambio que se sube a GitHub se publica solo.
5. Cuando tengas el dominio: **Domain management → Add a domain**.

Netlify corta cada pedido a los 30 segundos. El diagnóstico tarda unos 15 y tiene un tope propio de 25.

## Qué hay en cada lugar
- `public/`: la página (HTML, estilos, animaciones, textos en inglés en `js/i18n.js`).
- `api/diagnostico.js`: el diagnóstico con Claude. Ahí están las instrucciones que sigue la IA.
- `api/enviar-diagnostico.js`: cuando el cliente lo pide desde el chat, te manda el diagnóstico con sus datos y la conversación.
- `api/contacto.js`: el envío del formulario de contacto por mail.
- `lib/correo.js`: el envío de mails que usan los dos anteriores.
- `netlify/functions/` y `lib/netlify.js`: conectan las funciones de `api/` con Netlify.
- `server.js`: solo para probar en tu compu.
