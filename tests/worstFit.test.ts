import { describe, test, expect } from 'vitest';
import { WorstFit } from '../src/WorstFit';
import { BloqueMemoria } from '../src/BloqueMemoria';

describe('Estrategia WorstFit', () => {
  test('debe seleccionar el bloque libre mas grande disponible', () => {
    const estrategia = new WorstFit();
    const bloques = [
      new BloqueMemoria(0, 150, true),
      new BloqueMemoria(150, 500, true),
      new BloqueMemoria(650, 200, true),
    ];

    const seleccionado = estrategia.seleccionarBloque(bloques, 100);

    expect(seleccionado).not.toBeNull();
    expect(seleccionado?.direccionInicio).toBe(150);
    expect(seleccionado?.tamano).toBe(500);
  });
});