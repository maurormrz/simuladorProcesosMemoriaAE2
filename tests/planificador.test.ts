import { describe, test, expect } from 'vitest';
import { PlanificadorRoundRobin } from '../src/PlanificadorRoundRobin';
import { Proceso } from '../src/Proceso';
import { EstadoProceso } from '../src/EstadoProceso';

describe('PlanificadorRoundRobin', () => {
  test('debe encolar procesos y despachar el primero', () => {
    const planificador = new PlanificadorRoundRobin(2);
    const p1 = new Proceso(1, 100, 4);

    p1.cambiarEstado(EstadoProceso.LISTO);
    planificador.agregarListo(p1);

    const ejecucion = planificador.despachar();
    expect(ejecucion).toBe(p1);
    expect(p1.estado).toBe(EstadoProceso.EJECUTANDO);
  });

  test('debe rotar procesos cuando se agota el quantum', () => {
    const planificador = new PlanificadorRoundRobin(2);
    const p1 = new Proceso(1, 100, 4);
    const p2 = new Proceso(2, 100, 4);

    p1.cambiarEstado(EstadoProceso.LISTO);
    p2.cambiarEstado(EstadoProceso.LISTO);
    planificador.agregarListo(p1);
    planificador.agregarListo(p2);

    planificador.ejecutarTickCPU();
    planificador.ejecutarTickCPU();

    const siguiente = planificador.despachar();
    expect(siguiente?.pid).toBe(2);
  });
});