export const EtapaEvidencia = Object.freeze({ INGRESO: 'Ingreso', ENTREGA: 'Entrega' });

// Value Object inmutable (US-02, US-20).
export class EvidenciaFotografica {
  #etapa; #archivosAdjuntos;
  constructor(etapa, archivos) {
    this.#etapa = etapa;
    this.#archivosAdjuntos = Object.freeze([...archivos]);
    Object.freeze(this);
  }
  static registrar(etapa, archivos) { return new EvidenciaFotografica(etapa, archivos); }
  get etapa() { return this.#etapa; }
  get archivosAdjuntos() { return this.#archivosAdjuntos; }
}
