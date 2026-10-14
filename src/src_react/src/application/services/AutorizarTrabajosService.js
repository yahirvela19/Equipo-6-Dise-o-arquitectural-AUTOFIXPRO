import { politicaAutorizacionEstandar, politicaAutorizacionAmpliacion } from '../../domain/services/politicasDeAutorizacion.js';

// Reutilizado por CU-01, CU-02 y CU-05 (ADR-003): la intencion de negocio
// "autorizar trabajos de una cotizacion" es la misma sin importar si el
// cliente es particular o de flotilla, o si la cotizacion es original o
// complementaria -- esa diferencia vive en el dominio, no aqui.
export class AutorizarTrabajosService {
  #ordenes; #clientes;

  constructor({ ordenDeServicioRepository, clienteRepository }) {
    this.#ordenes = ordenDeServicioRepository;
    this.#clientes = clienteRepository;
  }

  async autorizarTrabajos({ ordenId, cotizacionId, usuarioAutorizador, trabajosAAutorizar, esAmpliacionDeTrabajoYaAutorizado }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    if (!orden) throw new Error('Orden de servicio no encontrada.');

    const cliente = await this.#clientes.obtenerPorId(orden.clienteId);
    if (!cliente) throw new Error('Cliente no encontrado.');

    const politica = esAmpliacionDeTrabajoYaAutorizado ? politicaAutorizacionAmpliacion : politicaAutorizacionEstandar;

    // Coordina; la decision del umbral y de quien puede autorizar vive en el dominio.
    const registro = orden.autorizarTrabajos(cotizacionId, cliente, usuarioAutorizador, trabajosAAutorizar, politica);

    await this.#ordenes.guardar(orden); // una sola transaccion: Trabajo(s) + RegistroDeAutorizacion
    return registro;
  }
}
