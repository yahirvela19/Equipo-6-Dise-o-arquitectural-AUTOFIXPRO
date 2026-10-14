// Pregunta 13 del levantamiento: 24h sin respuesta de autorizacion ->
// "En espera de cliente" + notificar al gerente del taller.
const PLAZO_RESPUESTA_MS = 24 * 60 * 60 * 1000;

export class ServicioDeEscalamiento {
  debeEscalar(fechaSolicitudAutorizacion, ahora = new Date()) {
    return (ahora - new Date(fechaSolicitudAutorizacion)) >= PLAZO_RESPUESTA_MS;
  }
}
