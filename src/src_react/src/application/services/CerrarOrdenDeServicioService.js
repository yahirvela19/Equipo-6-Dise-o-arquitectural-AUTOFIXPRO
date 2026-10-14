export class CerrarOrdenDeServicioService {
  #ordenes;
  constructor({ ordenDeServicioRepository }) { this.#ordenes = ordenDeServicioRepository; }

  async cerrarOrden({ ordenId }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    if (!orden) throw new Error('Orden de servicio no encontrada.');

    orden.cerrar(); // valida que solo haya conceptos autorizados/ejecutados
    await this.#ordenes.guardar(orden);
  }
}
