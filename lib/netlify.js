// Adapta las funciones de /api (escritas como req/res) al formato de Netlify,
// así la misma lógica corre en tu compu y publicada.
export function adaptar(funcion) {
  return async (pedido, contexto) => {
    let body = null;
    try { body = await pedido.json(); } catch {}
    const req = {
      method: pedido.method,
      body,
      headers: Object.fromEntries(pedido.headers),
      socket: { remoteAddress: contexto?.ip },
    };
    let estado = 200;
    let datos = {};
    const res = {
      status(codigo) { estado = codigo; return res; },
      json(obj) { datos = obj; return res; },
    };
    try {
      await funcion(req, res);
    } catch (error) {
      console.error(error);
      estado = 500;
      datos = { error: "interno" };
    }
    return Response.json(datos, { status: estado });
  };
}
