// Formulario de contacto: valida, envía y muestra el resultado.
import { t, idiomaActual } from "./i18n.js";

const MAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function iniciarContacto() {
  const form = document.getElementById("form-contacto");
  const estado = document.getElementById("form-estado");
  if (!form) return;
  const boton = form.querySelector('button[type="submit"]');

  const reglas = {
    nombre: (v) => (v.trim() ? "" : t("faltaNombre")),
    apellido: (v) => (v.trim() ? "" : t("faltaApellido")),
    email: (v) => (MAIL_VALIDO.test(v.trim()) ? "" : t("mailInvalido")),
    mensaje: (v) => (v.trim().length >= 5 ? "" : t("faltaMensaje")),
  };

  function marcar(campo, error) {
    const caja = campo.closest(".campo");
    caja.classList.toggle("con-error", Boolean(error));
    let aviso = caja.querySelector(".error");
    if (error) {
      if (!aviso) {
        aviso = document.createElement("p");
        aviso.className = "error";
        aviso.id = `${campo.id}-error`;
        caja.appendChild(aviso);
      }
      aviso.textContent = error;
      campo.setAttribute("aria-invalid", "true");
      campo.setAttribute("aria-describedby", aviso.id);
    } else {
      aviso?.remove();
      campo.removeAttribute("aria-invalid");
      campo.removeAttribute("aria-describedby");
    }
  }

  function validar() {
    let primero = null;
    for (const [nombre, regla] of Object.entries(reglas)) {
      const campo = form.elements[nombre];
      const error = regla(campo.value);
      marcar(campo, error);
      if (error && !primero) primero = campo;
    }
    return primero;
  }

  Object.keys(reglas).forEach((nombre) => {
    const campo = form.elements[nombre];
    campo.addEventListener("blur", () => { if (campo.value) marcar(campo, reglas[nombre](campo.value)); });
    campo.addEventListener("input", () => { if (campo.closest(".campo").classList.contains("con-error")) marcar(campo, reglas[nombre](campo.value)); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const conError = validar();
    if (conError) { conError.focus(); return; }

    const datos = Object.fromEntries(new FormData(form));
    datos.lang = idiomaActual();
    boton.disabled = true;
    estado.className = "formulario__estado";
    estado.textContent = t("enviando");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      estado.classList.add("ok");
      estado.textContent = t("enviadoOk");
    } catch {
      estado.classList.add("mal");
      estado.textContent = t("enviadoMal");
    } finally {
      boton.disabled = false;
    }
  });
}
