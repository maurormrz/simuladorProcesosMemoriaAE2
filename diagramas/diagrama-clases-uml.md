classDiagram
    class EstadoProceso {
        <<enumeration>>
        NUEVO
        ESPERANDO_MEMORIA
        LISTO
        EJECUTANDO
        BLOQUEADO
        TERMINADO
    }

    class Proceso {
        +pid: number | string
        +memoriaRequerida: number
        +tiempoCpuTotal: number
        +tiempoCpuRestante: number
        +estado: EstadoProceso
        +cambiarEstado(nuevoEstado: EstadoProceso): void
        +ejecutarTick(): void
    }

    class EventoES {
        +tiempoCPU: number
        +duracionES: number
        +tiempoRestanteES: number
        +decrementarES(): void
        +estaFinalizado(): boolean
    }

    class BloqueMemoria {
        +direccionInicio: number
        +tamano: number
        +libre: boolean
        +pid: number | string | null
    }

    class IEstrategiaAsignacion {
        <<interface>>
        +seleccionarBloque(bloques: BloqueMemoria[], tamanoRequerido: number): BloqueMemoria | null
    }

    class FirstFit {
        +seleccionarBloque(bloques: BloqueMemoria[], tamanoRequerido: number): BloqueMemoria | null
    }

    class BestFit {
        +seleccionarBloque(bloques: BloqueMemoria[], tamanoRequerido: number): BloqueMemoria | null
    }

    class WorstFit {
        +seleccionarBloque(bloques: BloqueMemoria[], tamanoRequerido: number): BloqueMemoria | null
    }

    class AdministradorMemoria {
        +tamanoTotal: number
        -estrategia: IEstrategiaAsignacion
        -bloques: BloqueMemoria[]
        +obtenerBloques(): BloqueMemoria[]
        +asignarMemoria(proceso: Proceso): boolean
        +liberarMemoria(pid: number | string): boolean
        +coalescencia(): void
        +obtenerMemoriaLibre(): number
    }

    class IPlanificador {
        <<interface>>
        +agregarListo(proceso: Proceso): void
        +despachar(): Proceso | null
        +ejecutarTickCPU(): void
    }

    class PlanificadorRoundRobin {
        +quantum: number
        -colaListos: Proceso[]
        -procesoEnCPU: Proceso | null
        -quantumConsumido: number
        +agregarListo(proceso: Proceso): void
        +despachar(): Proceso | null
        +ejecutarTickCPU(): void
    }

    class CalculadorMetricas {
        +calcularOcupacionRAM(adminMemoria: AdministradorMemoria): number
        +calcularFragmentacionExterna(adminMemoria: AdministradorMemoria): number
    }

    class SimuladorSO {
        -adminMemoria: AdministradorMemoria
        -planificador: PlanificadorRoundRobin
        -procesos: Proceso[]
        +agregarProceso(proceso: Proceso): void
        +ejecutarTick(): void
        +obtenerProcesoPorId(pid: number | string): Proceso | undefined
    }

    %% Relaciones
    FirstFit ..|> IEstrategiaAsignacion : implementa
    BestFit ..|> IEstrategiaAsignacion : implementa
    WorstFit ..|> IEstrategiaAsignacion : implementa
    PlanificadorRoundRobin ..|> IPlanificador : implementa

    Proceso --> EstadoProceso : utiliza
    AdministradorMemoria *-- BloqueMemoria : contiene
    AdministradorMemoria o-- IEstrategiaAsignacion : utiliza
    PlanificadorRoundRobin o-- Proceso : gestiona

    SimuladorSO *-- AdministradorMemoria : contiene
    SimuladorSO *-- PlanificadorRoundRobin : contiene
    SimuladorSO o-- Proceso : administra
    CalculadorMetricas ..> AdministradorMemoria : consulta