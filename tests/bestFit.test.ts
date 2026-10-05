import { describe, test, expect } from 'vitest';
import { BestFit } from '../src/BestFit';
import { BloqueMemoria } from '../src/BloqueMemoria';

describe('Estrategia BestFit', () => {
  test('debe seleccionar el bloque libre mas chico que sirva', () => {
    const estrategia = new BestFit();
    const bloques = [
      new BloqueMemoria(0, 300, true),
      new BloqueMemoria(300, 150, true),
      new BloqueMemoria(450, 200, true),
    ];

    const seleccionado = estrategia.seleccionarBloque(bloques, 100);

    expect(seleccionado).not.toBeNull();
    expect(seleccionado?.direccionInicio).toBe(300);
    expect(seleccionado?.tamano).toBe(150);
  });
});