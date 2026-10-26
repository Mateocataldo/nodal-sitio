# Nodal: sitio web de la empresa

## Qué hay que construir
El sitio web de **Nodal**, la empresa de Mateo (software, automatizaciones inteligentes, sitios web y bases de datos). Es la carta de presentación de la empresa para captar clientes y para que cualquiera entienda rápido qué hacemos y cómo pensamos.

Idioma: español rioplatense (usar "vos": "podés", "contanos"). Hablar siempre en primera persona del plural ("hacemos", "entendemos").

## Antes de empezar
Preguntale a Mateo, de a una cosa por vez, lo que todavía no está definido:
- Páginas que quiere (ver propuesta abajo) y cuál es el objetivo principal del sitio.
- Cómo quiere que lo contacten (email, formulario, WhatsApp).
- Si ya tiene dominio y hosting para Nodal.
- Si prefiere alguna tecnología. Si no, elegir algo simple, rápido y fácil de mantener.
- Si el sitio va solo en español o también en inglés.

No inventes datos: nada de clientes, testimonios, números, premios ni proyectos que Mateo no haya mencionado.

## Quiénes somos
Nodal desarrolla proyectos de tecnología: software, automatizaciones inteligentes, sitios web y bases de datos. Lo que más nos interesa es **ayudar a que los negocios usen inteligencia artificial de una forma que realmente les sirva** en el día a día.

**Diferencial:** no empezamos por la herramienta. Empezamos por entender cómo trabaja la gente y dónde está el problema de fondo.

**Frase de marca:** "Tecnología que se adapta a las personas."
**Frase de convicción:** "Un problema mal entendido no se resuelve con tecnología."
**Cierre sugerido:** "Construyamos con Nodal."

## De dónde nace Nodal
Un empresario del rubro administrativo, conocido de Mateo, tenía mucho atraso en el análisis de documentación. Puso en marcha un software potente que descargaba y analizaba los documentos, pero era difícil de usar y había que capacitar al equipo justo en el momento de más trabajo, cuando nadie tenía tiempo para aprender algo nuevo.

Lo que aprendimos:
1. Una herramienta que frena el trabajo en vez de acelerarlo no optimiza nada.
2. Antes de diseñar una solución hay que entender cómo funciona el proceso de cada empresa.
3. La mejor solución es la que se adapta a cómo ya trabaja la gente.

## Por qué fallan muchas soluciones con IA
- **Parten de la tecnología:** eligen una herramienta primero y después intentan que encaje en el negocio.
- **No entienden el problema:** nadie analiza cómo funciona realmente el proceso ni dónde se traba.
- **No miran a las personas:** no tienen en cuenta cómo trabaja el equipo, cuánto tiempo tiene ni sus costumbres.

Resultado: soluciones que nadie usa, que complican más de lo que ayudan y que terminan abandonadas.

## Qué hacemos
1. **Software e IA** (servicio principal): soluciones a medida que mejoran los procesos de un negocio y encajan con cómo trabaja su gente.
2. **Automatizaciones inteligentes:** tareas repetitivas que se resuelven solas con ayuda de IA, usando las herramientas que la gente ya usa.
3. **Sitios web:** diseñamos y programamos páginas web para negocios y proyectos.
4. **Bases de datos:** para ordenar la información de un negocio. Es un área en la que nos seguimos formando.

Nota para el sitio: en las automatizaciones no hace falta dar detalles técnicos ni nombrar herramientas concretas (por ejemplo WhatsApp). Mantenerlo general.

## Cómo trabajamos
1. **Observar:** miramos cómo trabaja el negocio en el día a día.
2. **Entender:** identificamos cuál es el problema real y quién lo vive.
3. **Diseñar:** pensamos una solución que encaje con su forma de trabajar.
4. **Implementar:** armamos algo simple, que no obligue a aprender mucho.
5. **Ajustar:** medimos, escuchamos y mejoramos sobre la marcha.

Principio: primero entendemos el problema y a las personas. Recién después diseñamos la solución.

