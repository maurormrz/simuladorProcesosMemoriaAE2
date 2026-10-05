export class BloqueMemoria {
  constructor(
    public direccionInicio: number,
    public tamano: number,
    public libre: boolean = true,
    public pid: number | string | null = null
  ) {}
}