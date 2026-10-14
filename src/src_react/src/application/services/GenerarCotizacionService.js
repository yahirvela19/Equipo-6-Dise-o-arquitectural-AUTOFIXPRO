export class GenerarCotizacionService {
  #ordenes;
  constructor({ ordenDeServicioRepository }) { this.#ordenes = ordenDeServicioRepository; }

  async generarCotizacion({ ordenId, montoOriginal, trabajos }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    if (!orden) throw new Error('Orden de servicio no encontrada.');

    // La regla "no cotizar sin diagnostico" la valida el propio Aggregate.
    const cotizacion = orden.generarCotizacion(montoOriginal, trabajos);

    await this.#ordenes.guardar(orden);
    return cotizacion.id;
  }
}
