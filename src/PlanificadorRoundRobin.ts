import { IPlanificador } from './IPlanificador';
import { Proceso } from './Proceso';
import { EstadoProceso } from './EstadoProceso';

export class PlanificadorRoundRobin implements IPlanificador {
  private colaListos: Proceso[] = [];
  private procesoEnCPU: Proceso | null = null;
  private quantumConsumido: number = 0;

  constructor(public quantum: number) {}

  public agregarListo(proceso: Proceso): void {
    proceso.cambiarEstado(EstadoProceso.LISTO);
    this.colaListos.push(proceso);
  }

  public despachar(): Proceso | null {
    if (!this.procesoEnCPU && this.colaListos.length > 0) {
      this.procesoEnCPU = this.colaListos.shift()!;
      this.procesoEnCPU.cambiarEstado(EstadoProceso.EJECUTANDO);
      this.quantumConsumido = 0;
    }
    return this.procesoEnCPU;
  }

  public ejecutarTickCPU(): void {
    if (!this.procesoEnCPU) return;

    this.procesoEnCPU.ejecutarTick();
    this.quantumConsumido++;

    if (this.procesoEnCPU.tiempoCpuRestante === 0) {
      this.procesoEnCPU.cambiarEstado(EstadoProceso.TERMINADO);
      this.procesoEnCPU = null;
      this.quantumConsumido = 0;
    } else if (this.quantumConsumido >= this.quantum) {
      const p = this.procesoEnCPU;
      this.procesoEnCPU = null;
      this.quantumConsumido = 0;
      this.agregarListo(p);
    }
  }
}