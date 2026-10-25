// Textos del sitio en inglés. El español vive directamente en el HTML
// (así los buscadores lo leen sin JavaScript) y se copia al iniciar.
const en = {
  "a11y.saltar": "Skip to content",
  "nav.servicios": "What we do",
  "nav.metodo": "How we work",
  "nav.origen": "Why Nodal",
  "nav.diagnostico": "AI diagnosis",
  "nav.contacto": "Contact",
  "nav.cta": "Let's talk",
  "nav.abrir": "Open menu",

  "hero.ceja": "Software · Automation · AI",
  "hero.titulo": "Technology that adapts <span class=\"acento\">to people.</span>",
  "hero.bajada": "We build software, automations, websites and databases. And we help artificial intelligence actually work for your business.",
  "hero.cta1": "Try the AI diagnosis",
  "hero.cta2": "Tell us about your case",
  "hero.pista": "Scroll and watch everything connect",

  "problema.ceja": "The problem",
  "problema.titulo": "Why so many AI solutions fail",
  "problema.c1.t": "They start with the technology",
  "problema.c1.p": "They pick a tool first and then try to make it fit the business.",
  "problema.c2.t": "They don't understand the problem",
  "problema.c2.p": "Nobody looks at how the process really works or where it gets stuck.",
  "problema.c3.t": "They don't look at people",
  "problema.c3.p": "They ignore how the team works, how much time it has and what its habits are.",
  "problema.resultado": "<strong>The result:</strong> solutions nobody uses, that make things harder instead of easier, and that end up abandoned.",

  "conviccion.ceja": "What we believe",
  "conviccion.frase": "A misunderstood problem can't be solved with <span class=\"acento\">technology.</span>",

  "origen.ceja": "Our roots",
  "origen.titulo": "Where Nodal comes from",
  "origen.h1.t": "The backlog",
  "origen.h1.p": "A business owner we know, working in administrative services, had fallen far behind on <strong>reviewing documents</strong>.",
  "origen.h2.t": "The tool",
  "origen.h2.p": "To fix it, he brought in software that downloaded and analyzed the documents. <strong>It was powerful, but hard to use.</strong>",
  "origen.h3.t": "The roadblock",
  "origen.h3.p": "The team had to be trained right in their busiest moment, when nobody had time to learn something new.",
  "origen.aprendimos": "What we learned",
  "origen.a1": "A tool that slows work down instead of speeding it up isn't optimizing anything.",
  "origen.a2": "Before designing a solution, you need to understand how each company's process works.",
  "origen.a3": "The best solution is the one that adapts to how people already work.",

  "servicios.ceja": "Services",
  "servicios.titulo": "What we do",
  "servicios.principal": "Core service",
  "servicios.s1.t": "Software & AI",
  "servicios.s1.p": "Custom solutions that improve how a business runs and fit the way its people work.",
  "servicios.s2.t": "Smart automations",
  "servicios.s2.p": "Repetitive tasks that take care of themselves with the help of AI, using the tools people already use.",
  "servicios.s3.t": "Websites",
  "servicios.s3.p": "We design and build websites for businesses and projects.",
  "servicios.s4.t": "Databases",
  "servicios.s4.p": "To bring order to a business's information. It's an area we're still growing into.",
  "servicios.nota": "And we'll keep adding new areas as Nodal grows.",

  "metodo.ceja": "Our method",
  "metodo.titulo": "How we work",
  "metodo.p1.t": "Observe",
  "metodo.p1.p": "We watch how the business works day to day.",
  "metodo.p2.t": "Understand",
  "metodo.p2.p": "We find the real problem and who lives with it.",
  "metodo.p3.t": "Design",
  "metodo.p3.p": "We shape a solution that fits the way they work.",
  "metodo.p4.t": "Build",
  "metodo.p4.p": "We make something simple that doesn't take much learning.",
  "metodo.p5.t": "Adjust",
  "metodo.p5.p": "We measure, listen and improve as we go.",
  "metodo.principio": "<strong>Our principle:</strong> first we understand the problem and the people. Only then do we design the solution.",

  "diag.ceja": "AI diagnosis",
  "diag.titulo": "Tell us what's slowing you down. We'll look at it the Nodal way.",
  "diag.bajada": "It doesn't sell you anything or hand you quick fixes. It asks a few questions, shows your process as a map with the spots where it gets stuck and, if you'd like, passes it on to the Nodal team so they can reach out. It takes a couple of minutes.",
  "diag.listo": "Ready to listen",
  "diag.reiniciar": "Start over",
  "diag.saludo": "Hi. Tell me, in your own words, which task or process in your business is costing you more than it should.",
  "diag.ej1": "We enter data by hand every day",
  "diag.ej2": "We answer the same questions over and over",
  "diag.ej3": "Our information is scattered across spreadsheets",
  "diag.etiqueta": "Your answer",
  "diag.placeholder": "For example: we're way behind on entering invoices and answering customer questions…",
  "diag.enviar": "Send",
  "diag.aviso": "What you write is only used for this diagnosis, and it only reaches Nodal if you choose to send it.",
  "diag.mapaVacio": "Your process map will show up here.",

  "contacto.ceja": "Contact",
  "contacto.titulo": "Let's build with Nodal.",
  "contacto.bajada": "Tell us what you'd like to solve. We read every message and write back ourselves.",
  "contacto.directo": "Prefer to email us directly?",
  "contacto.copiar": "Copy",
  "contacto.nombre": "First name",
  "contacto.apellido": "Last name",
  "contacto.email": "Email",
  "contacto.mensaje": "What would you like to solve?",
  "contacto.mensajePh": "Tell us a bit about your business and what's costing you time.",
  "contacto.enviar": "Send message",

  "pie.frase": "Technology that adapts to people.",
};

