# AutoFix Pro — Código base (Unidad 3)

Estructura mínima en **React 19 + JavaScript (ES2023+)**, servida con
**Vite**, que materializa las decisiones de las Etapas 3 a 8 del informe de
arquitectura. No es un sistema de producción: los repositorios de
`infrastructure/` están implementados en memoria a propósito, porque el
alcance de esta entrega es revisar la organización y las responsabilidades
propuestas, no una integración real contra una base de datos (tal como lo
permite la actividad: "El código puede ser parcial o boilerplate").

## Requisitos

- Node.js 20+ (recomendado 22 LTS)
- npm 10+

## Instalación y ejecución

```bash
npm install
npm run dev      # levanta la demo en http://localhost:5173
npm run build    # build de producción
npm test         # corre las pruebas de node:test sobre el dominio
```

La demo (`npm run dev`) ejecuta en el navegador el flujo normal de CU-01
(generar cotización y autorizar trabajos), el mismo que muestra la Figura 3
del informe (diagrama de secuencia). El botón "Ejecutar flujo normal"
dispara exactamente la secuencia: Asesor → AutorizarTrabajosService →
Cliente (dominio) → OrdenDeServicio → Repository.

## Estructura

```
src/
├── domain/              # Entidades, Value Objects, Domain Services, eventos, contratos de Repository
│   ├── aggregates/       Vehiculo, Cliente/ClienteFlotilla, OrdenDeServicio (+Diagnostico/Cotizacion/Trabajo), OrdenDeCompra, FacturacionConsolidada
│   ├── valueobjects/     RegistroDeAutorizacion, EvidenciaFotografica, NecesidadDeRefaccion
│   ├── services/         politicasDeAutorizacion (IPoliticaDeAutorizacion), ServicioDeEscalamiento, ServicioDePriorizacion
│   ├── events/           Domain Events (fábricas inmutables con Object.freeze)
│   └── repositories/     Contratos de Repository documentados en JSDoc (JS no tiene interfaces nativas)
├── application/           # Service Layer, Commands, Queries, ViewModels (Etapas 4 y 6)
│   ├── services/
│   ├── commands/
│   ├── queries/
│   └── viewmodels/
├── infrastructure/        # Implementaciones concretas en memoria (Etapa 5 y 7)
│   ├── repositories/
│   └── notifications/
└── presentation/          # Único punto donde "existe" React; invoca application/ como cualquier otro cliente
tests/                      # Pruebas sobre los criterios de aceptación de la U2 (node:test)
```

## Decisiones reflejadas en el código (ver Etapas 7 y 8 del informe)

- **ADR-002 / SRP:** `SolicitarRefaccionAProveedorService` y
  `MarcarEsperaDeRefaccionService` son servicios separados, coordinados por
  el evento `RefaccionSinExistenciaDetectada`, no por una transacción
  compartida.
- **ADR-003 / Liskov:** no existe un servicio aparte para autorización de
  flotillas; `AutorizarTrabajosService` se reutiliza para los 3 casos de uso
  (CU-01, CU-02, CU-05) delegando "quién autoriza" al método polimórfico
  `validarAutorizador()` de `Cliente` / `ClienteFlotilla`.
- **ADR-004 / OCP:** el umbral del 20% vive en `politicaAutorizacionAmpliacion`
  (domain/services/politicasDeAutorizacion.js) — una regla nueva se agrega
  como un objeto-política nuevo, no como un `if` más.
- **ISP:** `INotificacionCliente` (documentado en JSDoc) tiene un solo
  método genérico; el canal (SMS/WhatsApp) es un detalle de
  `NotificacionSmsWhatsapp`, en infraestructura.
- **DIP:** ningún archivo de `application/` ni `domain/` importa un detalle
  concreto de base de datos; solo `infrastructure/` lo hace, y
  `presentation/` solo conoce `application/`.

## Pendiente 

- Política de "vehículo no recogido a tiempo" (hallazgo de la Etapa 3): sin
  componente propio, falta validarla con el stakeholder.
- Estrategia de reintento/cola offline ante conexión inestable en tablets
  (restricción del BRD): no está resuelta en este código base.
- Los repositorios de `infrastructure/` son en memoria; una implementación
  real (REST, SQL) se añadiría como archivos nuevos en esa misma carpeta sin
  tocar `domain/` ni `application/`.
