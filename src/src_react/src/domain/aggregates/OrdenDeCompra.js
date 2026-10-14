// Aggregate Root independiente de OrdenDeServicio (correccion SRP #2 /
// ADR-002): se coordina mediante el evento RefaccionSinExistenciaDetectada,
// no con una transaccion compartida.
export class OrdenDeCompra {
  id; proveedor; trabajoId;

  constructor(proveedor, trabajoId) {
    this.id = crypto.randomUUID();
    this.proveedor = proveedor;
    this.trabajoId = trabajoId;
  }

  static generar(proveedor, trabajoId) {
    return new OrdenDeCompra(proveedor, trabajoId);
  }
}
