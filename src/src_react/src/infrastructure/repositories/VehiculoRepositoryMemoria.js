export class VehiculoRepositoryMemoria {
  #vehiculos = new Map();

  async obtenerPorId(id) { return this.#vehiculos.get(id) ?? null; }

  async obtenerPorPlaca(placa) {
    return [...this.#vehiculos.values()].find((v) => v.placa === placa) ?? null;
  }

  async guardar(vehiculo) { this.#vehiculos.set(vehiculo.id, vehiculo); }
}
