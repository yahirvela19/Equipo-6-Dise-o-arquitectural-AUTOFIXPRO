export class FacturacionConsolidadaRepositoryMemoria {
  #facturaciones = new Map();
  async obtenerPorClienteYPeriodo(clienteFlotillaId, periodo) {
    return [...this.#facturaciones.values()]
      .find((f) => f.clienteFlotillaId === clienteFlotillaId && f.periodo === periodo) ?? null;
  }
  async guardar(facturacion) { this.#facturaciones.set(facturacion.id, facturacion); }
}
