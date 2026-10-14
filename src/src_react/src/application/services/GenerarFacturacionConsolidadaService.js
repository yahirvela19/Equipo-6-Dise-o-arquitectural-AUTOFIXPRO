import { FacturacionConsolidada } from '../../domain/aggregates/FacturacionConsolidada.js';

export class GenerarFacturacionConsolidadaService {
  #ordenes; #facturaciones;
  constructor({ ordenDeServicioRepository, facturacionConsolidadaRepository }) {
    this.#ordenes = ordenDeServicioRepository;
    this.#facturaciones = facturacionConsolidadaRepository;
  }

  async generarFacturacion({ clienteFlotillaId, periodo }) {
    const ordenesCerradas = await this.#ordenes.obtenerCerradasPorClienteYPeriodo(clienteFlotillaId, periodo);

    const facturacion = FacturacionConsolidada.generar(
      clienteFlotillaId, periodo, ordenesCerradas.map((o) => o.id),
    );

    await this.#facturaciones.guardar(facturacion);
    return facturacion.id;
  }
}
