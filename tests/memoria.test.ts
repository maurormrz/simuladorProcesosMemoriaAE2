import { describe, test, expect } from 'vitest';
import { AdministradorMemoria } from '../src/AdministradorMemoria';
import { FirstFit } from '../src/FirstFit';
import { Proceso } from '../src/Proceso';

describe('AdministradorMemoria', () => {
  test('debe iniciar con un solo bloque libre de todo el tamano', () => {
    const admin = new AdministradorMemoria(1000, new FirstFit());
    const bloques = admin.obtenerBloques();

    expect(bloques.length).toBe(1);
    expect(bloques[0].tamano).toBe(1000);
    expect(bloques[0].libre).toBe(true);
  });

  test('debe asignar memoria a un proceso y dividir el bloque', () => {
    const admin = new AdministradorMemoria(1000, new FirstFit());
    const p = new Proceso(1, 300, 5);

    const exito = admin.asignarMemoria(p);

    expect(exito).toBe(true);
    expect(admin.obtenerMemoriaLibre()).toBe(700);
  });

  test('debe liberar memoria y realizar la coalescencia', () => {
    const admin = new AdministradorMemoria(1000, new FirstFit());
    const p1 = new Proceso(1, 300, 5);
    const p2 = new Proceso(2, 200, 5);

    admin.asignarMemoria(p1);
    admin.asignarMemoria(p2);

    admin.liberarMemoria(1);
    admin.liberarMemoria(2);

    const bloques = admin.obtenerBloques();
    expect(bloques.length).toBe(1);
    expect(bloques[0].tamano).toBe(1000);
    expect(bloques[0].libre).toBe(true);
  });
});