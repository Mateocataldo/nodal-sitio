import funcion from "../../api/enviar-diagnostico.js";
import { adaptar } from "../../lib/netlify.js";

export default adaptar(funcion);
export const config = { path: "/api/enviar-diagnostico" };
