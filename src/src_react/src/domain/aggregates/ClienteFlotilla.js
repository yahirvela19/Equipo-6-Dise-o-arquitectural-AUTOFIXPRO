import { Cliente } from './Cliente.js';

// Especializacion de Cliente para cuentas de flotilla (BN-05).
export class ClienteFlotilla extends Cliente {
  #responsableCuentaId; esquemaCobro = 'FacturacionConsolidadaMensual';

  constructor(id, responsableCuentaId) {
    super(id);
    this.tipoCliente = 'Flotilla';
    this.#responsableCuentaId = responsableCuentaId;
  }

  static registrar(id, responsableCuentaId) {
    return new ClienteFlotilla(id, responsableCuentaId);
  }

  // ADR-003: sustituye la validacion del titular por la del responsable de
  // cuenta, sin romper el contrato que usa AutorizarTrabajosService (Liskov).
  validarAutorizador(usuarioId) {
    return usuarioId === this.#responsableCuentaId;
  }
}
