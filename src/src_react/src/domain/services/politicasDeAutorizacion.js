// ADR-004 (corrige el hallazgo OCP #3 de la Etapa 7): una politica por regla,
// en vez de un unico servicio con condicionales crecientes. En JS, al no
// haber interfaces formales, el "contrato" es duck-typing: cualquier objeto
// con requiereNuevaAutorizacionPorAmpliacion(trabajo) sirve como politica.

// Para cotizaciones normales / fallas adicionales: toda falla adicional
// requiere autorizacion, sin umbral (pregunta 10 del levantamiento).
export const politicaAutorizacionEstandar = {
  requiereNuevaAutorizacionPorAmpliacion(_trabajo) {
    return false;
  },
};

// Pregunta 12 del levantamiento: ampliaciones mayores al 20% del monto
// original ya aprobado requieren autorizacion explicita adicional.
const UMBRAL_AMPLIACION = 0.20;
export const politicaAutorizacionAmpliacion = {
  requiereNuevaAutorizacionPorAmpliacion(trabajo) {
    return trabajo.porcentajeAmpliacion > UMBRAL_AMPLIACION;
  },
};
