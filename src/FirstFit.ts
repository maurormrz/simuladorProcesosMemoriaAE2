import { IEstrategiaAsignacion } from './IEstrategiaAsignacion';
import { BloqueMemoria } from './BloqueMemoria';

export class FirstFit implements IEstrategiaAsignacion {
  public seleccionarBloque(
    bloques: BloqueMemoria[],
    tamanoRequerido: number
  ): BloqueMemoria | null {
    for (const bloque of bloques) {
      if (bloque.libre && bloque.tamano >= tamanoRequerido) {
        return bloque;
      }
    }
    return null;
  }
}