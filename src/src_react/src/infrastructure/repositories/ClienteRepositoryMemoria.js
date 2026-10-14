export class ClienteRepositoryMemoria {
  #clientes = new Map();

  async obtenerPorId(id) { return this.#clientes.get(id) ?? null; }

  async obtenerResponsableDeCuenta(clienteFlotillaId) {
    const c = this.#clientes.get(clienteFlotillaId);
    return c?.tipoCliente === 'Flotilla' ? c : null;
  }

  async guardar(cliente) { this.#clientes.set(cliente.id, cliente); }
}
