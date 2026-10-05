import { IEstrategiaAsignacion } from './IEstrategiaAsignacion';
import { BloqueMemoria } from './BloqueMemoria';

export class BestFit implements IEstrategiaAsignacion {
  public seleccionarBloque(
    bloques: BloqueMemoria[],
    tamanoRequerido: number
  ): BloqueMemoria | null {
    let mejorBloque: BloqueMemoria | null = null;

    for (const bloque of bloques) {
      if (bloque.libre && bloque.tamano >= tamanoRequerido) {
        if (!mejorBloque || bloque.tamano < mejorBloque.tamano) {
          mejorBloque = bloque;
        }
      }
    }

    return mejorBloque;
  }
}