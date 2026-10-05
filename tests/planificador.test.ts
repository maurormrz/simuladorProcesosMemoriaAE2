import { describe, it, expect, beforeEach } from 'vitest';
import { PlanificadorRoundRobin } from '../src/PlanificadorRoundRobin';
import { Proceso } from '../src/Proceso';

describe('PlanificadorRoundRobin', () => {
  let planificador: PlanificadorRoundRobin;

  beforeEach(() => {
    planificador = new PlanificadorRoundRobin(2); // Quantum = 2
  });

  it('debe encolar procesos y despachar el primero', () => {
    const p1 = new Proceso(1, 100, 5);
    planificador.agregarListo(p1);

    const despachado = planificador.despachar();
    expect(despachado?.pid).toBe(1);
  });

  it('debe rotar procesos cuando se agota el quantum', () => {
    const p1 = new Proceso(1, 100, 5);
    const p2 = new Proceso(2, 100, 5);

    planificador.agregarListo(p1);
    planificador.agregarListo(p2);

    planificador.despachar();

    planificador.ejecutarTickCPU(); 
    planificador.ejecutarTickCPU();

    const siguiente = planificador.despachar();
    expect(siguiente?.pid).toBe(2);
  });
});