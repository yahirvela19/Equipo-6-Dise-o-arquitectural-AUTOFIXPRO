// Aggregate Root para BN-05: agrupa, por periodo, las ordenes cerradas de
// una cuenta de flotilla en un solo documento de cobro.
export class FacturacionConsolidada {
  id; clienteFlotillaId; periodo; #ordenesCerradas;

  constructor(clienteFlotillaId, periodo, ordenesCerradasDelPeriodo) {
    this.id = crypto.randomUUID();
    this.clienteFlotillaId = clienteFlotillaId;
    this.periodo = periodo; // ej. "2026-10"
    this.#ordenesCerradas = [...new Set(ordenesCerradasDelPeriodo)]; // invariante: sin duplicados
  }

  static generar(clienteFlotillaId, periodo, ordenesCerradasDelPeriodo) {
    return new FacturacionConsolidada(clienteFlotillaId, periodo, ordenesCerradasDelPeriodo);
  }

  get ordenesCerradas() { return [...this.#ordenesCerradas]; }
}
