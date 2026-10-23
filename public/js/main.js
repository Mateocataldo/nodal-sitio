import { iniciarIdioma, aplicarIdioma, idiomaActual } from "./i18n.js";
import { iniciarHero } from "./hero.js";
import { iniciarEfectos } from "./efectos.js";
import { iniciarDiagnostico } from "./diagnostico.js";
import { iniciarContacto } from "./contacto.js";

iniciarIdioma();
iniciarHero();
iniciarEfectos();
iniciarDiagnostico();
iniciarContacto();

document.addEventListener("retraducir", () => aplicarIdioma(idiomaActual()));
