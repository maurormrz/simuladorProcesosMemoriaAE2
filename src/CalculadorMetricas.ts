import { AdministradorMemoria } from './AdministradorMemoria';

export class CalculadorMetricas {
  public calcularOcupacionRAM(adminMemoria: AdministradorMemoria): number {
    const libre = adminMemoria.obtenerMemoriaLibre();
    const ocupada = adminMemoria.tamanoTotal - libre;
    return (ocupada / adminMemoria.tamanoTotal) * 100;
  }

  public calcularFragmentacionExterna(adminMemoria: AdministradorMemoria): number {
    const bloques = adminMemoria.obtenerBloques();
    const bloquesLibres = bloques.filter((b) => b.libre);

    if (bloquesLibres.length === 0) return 0;

    const libreTotal = adminMemoria.obtenerMemoriaLibre();
    const mayorHueco = Math.max(...bloquesLibres.map((b) => b.tamano));

    if (libreTotal === 0) return 0;

    return (1 - mayorHueco / libreTotal) * 100;
  }
}