// Aggregate Root: representa al vehiculo de forma independiente de cualquier
// orden de servicio puntual, permitiendo consultar su historial completo.
export class Vehiculo {
  #id; #placa; #marca; #modelo; #vin; #kilometraje; #nivelCombustible; #danosVisibles; #motivoIngreso;

  constructor({ id, placa, marca, modelo, vin, kilometraje, nivelCombustible, danosVisibles, motivoIngreso }) {
    this.#id = id;
    this.#placa = placa; // invariante: no cambia una vez registrado (sin setter publico)
    this.#marca = marca;
    this.#modelo = modelo;
    this.#vin = vin; // invariante: no cambia una vez registrado
    this.#kilometraje = kilometraje;
    this.#nivelCombustible = nivelCombustible;
    this.#danosVisibles = danosVisibles;
    this.#motivoIngreso = motivoIngreso;
  }

  static registrar(datos) {
    return new Vehiculo({ id: crypto.randomUUID(), ...datos });
    // Emite VehiculoRecibido (ver domain/events)
  }

  get id() { return this.#id; }
  get placa() { return this.#placa; }
  get vin() { return this.#vin; }
}
