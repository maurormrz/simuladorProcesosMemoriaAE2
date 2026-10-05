import { describe, test, expect } from 'vitest';
import { SimuladorSO } from '../src/SimuladorSO';
import { FirstFit } from '../src/FirstFit';
import { Proceso } from '../src/Proceso';

describe('SimuladorSO (Prueba Integrada)', () => {
  test('debe ejecutar la simulacion completa de un proceso', () => {
    const simulador = new SimuladorSO(1000, 2, new FirstFit());
    const p1 = new Proceso(1, 200, 3);

    simulador.agregarProceso(p1);

    simulador.ejecutarTick();
    simulador.ejecutarTick();
    simulador.ejecutarTick();

    const estadoProceso = simulador.obtenerProcesoPorId(1);
    expect(estadoProceso?.estado).toBe('TERMINADO');
  });
});