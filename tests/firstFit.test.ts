import { describe, test, expect } from 'vitest';
import { FirstFit } from '../src/FirstFit';
import { BloqueMemoria } from '../src/BloqueMemoria';

describe('Estrategia FirstFit', () => {
  test('debe seleccionar el primer bloque donde quepa el proceso', () => {
    const estrategia = new FirstFit();
    const bloques = [
      new BloqueMemoria(0, 100, true),
      new BloqueMemoria(100, 300, true),
      new BloqueMemoria(400, 200, true),
    ];

    const seleccionado = estrategia.seleccionarBloque(bloques, 150);

    expect(seleccionado).not.toBeNull();
    expect(seleccionado?.direccionInicio).toBe(100);
    expect(seleccionado?.tamano).toBe(300);
  });

  test('debe retornar null si ningun bloque tiene tamano suficiente', () => {
    const estrategia = new FirstFit();
    const bloques = [new BloqueMemoria(0, 100, true)];

    const seleccionado = estrategia.seleccionarBloque(bloques, 200);

    expect(seleccionado).toBeNull();
  });
});