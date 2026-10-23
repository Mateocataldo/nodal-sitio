// Respuestas de ejemplo para cuando todavía no hay clave de la API de Claude.
// Sirven para ver cómo se ve y se usa el diagnóstico; la página las marca
// como "Modo demostración".

const textos = {
  es: {
    preguntas: [
      { mensaje: "Gracias por contarlo. ¿Quién se ocupa hoy de esa tarea y cuánto tiempo le lleva por semana, más o menos?", sugerencias: ["Una persona, varias horas por día", "Lo repartimos entre todo el equipo", "Lo hago yo cuando puedo"] },
      { mensaje: "¿Con qué lo hacen hoy? Por ejemplo: planillas, papel, un sistema propio, mails…", sugerencias: ["Planillas y mails", "Papel y después lo pasamos", "Un sistema que nadie termina de usar"] },
      { mensaje: "Última: cuando esa tarea se atrasa, ¿qué es lo primero que se resiente?", sugerencias: ["Los clientes esperan más", "Se acumulan errores", "Perdemos tiempo para lo importante"] },
    ],
    diagnostico: {
      titulo: "Tu proceso, a primera vista",
      proceso: [
        { nombre: "Llega la información", estado: "fluye", detalle: "Entra por varios lados a la vez." },
        { nombre: "Carga manual", estado: "se_traba", detalle: "Alguien la pasa a mano, y ahí se va el tiempo." },
        { nombre: "Revisión y control", estado: "a_profundizar", detalle: "Se controla a ojo; no queda claro quién lo revisa ni cuándo." },
        { nombre: "Respuesta o entrega", estado: "fluye", detalle: "Sale bien, pero depende de lo anterior." },
      ],
      problema_de_fondo: "No parece faltar una herramienta nueva: el problema es que la información entra desordenada y alguien tiene que acomodarla a mano antes de poder trabajar.",
      impacto: "Una persona pasa buena parte del día cargando datos, y cuando se atrasa los clientes esperan más.",
      resumen_para_nodal: "(Modo demostración: este resumen es de ejemplo, no lo escribió la IA.)\nLa persona cuenta que pierden mucho tiempo con una tarea de carga manual. La tarea la hace una persona, con planillas y mails. Cuando se atrasa, los clientes esperan más. Falta averiguar el rubro, el volumen de trabajo y quién revisa los datos.",
    },
    cierre: "Listo. Con lo que me contaste armé un primer diagnóstico de tu proceso. Si querés, se lo paso al equipo de Nodal para que te contacten.",
  },
  en: {
    preguntas: [
      { mensaje: "Thanks for sharing. Who handles that task today, and roughly how much time does it take per week?", sugerencias: ["One person, several hours a day", "The whole team shares it", "I do it when I can"] },
      { mensaje: "What do you use for it today? For example: spreadsheets, paper, an in-house system, email…", sugerencias: ["Spreadsheets and email", "Paper, then we type it in", "A system nobody really uses"] },
      { mensaje: "Last one: when that task falls behind, what suffers first?", sugerencias: ["Customers wait longer", "Mistakes pile up", "We lose time for what matters"] },
    ],
    diagnostico: {
      titulo: "Your process, at first glance",
      proceso: [
        { nombre: "Information comes in", estado: "fluye", detalle: "It arrives from several places at once." },
        { nombre: "Manual entry", estado: "se_traba", detalle: "Someone types it in by hand, and that's where time goes." },
        { nombre: "Review and checks", estado: "a_profundizar", detalle: "Checked by eye; it's unclear who reviews it and when." },
        { nombre: "Reply or delivery", estado: "fluye", detalle: "Works fine, but depends on the steps before." },
      ],
      problema_de_fondo: "It doesn't look like you're missing a new tool. The issue is that information comes in messy and someone has to sort it by hand before real work can start.",
      impacto: "One person spends a good part of the day entering data, and when it falls behind customers wait longer.",
      resumen_para_nodal: "(Modo demostración: este resumen es de ejemplo, no lo escribió la IA.)\nLa persona cuenta que pierden mucho tiempo con una tarea de carga manual. La tarea la hace una persona, con planillas y mails. Cuando se atrasa, los clientes esperan más. Falta averiguar el rubro, el volumen de trabajo y quién revisa los datos.",
    },
    cierre: "Done. From what you told me, I put together a first diagnosis of your process. If you'd like, I can pass it on to the Nodal team so they can reach out.",
  },
};

export function respuestaDemo(lang, turnos) {
  const tx = textos[lang] || textos.es;
  const n = turnos.length;
  if (n < tx.preguntas.length) {
    return { etapa: "pregunta", ...tx.preguntas[n], diagnostico: null, demo: true };
  }
  return { etapa: "diagnostico", mensaje: tx.cierre, sugerencias: [], diagnostico: tx.diagnostico, demo: true };
}
