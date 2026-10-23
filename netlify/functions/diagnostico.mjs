import funcion from "../../api/diagnostico.js";
import { adaptar } from "../../lib/netlify.js";

export default adaptar(funcion);
export const config = { path: "/api/diagnostico" };
