export class ReportarFallaAdicionalService {
  #ordenes;
  constructor({ ordenDeServicioRepository }) { this.#ordenes = ordenDeServicioRepository; }

  async reportarFallaAdicional({ ordenId, descripcionFalla, monto, trabajos }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    if (!orden) throw new Error('Orden de servicio no encontrada.');

    const cotizacion = orden.generarCotizacionComplementaria(descripcionFalla, monto, trabajos);

    await this.#ordenes.guardar(orden);
    return cotizacion.id;
    // La aprobacion posterior reutiliza AutorizarTrabajosService.
  }
}
