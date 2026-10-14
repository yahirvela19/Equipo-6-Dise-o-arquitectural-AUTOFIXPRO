import { useAutoFixProDemo } from './useAutoFixProDemo.js';

// Componente de demostracion: no contiene reglas de negocio, solo invoca
// el Application Service (AutorizarTrabajosService) tal como lo haria
// cualquier otro cliente (una API REST, una CLI, etc.). Es el equivalente
// en codigo de la Figura 3 (diagrama de secuencia, flujo normal CU-01).
export default function App() {
  const { log, ejecutarFlujoNormal } = useAutoFixProDemo();

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>AutoFix Pro — Demo de arquitectura (CU-01)</h1>
      <p>
        Este boilerplate ejecuta el flujo normal de autorizacion de trabajos
        (Etapa 1, CU-01) usando los Application Services y repositorios en
        memoria de <code>src/infrastructure</code>. No es el sistema completo:
        su proposito es que se pueda revisar la organizacion de
        responsabilidades entre <code>domain</code>, <code>application</code> e{' '}
        <code>infrastructure</code>.
      </p>
      <button onClick={ejecutarFlujoNormal} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Ejecutar flujo normal (CU-01)
      </button>
      <pre style={{ background: '#1f1f1f', color: '#e5e5e5', padding: '1rem', borderRadius: 8, marginTop: '1rem', minHeight: 120 }}>
        {log.length === 0 ? 'Presiona el botón para ejecutar la demo…' : log.join('\n')}
      </pre>
    </main>
  );
}
