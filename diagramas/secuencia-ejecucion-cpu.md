sequenceDiagram
    autonumber
    actor User as Usuario / Test
    participant SO as SimuladorSO
    participant Plan as PlanificadorRoundRobin
    participant Proc as Proceso

    User->>SO: ejecutarTick()
    activate SO
    SO->>Plan: despachar()
    activate Plan
    
    alt CPU libre y hay procesos listos
        Plan->>Plan: Extraer primer proceso de colaListos
        Plan->>Proc: cambiarEstado(EJECUTANDO)
        Plan-->>SO: procesoEnCPU
    else CPU ocupada o cola vacía
        Plan-->>SO: procesoEnCPU
    end
    deactivate Plan

    SO->>Plan: ejecutarTickCPU()
    activate Plan
    Plan->>Proc: ejecutarTick() (tiempoCpuRestante--)
    Plan->>Plan: quantumConsumido++

    alt quantumConsumido >= quantum y proceso no finalizó
        Plan->>Plan: procesoEnCPU = null
        Plan->>Plan: quantumConsumido = 0
        Plan->>Plan: agregarListo(proceso)
        activate Plan
        Plan->>Proc: cambiarEstado(LISTO)
        deactivate Plan
    end
    deactivate Plan
    deactivate SO