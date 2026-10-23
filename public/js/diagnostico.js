// Diagnóstico con IA: primero pregunta, después muestra el proceso como un mapa.
// No da soluciones: si la persona quiere, le pide sus datos en el chat y le
// manda el diagnóstico al equipo de Nodal por mail.
import { t, idiomaActual } from "./i18n.js";

const MAX_PREGUNTAS = 3;
const MAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function iniciarDiagnostico() {
  const charla = document.querySelector(".diag__charla");
  const mensajes = document.getElementById("diag-mensajes");
  const sugerencias = document.getElementById("diag-sugerencias");
  const form = document.getElementById("diag-form");
  const texto = document.getElementById("diag-texto");
  const progreso = document.getElementById("diag-progreso");
  const reiniciar = document.getElementById("diag-reiniciar");
  const mapaVacio = document.getElementById("mapa-vacio");
  const resultado = document.getElementById("resultado-diag");
  if (!form) return;

  const saludoHTML = mensajes.innerHTML;
  const ejemplosHTML = sugerencias.innerHTML;
  let estado = nuevoEstado();

  function nuevoEstado() {
    return { relato: "", turnos: [], preguntaActual: "", ocupado: false, terminado: false, diagnostico: null, enviado: false, pidiendoDatos: false };
  }

  function elemento(tag, clase, textoPlano) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (textoPlano != null) el.textContent = textoPlano;
    return el;
  }

  function burbuja(contenido, quien) {
    const div = elemento("div", `burbuja burbuja--${quien}`);
    if (contenido instanceof Node) div.appendChild(contenido);
    else div.appendChild(elemento("p", "", contenido));
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight;
    return div;
  }

  function puntos() {
    const s = elemento("span", "puntos");
    s.setAttribute("aria-label", t("pensando"));
    s.innerHTML = "<i></i><i></i><i></i>";
    return burbuja(s, "nodal");
  }

  // Botones rápidos debajo de la charla. Cada uno: { texto, accion?, principal? }
  function ponerBotones(lista) {
    sugerencias.innerHTML = "";
    lista.slice(0, 3).forEach((b) => {
      const boton = elemento("button", `chip${b.principal ? " chip--principal" : ""}`, b.texto);
      boton.type = "button";
      boton.dataset.accion = b.accion || "responder";
      sugerencias.appendChild(boton);
    });
  }

  function ocupado(si) {
    estado.ocupado = si;
    charla.classList.toggle("pensando", si);
    form.querySelector("button").disabled = si;
    texto.disabled = si;
    if (si) progreso.textContent = estado.turnos.length >= MAX_PREGUNTAS ? t("armando") : t("pensando");
  }

  async function pedir(url, cuerpo) {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
    const datos = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(datos.error || "error"); err.status = res.status; throw err; }
    return datos;
  }

  async function enviar(valor) {
    const limpio = valor.trim();
    if (!limpio || estado.ocupado || estado.terminado) return;

    const primera = !estado.relato;
    if (primera) estado.relato = limpio;
    else estado.turnos.push({ pregunta: estado.preguntaActual, respuesta: limpio });

    const miBurbuja = burbuja(limpio, "persona");
    texto.value = "";
    ajustarAltura();
    sugerencias.innerHTML = "";
    reiniciar.hidden = false;
    ocupado(true);
    const espera = puntos();

    try {
      const r = await pedir("/api/diagnostico", { lang: idiomaActual(), relato: estado.relato, turnos: estado.turnos });
      espera.remove();
      if (r.etapa === "diagnostico" && r.diagnostico) {
        estado.terminado = true;
        estado.diagnostico = r.diagnostico;
        burbuja(r.mensaje, "nodal");
        progreso.textContent = t("listoDiag");
        form.hidden = true;
        mostrarDiagnostico(r.diagnostico, r.demo);
        ofrecerEnvio();
      } else {
        estado.preguntaActual = r.mensaje;
        burbuja(r.mensaje, "nodal");
        ponerBotones((r.sugerencias || []).map((s) => ({ texto: s })));
        progreso.textContent = t("pregunta", Math.min(estado.turnos.length + 1, MAX_PREGUNTAS), MAX_PREGUNTAS);
      }
    } catch (err) {
      espera.remove();
      miBurbuja.remove();
      // Deshacemos el último paso para poder reintentar
      if (primera) estado.relato = ""; else estado.turnos.pop();
      texto.value = limpio;
      burbuja(err.status === 429 ? t("muchaDemanda") : t("errorDiag"), "error");
      progreso.textContent = "";
    } finally {
      ocupado(false);
      if (!estado.terminado) texto.focus({ preventScroll: true });
    }
  }

  // ---------- Después del diagnóstico: enviarlo a Nodal ----------

  function ofrecerEnvio() {
    ponerBotones([
      { texto: t("siEnviar"), accion: "si-enviar", principal: true },
      { texto: t("noGracias"), accion: "no-enviar" },
    ]);
  }

  function pedirDatos() {
    if (estado.enviado || estado.pidiendoDatos) return;
    estado.pidiendoDatos = true;
    sugerencias.innerHTML = "";
    burbuja(t("pedirDatos"), "nodal");

    const f = elemento("form", "datos");
    f.noValidate = true;
    const campo = (nombre, etiqueta, tipo = "text", auto = "") => {
      const id = `dd-${nombre}`;
      const caja = elemento("div", "datos__campo");
      const label = elemento("label", "", etiqueta);
      label.htmlFor = id;
      const input = elemento("input");
      Object.assign(input, { id, name: nombre, type: tipo, maxLength: nombre === "email" ? 160 : 100 });
      if (auto) input.autocomplete = auto;
      caja.append(label, input);
      return caja;
    };
    const fila = elemento("div", "datos__fila");
    fila.append(campo("nombre", t("dNombre"), "text", "given-name"), campo("apellido", t("dApellido"), "text", "family-name"));
    const trampa = elemento("input", "visualmente-oculto");
    Object.assign(trampa, { name: "sitio_web", tabIndex: -1, autocomplete: "off" });
    trampa.setAttribute("aria-hidden", "true");
    const aviso = elemento("p", "datos__aviso");
    aviso.setAttribute("role", "status");
    const boton = elemento("button", "boton boton--ancho", t("dEnviar"));
    boton.type = "submit";
    f.append(fila, campo("email", t("dEmail"), "email", "email"), campo("empresa", t("dEmpresa"), "text", "organization"), trampa, boton, aviso);

    const contenedor = burbuja(f, "form");
    f.elements.nombre.focus({ preventScroll: true });
    mensajes.scrollTop = mensajes.scrollHeight;

    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(f));
      const error = !v.nombre.trim() ? [f.elements.nombre, t("faltaNombre")]
        : !v.apellido.trim() ? [f.elements.apellido, t("faltaApellido")]
        : !MAIL_VALIDO.test(v.email.trim()) ? [f.elements.email, t("mailInvalido")]
        : null;
      f.querySelectorAll("[aria-invalid]").forEach((i) => i.removeAttribute("aria-invalid"));
      if (error) {
        error[0].setAttribute("aria-invalid", "true");
        error[0].focus();
        aviso.className = "datos__aviso mal";
        aviso.textContent = error[1];
        return;
      }
      boton.disabled = true;
      aviso.className = "datos__aviso";
      aviso.textContent = t("enviando");
      try {
        await pedir("/api/enviar-diagnostico", {
          lang: idiomaActual(),
          sitio_web: v.sitio_web,
          datos: { nombre: v.nombre, apellido: v.apellido, email: v.email, empresa: v.empresa },
          relato: estado.relato,
          turnos: estado.turnos,
          diagnostico: estado.diagnostico,
        });
        estado.enviado = true;
        contenedor.remove();
        burbuja(t("diagEnviado", v.nombre.trim(), v.email.trim()), "nodal");
        progreso.textContent = t("diagEnviadoEstado");
        sugerencias.innerHTML = "";
        resultado.querySelector(".resultado-diag__enviar")?.remove();
      } catch (err) {
        boton.disabled = false;
        aviso.className = "datos__aviso mal";
        aviso.textContent = err.status === 429 ? t("muchaDemanda") : t("enviadoMal");
      }
    });
  }

  // ---------- Mapa del proceso (panel derecho) ----------

  function mostrarDiagnostico(d, demo) {
    resultado.innerHTML = "";
    if (demo) resultado.appendChild(elemento("span", "demo", t("demo")));
    resultado.appendChild(elemento("h3", "", d.titulo));

    const leyenda = elemento("div", "leyenda");
    [["fluye", "leyendaFluye"], ["se_traba", "leyendaTraba"], ["a_profundizar", "leyendaProfundizar"]].forEach(([e, k]) => {
      const s = elemento("span");
      s.append(elemento("i", `estado-${e}`), document.createTextNode(t(k)));
      leyenda.appendChild(s);
    });
    resultado.appendChild(leyenda);

    const lista = elemento("ol", "proceso");
    lista.setAttribute("aria-label", t("tuProceso"));
    (d.proceso || []).forEach((paso, i) => {
      const li = elemento("li");
      li.style.animationDelay = `${0.15 + i * 0.18}s`;
      li.appendChild(elemento("i", `proceso__nodo estado-${paso.estado}`));
      const titulo = elemento("strong", "", paso.nombre);
      if (paso.estado === "se_traba") titulo.appendChild(elemento("em", "etiqueta estado-se_traba", t("etiquetaTraba")));
      if (paso.estado === "a_profundizar") titulo.appendChild(elemento("em", "etiqueta estado-a_profundizar", t("etiquetaProfundizar")));
      li.appendChild(titulo);
      if (paso.detalle) li.appendChild(elemento("span", "", paso.detalle));
      lista.appendChild(li);
    });
    resultado.appendChild(lista);

    const demora = 0.3 + (d.proceso || []).length * 0.18;
    [[t("problemaFondo"), d.problema_de_fondo], [t("impacto"), d.impacto]].forEach(([titulo, cuerpo], i) => {
      if (!cuerpo) return;
      const b = elemento("div", "bloque-diag");
      b.style.animationDelay = `${demora + i * 0.15}s`;
      b.append(elemento("h4", "", titulo), elemento("p", "", cuerpo));
      resultado.appendChild(b);
    });

    const boton = elemento("button", "boton resultado-diag__enviar", t("enviarANodal"));
    boton.type = "button";
    boton.addEventListener("click", () => {
      charla.scrollIntoView({ behavior: "smooth", block: "start" });
      pedirDatos();
    });
    resultado.append(boton, elemento("p", "descargo", t("descargo")));

    mapaVacio.hidden = true;
    resultado.hidden = false;
  }

  function reiniciarTodo() {
    estado = nuevoEstado();
    mensajes.innerHTML = saludoHTML;
    sugerencias.innerHTML = ejemplosHTML;
    // Los textos guardados pueden estar en el idioma anterior
    document.dispatchEvent(new CustomEvent("retraducir"));
    form.hidden = false;
    reiniciar.hidden = true;
    resultado.hidden = true;
    resultado.innerHTML = "";
    mapaVacio.hidden = false;
    progreso.textContent = "";
    texto.value = "";
    texto.focus();
  }

  function ajustarAltura() {
    texto.style.height = "auto";
    texto.style.height = `${Math.min(texto.scrollHeight, 140)}px`;
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); enviar(texto.value); });
  texto.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(texto.value); }
  });
  texto.addEventListener("input", ajustarAltura);
  sugerencias.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const accion = chip.dataset.accion;
    if (accion === "responder") { enviar(chip.textContent); return; }
    if (accion === "si-enviar") { burbuja(chip.textContent, "persona"); pedirDatos(); return; }
    if (accion === "no-enviar") {
      burbuja(chip.textContent, "persona");
      burbuja(t("sinEnvio"), "nodal");
      ponerBotones([{ texto: t("enviarANodal"), accion: "si-enviar", principal: true }]);
      return;
    }
    // Ejemplos iniciales: se copian a la caja para que la persona los ajuste
    texto.value = chip.textContent;
    ajustarAltura();
    texto.focus();
  });
  reiniciar.addEventListener("click", reiniciarTodo);
}
