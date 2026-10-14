// Correccion SRP (hallazgo #2, Etapa 7 / ADR-002): toca UN SOLO Aggregate
// (OrdenDeServicio). Consistencia con SolicitarRefaccionAProveedorService es
// EVENTUAL, coordinada por el evento RefaccionSinExistenciaDetectada, no por
// una transaccion distribuida.
export class MarcarEsperaDeRefaccionService {
  #ordenes;
  constructor({ ordenDeServicioRepository }) { this.#ordenes = ordenDeServicioRepository; }

  async marcarEnEspera({ ordenId }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    if (!orden) throw new Error('Orden de servicio no encontrada.');

    orden.marcarEnEsperaDeRefaccion();
    await this.#ordenes.guardar(orden);
  }
}
