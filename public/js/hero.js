// Portada: una red de puntos sueltos que, a medida que bajás,
// se ordena y dibuja la N del logo. "Del desorden a un sistema."

const AZUL = [36, 70, 246];
const VERDE = [0, 158, 148];
const GRIS = [84, 108, 140];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const suave = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const mezclar = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];

export function iniciarHero() {
  const seccion = document.getElementById("inicio");
  const lienzo = document.getElementById("lienzo-hero");
  const pista = document.getElementById("pista-scroll");
  const contenido = seccion.querySelector(".hero__contenido");
  if (!seccion || !lienzo) return;

  const ctx = lienzo.getContext("2d");
  const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ancho = 0, alto = 0, dpr = 1;
  let particulas = [];
  let geo = null;
  let progreso = 0;
  let mouse = { x: -9999, y: -9999, activo: false };
  let visible = true;
  let cuadro = null;

  function calcularGeometria() {
    const escritorio = ancho >= 900;
    let lado, cx, cy;
    if (escritorio) {
      lado = Math.min(alto * 0.36, ancho * 0.22);
      cx = ancho * 0.74; cy = alto * 0.5;
    } else {
      // En celular la N va en el espacio libre entre el encabezado y el texto
      const arriba = 72;
      const libre = Math.max(90, contenido.getBoundingClientRect().top - lienzo.getBoundingClientRect().top - arriba);
      lado = Math.min(ancho * 0.4, libre * 0.62);
      cx = ancho * 0.5; cy = arriba + libre / 2;
    }
    const x0 = cx - lado / 2, x1 = cx + lado / 2, y0 = cy - lado / 2, y1 = cy + lado / 2;
    // Recorrido del trazo del logo: abajo-izq → arriba-izq → abajo-der → arriba-der
    const puntos = [[x0, y1], [x0, y0], [x1, y1], [x1, y0]];
    const tramos = [];
    let total = 0;
    for (let i = 0; i < 3; i++) {
      const [ax, ay] = puntos[i], [bx, by] = puntos[i + 1];
      const largo = Math.hypot(bx - ax, by - ay);
      tramos.push({ ax, ay, bx, by, largo, desde: total });
      total += largo;
    }
    return { lado, puntos, tramos, total, radioNodo: lado * 0.135, grosor: lado * 0.135, escritorio };
  }

  function puntoEnTrazo(d) {
    for (const tr of geo.tramos) {
      if (d <= tr.desde + tr.largo) {
        const t = (d - tr.desde) / tr.largo;
        return [lerp(tr.ax, tr.bx, t), lerp(tr.ay, tr.by, t)];
      }
    }
    const u = geo.tramos[2];
    return [u.bx, u.by];
  }

  function crearParticulas() {
    const cantidadAmbiente = geo.escritorio ? 46 : 24;
    const cantidadTrazo = geo.escritorio ? 26 : 18;
    particulas = [];
    const azar = (a, b) => a + Math.random() * (b - a);
    const base = () => ({
      hx: azar(0.03, 0.97) * ancho, hy: azar(0.08, 0.95) * alto,
      fase: azar(0, Math.PI * 2), vel: azar(0.25, 0.6), amp: azar(10, 26),
      retraso: azar(0, 0.28),
    });

    // Los cuatro nodos del logo (el de arriba a la derecha es verde azulado)
    const orden = [1, 0, 2, 3]; // arriba-izq, abajo-izq, abajo-der, arriba-der
    orden.forEach((idx, i) => {
      particulas.push({ ...base(), tipo: "nodo", destino: geo.puntos[idx], color: idx === 3 ? VERDE : AZUL, r: 5, retraso: 0.04 * i });
    });
    // Puntos que terminan sobre el trazo
    for (let i = 0; i < cantidadTrazo; i++) {
      const d = ((i + 0.5) / cantidadTrazo) * geo.total;
      particulas.push({ ...base(), tipo: "trazo", distancia: d, destino: puntoEnTrazo(d), color: AZUL, r: azar(1.8, 3) });
    }
    // Red de fondo que queda flotando
    for (let i = 0; i < cantidadAmbiente; i++) {
      const especial = Math.random();
      particulas.push({
        ...base(), tipo: "ambiente", r: azar(1.8, 3.4),
        color: especial < 0.06 ? AZUL : especial < 0.11 ? VERDE : GRIS,
      });
    }
  }

  function ajustarTamano() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const caja = lienzo.getBoundingClientRect();
    ancho = caja.width; alto = caja.height;
    lienzo.width = Math.round(ancho * dpr); lienzo.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    geo = calcularGeometria();
    crearParticulas();
  }

  function leerProgreso() {
    if (sinMovimiento) { progreso = 1; return; }
    const caja = seccion.getBoundingClientRect();
    const recorrido = caja.height - window.innerHeight;
    progreso = recorrido > 0 ? clamp(-caja.top / recorrido) : 1;
    if (pista) pista.style.opacity = String(clamp(1 - progreso * 5));
  }

  function dibujar(tiempo) {
    const t = sinMovimiento ? 0 : tiempo / 1000;
    ctx.clearRect(0, 0, ancho, alto);

    // 1) Posición de cada punto
    for (const p of particulas) {
      const dx = Math.sin(t * p.vel + p.fase) * p.amp;
      const dy = Math.cos(t * p.vel * 0.8 + p.fase) * p.amp;
      let x = p.hx + dx, y = p.hy + dy;

      if (mouse.activo) {
        const mx = x - mouse.x, my = y - mouse.y, dist = Math.hypot(mx, my);
        if (dist < 140 && dist > 0.1) {
          const empuje = (1 - dist / 140) * 26;
          x += (mx / dist) * empuje; y += (my / dist) * empuje;
        }
      }

      if (p.destino) {
        p.e = easeInOut(clamp((progreso - p.retraso) / 0.6));
        x = lerp(x, p.destino[0], p.e); y = lerp(y, p.destino[1], p.e);
      } else {
        p.e = 0;
      }
      p.x = x; p.y = y;
    }

    // 2) Líneas finas entre puntos cercanos (el motivo de la marca)
    const alcance = geo.escritorio ? 120 : 90;
    const desvanecer = 1 - suave(0.75, 1, progreso) * 0.55;
    ctx.lineWidth = 1;
    for (let i = 0; i < particulas.length; i++) {
      const a = particulas[i];
      if (a.e > 0.9) continue;
      for (let j = i + 1; j < particulas.length; j++) {
        const b = particulas[j];
        if (b.e > 0.9) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < alcance) {
          ctx.strokeStyle = rgba([110, 138, 172], (1 - d / alcance) * 0.42 * desvanecer * (1 - Math.max(a.e, b.e)));
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse.activo) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 170) {
          ctx.strokeStyle = rgba([31, 181, 168], (1 - d / 170) * 0.45 * (1 - a.e));
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    // 3) El trazo de la N se dibuja de a poco
    const avanceTrazo = suave(0.45, 0.92, progreso);
    if (avanceTrazo > 0) {
      const hasta = avanceTrazo * geo.total;
      ctx.strokeStyle = rgba(AZUL, 1);
      ctx.lineWidth = geo.grosor;
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(geo.tramos[0].ax, geo.tramos[0].ay);
      for (const tr of geo.tramos) {
        if (hasta >= tr.desde + tr.largo) { ctx.lineTo(tr.bx, tr.by); continue; }
        const k = (hasta - tr.desde) / tr.largo;
        ctx.lineTo(lerp(tr.ax, tr.bx, k), lerp(tr.ay, tr.by, k));
        break;
      }
      ctx.stroke();
    }

    // 4) Puntos
    for (const p of particulas) {
      if (p.tipo === "trazo") {
        const tapado = p.distancia <= avanceTrazo * geo.total;
        if (tapado && p.e > 0.98) continue;
        const color = mezclar(GRIS, AZUL, p.e);
        ctx.fillStyle = rgba(color, 0.55 + 0.45 * p.e);
        ctx.beginPath(); ctx.arc(p.x, p.y, lerp(p.r, geo.grosor * 0.32, p.e), 0, Math.PI * 2); ctx.fill();
      } else if (p.tipo === "nodo") {
        const r = lerp(p.r + 2, geo.radioNodo, p.e);
        if (progreso < 0.15 && !sinMovimiento) {
          // Antes de bajar, los cuatro nodos laten para invitar a mirar
          const halo = 6 + Math.sin(t * 2 + p.fase) * 3;
          ctx.fillStyle = rgba(p.color, 0.16);
          ctx.beginPath(); ctx.arc(p.x, p.y, r + halo, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = rgba(p.color, 1);
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
      } else {
        const alfa = p.color === GRIS ? 0.9 : 1;
        ctx.fillStyle = rgba(p.color, alfa * desvanecer);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  function bucle(tiempo) {
    leerProgreso();
    dibujar(tiempo);
    cuadro = visible && !sinMovimiento ? requestAnimationFrame(bucle) : null;
  }

  function arrancar() { if (!cuadro) cuadro = requestAnimationFrame(bucle); }

  ajustarTamano();
  leerProgreso();
  dibujar(0);
  if (!sinMovimiento) arrancar();

  let espera;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(() => { ajustarTamano(); leerProgreso(); dibujar(performance.now()); }, 120);
  });

  seccion.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const caja = lienzo.getBoundingClientRect();
    mouse = { x: e.clientX - caja.left, y: e.clientY - caja.top, activo: true };
  });
  seccion.addEventListener("pointerleave", () => { mouse.activo = false; });

  new IntersectionObserver(([entrada]) => {
    visible = entrada.isIntersecting;
    if (visible && !sinMovimiento) arrancar();
  }).observe(seccion);
}
