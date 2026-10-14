// Entity interna del Aggregate OrdenDeServicio (1:1 con la orden).
export class Diagnostico {
  id; fallaOriginal;
  constructor(fallaOriginal) {
    this.id = crypto.randomUUID();
    this.fallaOriginal = fallaOriginal;
  }
}
