export class EventoES {
  public tiempoRestanteES: number;

  constructor(
    public tiempoCPU: number,
    public duracionES: number
  ) {
    this.tiempoRestanteES = duracionES;
  }

  public decrementarES(): void {
    if (this.tiempoRestanteES > 0) {
      this.tiempoRestanteES--;
    }
  }

  public estaFinalizado(): boolean {
    return this.tiempoRestanteES === 0;
  }
}