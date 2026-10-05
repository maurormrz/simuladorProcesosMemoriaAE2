import { describe, test, expect } from 'vitest';
import { Proceso } from '../src/Proceso';
import { EstadoProceso } from '../src/EstadoProceso';

describe('Proceso', () => {
  test('debe crearse en estado NUEVO con sus datos iniciales', () => {
    const p = new Proceso(1, 100, 5);

    expect(p.pid).toBe(1);
    expect(p.memoriaRequerida).toBe(100);
    expect(p.tiempoCpuTotal).toBe(5);
    expect(p.tiempoCpuRestante).toBe(5);
    expect(p.estado).toBe(EstadoProceso.NUEVO);
  });

  test('debe cambiar de estado correctamente', () => {
    const p = new Proceso(1, 100, 5);

    p.cambiarEstado(EstadoProceso.LISTO);
    expect(p.estado).toBe(EstadoProceso.LISTO);

    p.cambiarEstado(EstadoProceso.EJECUTANDO);
    expect(p.estado).toBe(EstadoProceso.EJECUTANDO);
  });

  test('debe reducir el tiempo restante al ejecutar un tick', () => {
    const p = new Proceso(1, 100, 5);

    p.ejecutarTick();
    expect(p.tiempoCpuRestante).toBe(4);
  });
});