// Aggregate Root base. ClienteFlotilla lo extiende (ADR-003: metodo
// polimorfico validarAutorizador, en vez de un servicio aparte para flotillas).
export class Cliente {
  #id; tipoCliente = 'Particular';

  constructor(id) { this.#id = id; }

  static registrar(id) { return new Cliente(id); }

  get id() { return this.#id; }

  // Por defecto, solo el cliente titular puede autorizar.
  validarAutorizador(usuarioId) {
    return usuarioId === this.#id;
  }
}
