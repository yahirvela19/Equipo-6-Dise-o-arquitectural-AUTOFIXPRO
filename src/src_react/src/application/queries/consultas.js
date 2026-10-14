// Queries (CQRS, Etapa 6): lectura pura, sin tocar Aggregates de escritura.

// US-14: el cliente solo necesita leer el estado actual.
export class ConsultarEstadoVehiculoHandler {
  #vehiculos; #ordenes;
  constructor({ vehiculoRepository, ordenDeServicioRepository }) {
    this.#vehiculos = vehiculoRepository;
    this.#ordenes = ordenDeServicioRepository;
  }
  /** @returns {Promise<import('../viewmodels/viewModels.js').EstadoVehiculoViewModel>} */
  async manejar({ vehiculoId }) {
    const vehiculo = await this.#vehiculos.obtenerPorId(vehiculoId);
    const [ordenActual] = await this.#ordenes.obtenerPorVehiculo(vehiculoId);
    return {
      placa: vehiculo.placa, marca: vehiculo.marca, modelo: vehiculo.modelo,
      estadoActual: ordenActual?.estado ?? 'Sin orden activa',
      fechaIngreso: ordenActual?.fechaIngreso ?? null,
      nuevaFechaEstimada: ordenActual?.nuevaFechaEstimada ?? null,
    };
  }
}

// US-19: Caja lee unicamente los conceptos autorizados y ejecutados antes
// de invocar el Command CerrarOrdenDeServicioCommand.
export class ObtenerDetalleParaCobroHandler {
  #ordenes;
  constructor({ ordenDeServicioRepository }) { this.#ordenes = ordenDeServicioRepository; }
  /** @returns {Promise<import('../viewmodels/viewModels.js').DetalleCobroViewModel>} */
  async manejar({ ordenId }) {
    const orden = await this.#ordenes.obtenerPorId(ordenId);
    const conceptos = orden.cotizaciones
      .flatMap((c) => c.trabajos)
      .filter((t) => t.puedeEjecutarse())
      .map((t) => ({ descripcion: t.descripcion, monto: t.monto }));
    return {
      ordenId,
      conceptosAutorizadosYEjecutados: conceptos,
      totalACobrar: conceptos.reduce((acc, c) => acc + c.monto, 0),
    };
  }
}

// US-15: candidato a Table Module ligero (Etapa 2) -- consulta agregada
// sin reglas de negocio que proteger.
export class ObtenerIndicadoresHandler {
  #indicadoresRepository;
  constructor({ indicadoresRepository }) { this.#indicadoresRepository = indicadoresRepository; }
  /** @returns {Promise<import('../viewmodels/viewModels.js').IndicadoresViewModel>} */
  async manejar({ periodo }) {
    return this.#indicadoresRepository.calcularIndicadores(periodo);
  }
}
