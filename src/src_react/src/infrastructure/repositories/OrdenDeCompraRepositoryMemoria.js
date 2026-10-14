export class OrdenDeCompraRepositoryMemoria {
  #ordenesDeCompra = new Map();
  async obtenerPorId(id) { return this.#ordenesDeCompra.get(id) ?? null; }
  async guardar(ordenDeCompra) { this.#ordenesDeCompra.set(ordenDeCompra.id, ordenDeCompra); }
}
