import { AdministradorMemoria } from './AdministradorMemoria';
import { IEstrategiaAsignacion } from './IEstrategiaAsignacion';
import { PlanificadorRoundRobin } from './PlanificadorRoundRobin';
import { Proceso } from './Proceso';
import { EstadoProceso } from './EstadoProceso';

export class SimuladorSO {
  private adminMemoria: AdministradorMemoria;
  private planificador: PlanificadorRoundRobin;
  private procesos: Proceso[] = [];

  constructor(
    tamanoMemoria: number,
    quantum: number,
    estrategia: IEstrategiaAsignacion
  ) {
    this.adminMemoria = new AdministradorMemoria(tamanoMemoria, estrategia);
    this.planificador = new PlanificadorRoundRobin(quantum);
  }

  public agregarProceso(proceso: Proceso): void {
    this.procesos.push(proceso);
  }

  public ejecutarTick(): void {
    for (const p of this.procesos) {
      if (p.estado === EstadoProceso.NUEVO) {
        if (this.adminMemoria.asignarMemoria(p)) {
          this.planificador.agregarListo(p);
        }
      }
    }

    const enEjecucion = this.planificador.despachar();

    if (enEjecucion) {
      this.planificador.ejecutarTickCPU();

      if (enEjecucion.estado === EstadoProceso.TERMINADO) {
        this.adminMemoria.liberarMemoria(enEjecucion.pid);
      }
    }
  }

  public obtenerProcesoPorId(pid: number | string): Proceso | undefined {
    return this.procesos.find((p) => p.pid === pid);
  }
}