// Textos que arma JavaScript (no están en el HTML).
export const ui = {
  es: {
    pensando: "Pensando…",
    pregunta: (n, total) => `Pregunta ${n} de ${total}`,
    armando: "Armando tu mapa…",
    listoDiag: "Diagnóstico listo",
    leyendaFluye: "Fluye",
    leyendaTraba: "Se traba",
    leyendaProfundizar: "A profundizar",
    etiquetaTraba: "Se traba",
    etiquetaProfundizar: "A profundizar",
    tuProceso: "Tu proceso",
    problemaFondo: "El problema de fondo",
    impacto: "Cómo te está afectando",
    enviarANodal: "Enviarle este diagnóstico a Nodal",
    descargo: "Es un primer diagnóstico hecho con IA a partir de lo que contaste. La solución la pensamos con vos, después de entender bien tu caso.",
    siEnviar: "Sí, enviáselo a Nodal",
    noGracias: "No, gracias",
    sinEnvio: "Perfecto. Si cambiás de idea, podés enviárselo al equipo desde acá.",
    pedirDatos: "Genial. Dejame tus datos así el equipo de Nodal te escribe:",
    dNombre: "Nombre",
    dApellido: "Apellido",
    dEmail: "Email",
    dEmpresa: "Empresa (opcional)",
    dEnviar: "Enviar diagnóstico",
    diagEnviado: (nombre, email) => `Listo, ${nombre}. Le mandé tu diagnóstico y lo que hablamos al equipo de Nodal. Te van a escribir a ${email}.`,
    diagEnviadoEstado: "Diagnóstico enviado",
    demo: "Modo demostración",
    errorDiag: "No pudimos conectarnos con el diagnóstico. Probá de nuevo en un rato o escribinos directo.",
    muchaDemanda: "Hay mucha gente usando el diagnóstico ahora. Probá de nuevo en un minuto.",
    copiado: "Copiado",
    copiar: "Copiar",
    enviando: "Enviando…",
    enviadoOk: "¡Gracias! Recibimos tu mensaje y te vamos a escribir pronto.",
    enviadoMal: "No se pudo enviar. Probá de nuevo o escribinos a mcataldo@nodaldevelopments.com.",
    faltaNombre: "Contanos tu nombre.",
    faltaApellido: "Contanos tu apellido.",
    mailInvalido: "Revisá que el email esté bien escrito.",
    faltaMensaje: "Contanos brevemente qué te gustaría resolver.",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
  },
  en: {
    pensando: "Thinking…",
    pregunta: (n, total) => `Question ${n} of ${total}`,
    armando: "Building your map…",
    listoDiag: "Diagnosis ready",
    leyendaFluye: "Flows",
    leyendaTraba: "Gets stuck",
    leyendaProfundizar: "Needs a closer look",
    etiquetaTraba: "Stuck",
    etiquetaProfundizar: "Closer look",
    tuProceso: "Your process",
    problemaFondo: "The underlying problem",
    impacto: "How it's affecting you",
    enviarANodal: "Send this diagnosis to Nodal",
    descargo: "This is a first diagnosis made with AI from what you shared. We work out the solution with you, once we understand your case well.",
    siEnviar: "Yes, send it to Nodal",
    noGracias: "No, thanks",
    sinEnvio: "No problem. If you change your mind, you can send it to the team from here.",
    pedirDatos: "Great. Leave your details so the Nodal team can write to you:",
    dNombre: "First name",
    dApellido: "Last name",
    dEmail: "Email",
    dEmpresa: "Company (optional)",
    dEnviar: "Send diagnosis",
    diagEnviado: (nombre, email) => `Done, ${nombre}. I sent your diagnosis and our conversation to the Nodal team. They'll write to you at ${email}.`,
    diagEnviadoEstado: "Diagnosis sent",
    demo: "Demo mode",
    errorDiag: "We couldn't reach the diagnosis right now. Try again in a bit or email us directly.",
    muchaDemanda: "Lots of people are using the diagnosis right now. Try again in a minute.",
    copiado: "Copied",
    copiar: "Copy",
    enviando: "Sending…",
    enviadoOk: "Thanks! We got your message and we'll write back soon.",
    enviadoMal: "We couldn't send it. Try again or email us at mcataldo@nodaldevelopments.com.",
    faltaNombre: "Please tell us your first name.",
    faltaApellido: "Please tell us your last name.",
    mailInvalido: "Please check your email address.",
    faltaMensaje: "Tell us briefly what you'd like to solve.",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
  },
};

