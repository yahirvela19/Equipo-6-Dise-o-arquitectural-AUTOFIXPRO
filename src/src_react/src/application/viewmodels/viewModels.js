// Proyecciones de solo lectura (CQRS): nunca exponen las entidades del
// dominio directamente, solo lo que cada pantalla necesita mostrar.

/** @typedef {{placa:string, marca:string, modelo:string, estadoActual:string, fechaIngreso:string, nuevaFechaEstimada:string|null}} EstadoVehiculoViewModel */
/** @typedef {{descripcion:string, monto:number}} ConceptoCobroDto */
/** @typedef {{ordenId:string, conceptosAutorizadosYEjecutados:ConceptoCobroDto[], totalACobrar:number}} DetalleCobroViewModel */
/** @typedef {{periodo:string, numeroDeDisputasPorAutorizacion:number, tiempoPromedioComunicacionRetrasosHoras:number, porcentajeAutorizacionesConEvidenciaDigital:number}} IndicadoresViewModel */
export {};
