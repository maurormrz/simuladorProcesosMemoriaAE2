import { describe, test, expect } from 'vitest';
import { CalculadorMetricas } from '../src/CalculadorMetricas';
import { AdministradorMemoria } from '../src/AdministradorMemoria';
import { FirstFit } from '../src/FirstFit';
import { Proceso } from '../src/Proceso';

describe('CalculadorMetricas', () => {
  test('debe calcular la ocupacion de RAM y fragmentacion externa', () => {
    const adminMemoria = new AdministradorMemoria(1000, new FirstFit());
    const calculador = new CalculadorMetricas();

    const p1 = new Proceso(1, 400, 5);
    adminMemoria.asignarMemoria(p1);

    const ocupacion = calculador.calcularOcupacionRAM(adminMemoria);
    expect(ocupacion).toBe(40);

    const frag = calculador.calcularFragmentacionExterna(adminMemoria);
    expect(frag).toBe(0);
  });
});