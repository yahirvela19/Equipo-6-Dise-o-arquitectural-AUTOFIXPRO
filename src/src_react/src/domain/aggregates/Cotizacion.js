export const TipoCotizacion = Object.freeze({ ORIGINAL: 'Original', COMPLEMENTARIA: 'Complementaria' });

// Entity interna del Aggregate OrdenDeServicio.
export class Cotizacion {
  id; tipo; montoOriginal; trabajos;

  constructor(tipo, montoOriginal, trabajos) {
    this.id = crypto.randomUUID();
    this.tipo = tipo;
    this.montoOriginal = montoOriginal;
    this.trabajos = [...trabajos];
  }

  static crearOriginal(monto, trabajos) {
    return new Cotizacion(TipoCotizacion.ORIGINAL, monto, trabajos);
  }

  static crearComplementaria(monto, trabajos) {
    return new Cotizacion(TipoCotizacion.COMPLEMENTARIA, monto, trabajos);
  }
}
