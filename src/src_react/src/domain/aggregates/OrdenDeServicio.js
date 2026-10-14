import { Cotizacion } from './Cotizacion.js';
import { EstadoTrabajo } from './Trabajo.js';
import { RegistroDeAutorizacion } from '../valueobjects/RegistroDeAutorizacion.js';
import * as Eventos from '../events/DomainEvents.js';

export const EstadoOrden = Object.freeze({
  RECIBIDO: 'Recibido',
  DIAGNOSTICADO: 'Diagnosticado',
  COTIZADO: 'Cotizado',
  EN_ESPERA_DE_AUTORIZACION: 'EnEsperaDeAutorizacion',
  EN_REPARACION: 'EnReparacion',
  EN_ESPERA_DE_REFACCION: 'EnEsperaDeRefaccion',
  EN_ESPERA_DE_CLIENTE: 'EnEsperaDeCliente',
  LISTO_PARA_ENTREGA: 'ListoParaEntrega',
  CERRADO: 'Cerrado',
});

// Aggregate Root principal del dominio. Protege las invariantes centrales
// del negocio (ver ADR-001: patron Domain Model).
export class OrdenDeServicio {
  #cotizaciones = [];
  #eventos = [];

  id; vehiculoId; clienteId; estado; fechaIngreso; diagnostico = null; nuevaFechaEstimada = null;

  constructor({ id, vehiculoId, clienteId, estado, fechaIngreso }) {
    this.id = id;
    this.vehiculoId = vehiculoId;
    this.clienteId = clienteId;
    this.estado = estado;
    this.fechaIngreso = fechaIngreso;
  }

  static recibir(vehiculoId, clienteId) {
    const orden = new OrdenDeServicio({
      id: crypto.randomUUID(), vehiculoId, clienteId,
      estado: EstadoOrden.RECIBIDO, fechaIngreso: new Date().toISOString(),
    });
    orden.#eventos.push(Eventos.VehiculoRecibido(vehiculoId, orden.id));
    return orden;
  }

  get cotizaciones() { return [...this.#cotizaciones]; }
  get eventosPendientes() { return [...this.#eventos]; }

  registrarDiagnostico(diagnostico) {
    this.diagnostico = diagnostico;
    this.estado = EstadoOrden.DIAGNOSTICADO;
    this.#eventos.push(Eventos.DiagnosticoRegistrado(this.id));
  }

  generarCotizacion(montoOriginal, trabajos) {
    // Invariante: no se cotiza sin diagnostico previo.
    if (!this.diagnostico) {
      throw new Error('No puede generarse una cotizacion sin diagnostico previo.');
    }
    const cotizacion = Cotizacion.crearOriginal(montoOriginal, trabajos);
    this.#cotizaciones.push(cotizacion);
    this.estado = EstadoOrden.COTIZADO;
    this.#eventos.push(Eventos.CotizacionGenerada(this.id, cotizacion.id));
    return cotizacion;
  }

  generarCotizacionComplementaria(fallaAdicional, monto, trabajos) {
    const cotizacion = Cotizacion.crearComplementaria(monto, trabajos);
    this.#cotizaciones.push(cotizacion);
    this.#eventos.push(Eventos.FallaAdicionalReportada(this.id, cotizacion.id, fallaAdicional));
    return cotizacion;
  }

  // Aplica la autorizacion delegando "quien puede autorizar" a Cliente/
  // ClienteFlotilla (ADR-003) y el umbral del 20% a la politica (ADR-004).
  autorizarTrabajos(cotizacionId, cliente, usuarioAutorizador, trabajosAAutorizar, politica) {
    if (!cliente.validarAutorizador(usuarioAutorizador)) {
      throw new Error('El usuario no esta autorizado para aprobar esta orden.');
    }

    const cotizacion = this.#cotizaciones.find((c) => c.id === cotizacionId);
    if (!cotizacion) throw new Error('Cotizacion no encontrada en esta orden.');

    for (const trabajo of cotizacion.trabajos) {
      const autorizar = trabajosAAutorizar.includes(trabajo.id);

      if (autorizar && politica.requiereNuevaAutorizacionPorAmpliacion(trabajo)) {
        throw new Error('La ampliacion supera el 20% del monto original; requiere autorizacion explicita adicional.');
      }

      if (autorizar) {
        trabajo.autorizar();
        this.#eventos.push(Eventos.TrabajoAutorizado(this.id, trabajo.id));
      } else {
        trabajo.rechazar();
        this.#eventos.push(Eventos.TrabajoRechazado(this.id, trabajo.id));
      }
    }

    return RegistroDeAutorizacion.crear(usuarioAutorizador, trabajosAAutorizar);
    // Value Object inmutable: el llamador lo persiste junto al Trabajo.
  }

  marcarEnEsperaDeRefaccion() {
    this.estado = EstadoOrden.EN_ESPERA_DE_REFACCION;
  }

  notificarNuevaFecha(nuevaFecha) {
    this.nuevaFechaEstimada = nuevaFecha;
    this.#eventos.push(Eventos.NuevaFechaEntregaNotificada(this.id, nuevaFecha));
  }

  cerrar() {
    // Invariante: solo se cobran/cierran conceptos autorizados y ejecutados.
    const hayTrabajosSinResolver = this.#cotizaciones
      .flatMap((c) => c.trabajos)
      .some((t) => t.estado === EstadoTrabajo.PENDIENTE_DE_AUTORIZACION);

    if (hayTrabajosSinResolver) {
      throw new Error('No puede cerrarse la orden con trabajos sin resolver.');
    }

    this.estado = EstadoOrden.CERRADO;
    this.#eventos.push(Eventos.OrdenDeServicioCerrada(this.id));
  }
}
