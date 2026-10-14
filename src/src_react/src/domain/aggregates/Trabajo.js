export const EstadoTrabajo = Object.freeze({
  PENDIENTE_DE_AUTORIZACION: 'PendienteDeAutorizacion',
  AUTORIZADO: 'Autorizado',
  RECHAZADO: 'Rechazado',
});

// Entity interna del Aggregate OrdenDeServicio.
// Invariante (US-08): solo se ejecutan trabajos en estado Autorizado.
export class Trabajo {
  #estado;
  id; descripcion; monto; porcentajeAmpliacion;

  constructor({ descripcion, monto, porcentajeAmpliacion = 0 }) {
    this.id = crypto.randomUUID();
    this.descripcion = descripcion;
    this.monto = monto;
    this.porcentajeAmpliacion = porcentajeAmpliacion;
    this.#estado = EstadoTrabajo.PENDIENTE_DE_AUTORIZACION;
  }

  static proponer(datos) { return new Trabajo(datos); }

  get estado() { return this.#estado; }

  autorizar() { this.#estado = EstadoTrabajo.AUTORIZADO; }
  rechazar() { this.#estado = EstadoTrabajo.RECHAZADO; }
  puedeEjecutarse() { return this.#estado === EstadoTrabajo.AUTORIZADO; }
}
