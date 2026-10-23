import funcion from "../../api/contacto.js";
import { adaptar } from "../../lib/netlify.js";

export default adaptar(funcion);
export const config = { path: "/api/contacto" };
