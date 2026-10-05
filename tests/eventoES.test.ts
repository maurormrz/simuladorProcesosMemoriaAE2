import { describe, test, expect } from 'vitest';
import { EventoES } from '../src/EventoES';

describe('EventoES', () => {
  test('debe inicializarse con el tiempo de disparo y duracion', () => {
    const evento = new EventoES(2, 3);

    expect(evento.tiempoCPU).toBe(2);
    expect(evento.duracionES).toBe(3);
    expect(evento.tiempoRestanteES).toBe(3);
  });

  test('debe decrementar la duracion de E/S al avanzar tick', () => {
    const evento = new EventoES(2, 3);

    evento.decrementarES();
    expect(evento.tiempoRestanteES).toBe(2);
    expect(evento.estaFinalizado()).toBe(false);

    evento.decrementarES();
    evento.decrementarES();
    expect(evento.tiempoRestanteES).toBe(0);
    expect(evento.estaFinalizado()).toBe(true);
  });
});