const es = {};
let idioma = "es";

export function idiomaActual() { return idioma; }
export function t(clave, ...args) {
  const v = ui[idioma][clave];
  return typeof v === "function" ? v(...args) : v;
}

function guardarEspanol() {
  document.querySelectorAll("[data-i18n]").forEach((el) => { es[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { es[el.dataset.i18nHtml] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { es[el.dataset.i18nPlaceholder] = el.placeholder; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { es[el.dataset.i18nAria] = el.getAttribute("aria-label"); });
}

export function aplicarIdioma(nuevo) {
  idioma = nuevo === "en" ? "en" : "es";
  const dic = idioma === "en" ? en : es;
  document.documentElement.lang = idioma;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = dic[el.dataset.i18n]; if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { const v = dic[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { const v = dic[el.dataset.i18nPlaceholder]; if (v != null) el.placeholder = v; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { const v = dic[el.dataset.i18nAria]; if (v != null) el.setAttribute("aria-label", v); });
  document.querySelectorAll(".idioma [data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === idioma)));
  try { localStorage.setItem("nodal-idioma", idioma); } catch {}
  document.dispatchEvent(new CustomEvent("idioma", { detail: idioma }));
}

export function iniciarIdioma() {
  guardarEspanol();
  let inicial = "es";
  try { inicial = localStorage.getItem("nodal-idioma") || ""; } catch {}
  if (!inicial) inicial = (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  document.querySelectorAll(".idioma [data-lang]").forEach((b) => b.addEventListener("click", () => aplicarIdioma(b.dataset.lang)));
  if (inicial !== "es") aplicarIdioma(inicial);
}
