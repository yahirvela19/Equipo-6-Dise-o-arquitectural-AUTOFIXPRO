import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OrdenDeServicio } from '../src/domain/aggregates/OrdenDeServicio.js';
import { Trabajo } from '../src/domain/aggregates/Trabajo.js';
import { Cliente } from '../src/domain/aggregates/Cliente.js';
import { politicaAutorizacionEstandar } from '../src/domain/services/politicasDeAutorizacion.js';

// Prueba del escenario Gherkin de US-03 (criterio de aceptacion de la U2):
// "no puede generarse una cotizacion si no existe diagnostico previo".
test('no se puede cotizar sin diagnostico previo (invariante de OrdenDeServicio)', () => {
  const orden = OrdenDeServicio.recibir(crypto.randomUUID(), crypto.randomUUID());
  assert.throws(() => orden.generarCotizacion(100, []), /diagnostico previo/);
});

// Prueba del criterio de aceptacion de US-08: solo se ejecutan trabajos Autorizado.
test('un trabajo rechazado no puede ejecutarse', () => {
  const clienteId = crypto.randomUUID();
  const cliente = Cliente.registrar(clienteId);
  const orden = OrdenDeServicio.recibir(crypto.randomUUID(), clienteId);
  orden.registrarDiagnostico('Falla simulada');

  const trabajo = Trabajo.proponer({ descripcion: 'Cambio de balatas', monto: 500 });
  const cotizacion = orden.generarCotizacion(500, [trabajo]);

  orden.autorizarTrabajos(cotizacion.id, cliente, clienteId, [], politicaAutorizacionEstandar);

  assert.equal(trabajo.estado, 'Rechazado');
  assert.equal(trabajo.puedeEjecutarse(), false);
});
