/**
 * Contratos de Repository en terminos del dominio (JSDoc en vez de
 * interfaces formales, porque JavaScript no tiene interfaces nativas).
 * Ninguna de estas firmas expone SQL, tablas ni columnas -- eso es
 * responsabilidad exclusiva de infrastructure/ (Dependency Inversion,
 * revisado en la Etapa 7).
 *
 * @interface IVehiculoRepository
 * @method obtenerPorId(id) => Promise<Vehiculo|null>
 * @method obtenerPorPlaca(placa) => Promise<Vehiculo|null>
 * @method guardar(vehiculo) => Promise<void>
 *
 * @interface IClienteRepository
 * @method obtenerPorId(id) => Promise<Cliente|ClienteFlotilla|null>
 * @method obtenerResponsableDeCuenta(clienteFlotillaId) => Promise<ClienteFlotilla|null>
 * @method guardar(cliente) => Promise<void>
 *
 * @interface IOrdenDeServicioRepository
 * @method obtenerPorId(ordenId) => Promise<OrdenDeServicio|null>
 * @method obtenerPorVehiculo(vehiculoId) => Promise<OrdenDeServicio[]>
 * @method obtenerCerradasPorClienteYPeriodo(clienteId, periodo) => Promise<OrdenDeServicio[]>
 * @method guardar(orden) => Promise<void>
 *
 * @interface IOrdenDeCompraRepository
 * @method obtenerPorId(id) => Promise<OrdenDeCompra|null>
 * @method guardar(ordenDeCompra) => Promise<void>
 *
 * @interface IFacturacionConsolidadaRepository
 * @method obtenerPorClienteYPeriodo(clienteFlotillaId, periodo) => Promise<FacturacionConsolidada|null>
 * @method guardar(facturacion) => Promise<void>
 */
export {};
