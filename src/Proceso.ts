import { EstadoProceso } from './EstadoProceso';

export class Proceso {
  public tiempoCpuRestante: number;
  public estado: EstadoProceso;

  constructor(
    public pid: number | string,
    public memoriaRequerida: number,
    public tiempoCpuTotal: number
  ) {
    this.tiempoCpuRestante = tiempoCpuTotal;
    this.estado = EstadoProceso.NUEVO;
  }

  public cambiarEstado(nuevoEstado: EstadoProceso): void {
    this.estado = nuevoEstado;
  }

  public ejecutarTick(): void {
    if (this.tiempoCpuRestante > 0) {
      this.tiempoCpuRestante--;
    }
  }
}