// Value Object: sin identidad propia, inmutable una vez creado (US-07:
// "esa evidencia no puede ser modificada posteriormente").
export class RegistroDeAutorizacion {
  #usuarioAutorizador; #fechaHoraAutorizacion; #trabajosAprobados;

  constructor(usuarioAutorizador, fechaHora, trabajosAprobados) {
    this.#usuarioAutorizador = usuarioAutorizador;
    this.#fechaHoraAutorizacion = fechaHora;
    this.#trabajosAprobados = Object.freeze([...trabajosAprobados]);
    Object.freeze(this);
  }

  static crear(usuarioAutorizador, trabajosAprobados) {
    return new RegistroDeAutorizacion(usuarioAutorizador, new Date().toISOString(), trabajosAprobados);
  }

  get usuarioAutorizador() { return this.#usuarioAutorizador; }
  get fechaHoraAutorizacion() { return this.#fechaHoraAutorizacion; }
  get trabajosAprobados() { return this.#trabajosAprobados; }
}
