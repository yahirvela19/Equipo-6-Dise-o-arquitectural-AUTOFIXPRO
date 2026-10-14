// Value Object: no modela inventario completo (fuera del alcance del BRD),
// solo si la refaccion requerida tiene existencia al momento de la reparacion.
export class NecesidadDeRefaccion {
  #codigoRefaccion; #tieneExistencia;
  constructor(codigoRefaccion, tieneExistencia) {
    this.#codigoRefaccion = codigoRefaccion;
    this.#tieneExistencia = tieneExistencia;
    Object.freeze(this);
  }
  static evaluar(codigoRefaccion, tieneExistencia) { return new NecesidadDeRefaccion(codigoRefaccion, tieneExistencia); }
  get codigoRefaccion() { return this.#codigoRefaccion; }
  get tieneExistencia() { return this.#tieneExistencia; }
}
