import { IEstrategiaAsignacion } from './IEstrategiaAsignacion';
import { BloqueMemoria } from './BloqueMemoria';

export class WorstFit implements IEstrategiaAsignacion {
  public seleccionarBloque(
    bloques: BloqueMemoria[],
    tamanoRequerido: number
  ): BloqueMemoria | null {
    let peorBloque: BloqueMemoria | null = null;

    for (const bloque of bloques) {
      if (bloque.libre && bloque.tamano >= tamanoRequerido) {
        if (!peorBloque || bloque.tamano > peorBloque.tamano) {
          peorBloque = bloque;
        }
      }
    }

    return peorBloque;
  }
}