## Hacia dónde vamos
Primero, armar el sitio web de Nodal. En paralelo, seguir formándonos en bases de datos e ir sumando servicios de a poco. Meta: que Nodal sea la empresa que logra que la IA funcione de verdad en los negocios.

## Tono de voz
Claro, cercano y humano, como una persona explicándole a otra. Frases cortas. Sin jerga técnica innecesaria, sin promesas exageradas, sin lenguaje de folleto. Si una frase suena a texto genérico de empresa, reescribirla.

## Identidad visual
- Colores: azul marino `#0E1B2C` (principal, fondos oscuros), verde azulado `#1FB5A8` y `#009E94` (acento), azul `#2446F6` (acento puntual, nodos del logo), texto `#1B2736`, texto secundario `#5F6C7B`, fondo claro `#F4F7F9`, bordes `#DDE4EA`, fondo suave `#E6F6F4`.
- Tipografía: **Poppins** (Light, Regular, Medium, Bold). Títulos en Bold, cuerpo en Regular.
- Estilo: limpio, mucho aire, tarjetas con esquinas redondeadas, secciones claras alternadas con secciones en azul marino. Motivo decorativo de nodos conectados por líneas finas (puntos azul y verde azulado sobre líneas grises). Tiene que verse moderno y sobrio, no recargado.
- Logo en `assets/`: `logo-nodal-fondo-claro.png` (texto navy, para fondos claros) y `logo-nodal-fondo-oscuro.png` (texto blanco, para fondos oscuros). Ambos con fondo transparente. Son PNG, no vectoriales: si Mateo consigue el original en SVG, usarlo.
- Contacto de la empresa: mcataldo@nodaldevelopments.com (visible en el sitio). Formularios y diagnósticos llegan ahí, enviados desde web@nodaldevelopments.com (dominio verificado en Resend, región São Paulo, solo envío: "Enable Receiving" apagado para no romper el mail de Hostinger).

## Estructura sugerida (a validar con Mateo)
1. **Inicio:** frase de marca, qué hacemos en una línea, llamado a contactar.
2. **Qué hacemos:** los cuatro servicios.
3. **Cómo trabajamos:** los cinco pasos y el principio.
4. **Por qué Nodal:** el origen y la convicción.
5. **Contacto.**

Puede ser una sola página con secciones. Debe verse bien en celular.

## Decisiones ya tomadas con Mateo (octubre 2026)
- Contacto: formulario (nombre, apellido, email, descripción) que llega por mail, y el mail mcataldo@nodaldevelopments.com visible en el sitio.
- Idiomas: español e inglés (botón ES/EN; el español está en el HTML y el inglés en `public/js/i18n.js`).
- Dominio: **nodaldevelopments.com**, comprado en Hostinger.
- Hosting: **Hostinger, plan Business** de Mateo, como app Node.js (`npm start` → `server.js`) conectada al repo de GitHub `Mateocataldo/nodal-sitio`. El plan Business vence el 2026-11-22: recordarle renovarlo. En ese plan también está su otro sitio, wicklowtecdevelopment.com. Netlify quedó como prueba anterior y no se usa.
- Agregados aprobados: animación de portada (puntos que forman la N al bajar) y "Diagnóstico con IA" (Claude) que pregunta primero y después muestra el proceso como mapa.
- La IA del diagnóstico está limitada: **solo diagnostica, nunca da soluciones, herramientas ni pasos**, aunque se lo pidan. Al terminar ofrece enviarlo; si la persona acepta, le pide nombre, apellido, email y empresa (opcional) dentro del chat y manda a Mateo un mail con datos, resumen, diagnóstico y conversación completa (`api/enviar-diagnostico.js`).
- Logo: redibujado en SVG (`public/assets/logo-nodal-simbolo.svg`) a partir del PNG.
- Ver `LEEME.md` para correrlo y publicarlo.

## Forma de trabajar
- Mostrar avances chicos y pedir feedback antes de seguir.
- Explicarle a Mateo lo que se hace en lenguaje simple: no es desarrollador de profesión.
- Priorizar velocidad de carga, accesibilidad y SEO básico.
- No agregar secciones ni funciones que Mateo no haya pedido.
