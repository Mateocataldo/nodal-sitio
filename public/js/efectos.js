// Efectos al hacer scroll, menú y detalles de interfaz.
import { t } from "./i18n.js";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Progreso (0 a 1) de un elemento mientras cruza la pantalla
function progresoEnPantalla(el, inicio = 0.85, fin = 0.35) {
  const caja = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const desde = vh * inicio, hasta = vh * fin - caja.height * 0.5;
  return clamp((desde - caja.top) / (desde - hasta));
}

function encabezado() {
  const barra = document.getElementById("encabezado");
  const actualizar = () => barra.classList.toggle("con-fondo", window.scrollY > 40);
  actualizar();
  window.addEventListener("scroll", actualizar, { passive: true });

  const menu = document.getElementById("menu");
  const boton = document.querySelector(".hamburguesa");
  const cerrar = () => {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", t("abrirMenu"));
  };
  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", t(abierto ? "cerrarMenu" : "abrirMenu"));
    if (abierto) barra.classList.add("con-fondo");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });

  // Marca en el menú la sección que estás viendo
  const enlaces = [...menu.querySelectorAll('a[href^="#"]')];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach((s) => obs.observe(s));
}

function revelar() {
  const elementos = document.querySelectorAll(".revelar");
  if (sinMovimiento || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  elementos.forEach((el) => obs.observe(el));
}

// La frase de convicción se "enciende" palabra por palabra
function conviccion() {
  const frase = document.querySelector(".conviccion__frase");
  if (!frase) return;
  let palabras = [];

  function partir() {
    const recorrer = (nodo) => {
      [...nodo.childNodes].forEach((hijo) => {
        if (hijo.nodeType === Node.TEXT_NODE) {
          const trozos = hijo.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          trozos.forEach((tr) => {
            if (!tr) return;
            if (/^\s+$/.test(tr)) { frag.appendChild(document.createTextNode(tr)); return; }
            const s = document.createElement("span");
            s.className = "palabra"; s.textContent = tr;
            frag.appendChild(s);
          });
          hijo.replaceWith(frag);
        } else if (hijo.nodeType === Node.ELEMENT_NODE && !hijo.classList.contains("palabra")) {
          recorrer(hijo);
        }
      });
    };
    recorrer(frase);
    palabras = [...frase.querySelectorAll(".palabra")];
    actualizar();
  }

  function actualizar() {
    const p = sinMovimiento ? 1 : progresoEnPantalla(frase, 0.92, 0.62);
    const encendidas = Math.round(p * palabras.length);
    palabras.forEach((w, i) => w.classList.toggle("encendida", i < encendidas));
  }

  partir();
  window.addEventListener("scroll", actualizar, { passive: true });
  document.addEventListener("idioma", partir);
}

// Las lecciones se encienden a medida que avanza la historia
function aprendizajes() {
  const caja = document.getElementById("aprendizajes");
  const historia = document.querySelector(".historia");
  if (!caja || !historia) return;
  const items = [...caja.querySelectorAll("li")];
  const actualizar = () => {
    const p = sinMovimiento ? 1 : progresoEnPantalla(historia, 0.75, 0.4);
    items.forEach((li, i) => li.classList.toggle("encendido", p > (i + 0.6) / (items.length + 0.6)));
  };
  actualizar();
  window.addEventListener("scroll", actualizar, { passive: true });
}

// La línea del método se dibuja y enciende cada paso
function metodo() {
  const zona = document.getElementById("metodo-recorrido");
  const relleno = document.getElementById("metodo-relleno");
  if (!zona) return;
  const pasos = [...zona.querySelectorAll(".paso")];
  const vertical = matchMedia("(max-width: 900px)");
  const actualizar = () => {
    const p = sinMovimiento ? 1 : progresoEnPantalla(zona, vertical.matches ? 0.8 : 0.85, vertical.matches ? 0.2 : 0.4);
    relleno.style.transform = vertical.matches ? `scaleY(${p})` : `scaleX(${p})`;
    pasos.forEach((paso, i) => paso.classList.toggle("activo", p >= i / (pasos.length - 1) - 0.001 && p > 0.02));
  };
  actualizar();
  window.addEventListener("scroll", actualizar, { passive: true });
  vertical.addEventListener("change", actualizar);
}

function copiarMail() {
  const boton = document.getElementById("copiar-mail");
  if (!boton) return;
  boton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("info@nodaldevelopments.com");
      boton.textContent = t("copiado");
      boton.classList.add("copiado");
      setTimeout(() => { boton.textContent = t("copiar"); boton.classList.remove("copiado"); }, 2000);
    } catch {
      window.location.href = "mailto:info@nodaldevelopments.com";
    }
  });
}

export function iniciarEfectos() {
  encabezado();
  revelar();
  conviccion();
  aprendizajes();
  metodo();
  copiarMail();
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
}
