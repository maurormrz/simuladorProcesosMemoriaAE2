import { BloqueMemoria } from './BloqueMemoria';

export interface IEstrategiaAsignacion {
  seleccionarBloque(
    bloques: BloqueMemoria[],
    tamanoRequerido: number
  ): BloqueMemoria | null;
}