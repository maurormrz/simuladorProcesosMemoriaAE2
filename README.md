# simuladorProcesosMemoriaAE2

Proyecto correspondiente a la Actividad de Evaluación 2 (AE2) - Sistemas Operativos y Paradigmas y Lenguajes de Programación II.

El objetivo del proyecto es desarrollar un simulador de administración de procesos y memoria contigua utilizando Programación Orientada a Objetos (POO) con TypeScript y desarrollo guiado por pruebas (TDD).

## Requerimientos funcionales

- **RF01:** Configurar e iniciar la simulación.
- **RF02:** Registrar y consultar procesos.
- **RF03:** Gestionar estados y admisión de procesos.
- **RF04:** Asignar memoria contigua mediante estrategias (First Fit, Best Fit, Worst Fit).
- **RF05:** Liberar memoria y realizar la coalescencia de bloques contiguos.
- **RF06:** Avanzar la simulación tick a tick de forma determinista.
- **RF07:** Planificar la CPU mediante el algoritmo Round Robin.
- **RF08:** Simular eventos de Entrada y Salida (E/S).
- **RF09:** Exponer métricas consultables (ocupación de RAM y fragmentación externa).
- **RF10:** Consultar el estado general del sistema.

## Requisitos

Para ejecutar y probar el proyecto es necesario contar con:

- **Node.js** (v18 o superior)
- **npm**

## Instalación

1. Clonar el repositorio:
```bash
   git clone [https://github.com/maurormrz/simuladorProcesosMemoriaAE2.git](https://github.com/maurormrz/simuladorProcesosMemoriaAE2.git)

```

2. Ingresar a la carpeta del proyecto:
```bash
cd simuladorProcesosMemoriaAE2

```


3. Instalar las dependencias:
```bash
npm install

```



## Verificar TypeScript

Para comprobar los tipos y verificar el código sin generar compilados:

```bash
npx tsc --noEmit

```

## Ejecutar las pruebas

Para ejecutar la suite completa de pruebas unitarias:

```bash
npm test

```

## Cobertura de código

Para ejecutar los tests y generar la tabla de cobertura en la consola y el reporte HTML:

```bash
npm run coverage

```

> **Nota:** El proyecto cuenta con una cobertura de código superior al 95 % verificada mediante Vitest y `@vitest/coverage-v8`.

## Características del simulador

* La simulación inicia en el tick 0 con la memoria totalmente libre y la CPU disponible.
* Se implementan estrategias de asignación dinámicas (`FirstFit`, `BestFit`, `WorstFit`).
* Coalescencia automática de bloques contiguos al liberar memoria.
* Planificación de CPU mediante **Round Robin** con quántum configurable.
* El correcto funcionamiento se valida al 100 % mediante pruebas automatizadas unitarias e integradas, prescindiendo de interfaz gráfica o menú interactivo.