/**
 * Corrige el hallazgo ISP #5 (Etapa 7): contrato minimo de un solo metodo,
 * en vez de una interfaz con metodos distintos por canal (SMS/correo/
 * WhatsApp) que obligaria a los consumidores a depender de canales que no
 * usan.
 * @interface INotificacionCliente
 * @method notificar(destinatario, mensaje) => Promise<void>
 */
export {};
