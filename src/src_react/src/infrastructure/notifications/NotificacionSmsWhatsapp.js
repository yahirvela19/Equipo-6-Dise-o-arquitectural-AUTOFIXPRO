// Implementacion concreta de infraestructura; el canal especifico (SMS,
// correo, WhatsApp) se decide aqui, no en el contrato que usa la aplicacion.
export class NotificacionSmsWhatsapp {
  async notificar(destinatario, mensaje) {
    // Integracion real con proveedor de SMS/WhatsApp pendiente de definir.
    console.log(`[Notificacion] a ${destinatario}: ${mensaje}`);
  }
}
