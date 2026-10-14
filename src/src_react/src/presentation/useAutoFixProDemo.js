import { useMemo, useState, useCallback } from 'react';
import { Vehiculo } from '../domain/aggregates/Vehiculo.js';
import { Cliente } from '../domain/aggregates/Cliente.js';
import { OrdenDeServicio } from '../domain/aggregates/OrdenDeServicio.js';
import { Trabajo } from '../domain/aggregates/Trabajo.js';
import { AutorizarTrabajosService } from '../application/services/AutorizarTrabajosService.js';
import { GenerarCotizacionService } from '../application/services/GenerarCotizacionService.js';
import { OrdenDeServicioRepositoryMemoria } from '../infrastructure/repositories/OrdenDeServicioRepositoryMemoria.js';
import { ClienteRepositoryMemoria } from '../infrastructure/repositories/ClienteRepositoryMemoria.js';

// Hook de demostracion: ejercita CU-01 (Figura 3 del informe, diagrama de
// secuencia de flujo normal) con los repositorios en memoria. Este archivo
// es la unica pieza "de UI"; domain/ y application/ no saben que React
// existe, como corresponde a una arquitectura por capas.
export function useAutoFixProDemo() {
  const [log, setLog] = useState([]);
  const añadirLog = useCallback((linea) => setLog((l) => [...l, linea]), []);

  const contenedor = useMemo(() => {
    const ordenDeServicioRepository = new OrdenDeServicioRepositoryMemoria();
    const clienteRepository = new ClienteRepositoryMemoria();
    return {
      ordenDeServicioRepository,
      clienteRepository,
      autorizarTrabajosService: new AutorizarTrabajosService({ ordenDeServicioRepository, clienteRepository }),
      generarCotizacionService: new GenerarCotizacionService({ ordenDeServicioRepository }),
    };
  }, []);

  const ejecutarFlujoNormal = useCallback(async () => {
    setLog([]);
    const { ordenDeServicioRepository, clienteRepository, generarCotizacionService, autorizarTrabajosService } = contenedor;

    const clienteId = crypto.randomUUID();
    const cliente = Cliente.registrar(clienteId);
    await clienteRepository.guardar(cliente);
    añadirLog(`Cliente registrado: ${clienteId}`);

    const vehiculo = Vehiculo.registrar({
      placa: 'NLR-1234', marca: 'Nissan', modelo: 'Versa', vin: 'VIN123456789',
      kilometraje: 45000, nivelCombustible: 'Medio', danosVisibles: 'Ninguno', motivoIngreso: 'Ruido en frenos',
    });
    añadirLog(`Vehiculo recibido: ${vehiculo.placa}`);

    const orden = OrdenDeServicio.recibir(vehiculo.id, cliente.id);
    orden.registrarDiagnostico('Balatas delanteras desgastadas');
    await ordenDeServicioRepository.guardar(orden);
    añadirLog(`Orden ${orden.id} en estado: ${orden.estado}`);

    const trabajo = Trabajo.proponer({ descripcion: 'Cambio de balatas delanteras', monto: 1200 });
    const cotizacionId = await generarCotizacionService.generarCotizacion({
      ordenId: orden.id, montoOriginal: 1200, trabajos: [trabajo],
    });
    añadirLog(`Cotizacion generada: ${cotizacionId} (CU-01)`);

    const registro = await autorizarTrabajosService.autorizarTrabajos({
      ordenId: orden.id, cotizacionId, usuarioAutorizador: cliente.id,
      trabajosAAutorizar: [trabajo.id], esAmpliacionDeTrabajoYaAutorizado: false,
    });
    añadirLog(`Trabajo autorizado por ${registro.usuarioAutorizador} el ${registro.fechaHoraAutorizacion}`);
    añadirLog(`RegistroDeAutorizacion es inmutable: ${Object.isFrozen(registro)}`);
  }, [contenedor, añadirLog]);

  return { log, ejecutarFlujoNormal };
}
