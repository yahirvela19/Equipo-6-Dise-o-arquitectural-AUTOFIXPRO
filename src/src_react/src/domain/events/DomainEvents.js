// Domain Events: hechos de negocio ya ocurridos. Se modelan como clases
// inmutables (Object.freeze) porque un hecho pasado no se modifica.

function hecho(nombre, datos) {
  return Object.freeze({ tipo: nombre, ocurridoEn: new Date().toISOString(), ...datos });
}

export const VehiculoRecibido = (vehiculoId, ordenId) => hecho('VehiculoRecibido', { vehiculoId, ordenId });
export const DiagnosticoRegistrado = (ordenId) => hecho('DiagnosticoRegistrado', { ordenId });
export const CotizacionGenerada = (ordenId, cotizacionId) => hecho('CotizacionGenerada', { ordenId, cotizacionId });
export const TrabajoAutorizado = (ordenId, trabajoId) => hecho('TrabajoAutorizado', { ordenId, trabajoId });
export const TrabajoRechazado = (ordenId, trabajoId) => hecho('TrabajoRechazado', { ordenId, trabajoId });
export const FallaAdicionalReportada = (ordenId, cotizacionId, descripcion) =>
  hecho('FallaAdicionalReportada', { ordenId, cotizacionId, descripcion });
export const RefaccionSinExistenciaDetectada = (trabajoId, codigoRefaccion, proveedor) =>
  hecho('RefaccionSinExistenciaDetectada', { trabajoId, codigoRefaccion, proveedor });
export const NuevaFechaEntregaNotificada = (ordenId, nuevaFecha) =>
  hecho('NuevaFechaEntregaNotificada', { ordenId, nuevaFecha });
export const OrdenDeServicioCerrada = (ordenId) => hecho('OrdenDeServicioCerrada', { ordenId });
