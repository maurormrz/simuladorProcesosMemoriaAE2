sequenceDiagram
    autonumber
    actor User as Usuario / Test
    participant SO as SimuladorSO
    participant Plan as PlanificadorRoundRobin
    participant Proc as Proceso
    participant Mem as AdministradorMemoria

    User->>SO: ejecutarTick()
    activate SO
    SO->>Plan: despachar()
    SO->>Plan: ejecutarTickCPU()
    activate Plan
    Plan->>Proc: ejecutarTick()
    
    alt tiempoCpuRestante == 0
        Plan->>Proc: cambiarEstado(TERMINADO)
        Plan->>Plan: procesoEnCPU = null
    end
    Plan-->>SO: void
    deactivate Plan

    alt proceso.estado == TERMINADO
        SO->>Mem: liberarMemoria(pid)
        activate Mem
        Mem->>Mem: Buscar bloque por PID
        Mem->>Mem: Marcar bloque libre = true (pid = null)
        Mem->>Mem: coalescencia()
        Note over Mem: Une bloques adyacentes que estén libres
        Mem-->>SO: true
        deactivate Mem
    end
    deactivate SO