import { OrdenDeCompra } from '../../domain/aggregates/OrdenDeCompra.js';

// Correccion SRP (hallazgo #2, Etapa 7 / ADR-002): toca UN SOLO Aggregate
// (OrdenDeCompra). Ya no coordina tambien a OrdenDeServicio en la misma
// transaccion; eso lo hace MarcarEsperaDeRefaccionService, en reaccion al
// mismo Domain Event.
export class SolicitarRefaccionAProveedorService {
  #ordenesDeCompra;
  constructor({ ordenDeCompraRepository }) { this.#ordenesDeCompra = ordenDeCompraRepository; }

  async solicitarRefaccion({ trabajoId, proveedor }) {
    const ordenDeCompra = OrdenDeCompra.generar(proveedor, trabajoId);
    await this.#ordenesDeCompra.guardar(ordenDeCompra);
    return ordenDeCompra.id;
  }
}
