import { Proceso } from './Proceso';

export interface IPlanificador {
  agregarListo(proceso: Proceso): void;
  despachar(): Proceso | null;
  ejecutarTickCPU(): void;
}