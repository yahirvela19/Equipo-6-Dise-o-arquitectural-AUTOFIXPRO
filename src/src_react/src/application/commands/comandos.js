// Commands (CQRS, Etapa 6): intencion de cambiar el estado del sistema.
export const crearAutorizarTrabajosCommand = (ordenId, cotizacionId, usuarioAutorizador, trabajosAAutorizar, esAmpliacionDeTrabajoYaAutorizado) =>
  ({ tipo: 'AutorizarTrabajosCommand', ordenId, cotizacionId, usuarioAutorizador, trabajosAAutorizar, esAmpliacionDeTrabajoYaAutorizado });

export const crearReportarFallaAdicionalCommand = (ordenId, descripcionFalla, tecnicoId) =>
  ({ tipo: 'ReportarFallaAdicionalCommand', ordenId, descripcionFalla, tecnicoId });

export const crearCerrarOrdenDeServicioCommand = (ordenId) =>
  ({ tipo: 'CerrarOrdenDeServicioCommand', ordenId });
