// Implementacion en memoria: util para demos y pruebas en el navegador
// (el boilerplate pedido por la actividad), y para el componente React de
// ejemplo. Una implementacion real contra una API/SQL solo cambiaria este
// archivo -- ni domain/ ni application/ se enteran (Dependency Inversion).
export class OrdenDeServicioRepositoryMemoria {
  #ordenes = new Map();

  async obtenerPorId(ordenId) { return this.#ordenes.get(ordenId) ?? null; }

  async obtenerPorVehiculo(vehiculoId) {
    return [...this.#ordenes.values()].filter((o) => o.vehiculoId === vehiculoId);
  }

  async obtenerCerradasPorClienteYPeriodo(clienteId, periodo) {
    return [...this.#ordenes.values()].filter(
      (o) => o.clienteId === clienteId && o.estado === 'Cerrado' && (o.fechaIngreso ?? '').startsWith(periodo),
    );
  }

  async guardar(orden) { this.#ordenes.set(orden.id, orden); }
}
