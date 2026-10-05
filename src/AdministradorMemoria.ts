import { BloqueMemoria } from './BloqueMemoria';
import { IEstrategiaAsignacion } from './IEstrategiaAsignacion';
import { Proceso } from './Proceso';

export class AdministradorMemoria {
  private bloques: BloqueMemoria[] = [];

  constructor(
    public tamanoTotal: number,
    private estrategia: IEstrategiaAsignacion
  ) {
    this.bloques.push(new BloqueMemoria(0, tamanoTotal, true));
  }

  public obtenerBloques(): BloqueMemoria[] {
    return this.bloques;
  }

  public asignarMemoria(proceso: Proceso): boolean {
    const bloque = this.estrategia.seleccionarBloque(
      this.bloques,
      proceso.memoriaRequerida
    );

    if (!bloque) return false;

    if (bloque.tamano > proceso.memoriaRequerida) {
      const sobrante = bloque.tamano - proceso.memoriaRequerida;
      const nuevoInicio = bloque.direccionInicio + proceso.memoriaRequerida;

      const nuevoBloque = new BloqueMemoria(nuevoInicio, sobrante, true);
      const index = this.bloques.indexOf(bloque);

      this.bloques.splice(index + 1, 0, nuevoBloque);
      bloque.tamano = proceso.memoriaRequerida;
    }

    bloque.libre = false;
    bloque.pid = proceso.pid;

    return true;
  }

  public liberarMemoria(pid: number | string): boolean {
    const bloque = this.bloques.find((b) => b.pid === pid);
    if (!bloque) return false;

    bloque.libre = true;
    bloque.pid = null;
    this.coalescencia();

    return true;
  }

  public coalescencia(): void {
    let i = 0;
    while (i < this.bloques.length - 1) {
      const actual = this.bloques[i];
      const siguiente = this.bloques[i + 1];

      if (actual.libre && siguiente.libre) {
        actual.tamano += siguiente.tamano;
        this.bloques.splice(i + 1, 1);
      } else {
        i++;
      }
    }
  }

  public obtenerMemoriaLibre(): number {
    return this.bloques
      .filter((b) => b.libre)
      .reduce((acc, b) => acc + b.tamano, 0);
  }
}