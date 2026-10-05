sequenceDiagram
    autonumber
    actor User as Usuario / Test
    participant SO as SimuladorSO
    participant Mem as AdministradorMemoria
    participant Est as IEstrategiaAsignacion
    participant Plan as PlanificadorRoundRobin
    participant Proc as Proceso

    User->>SO: ejecutarTick()
    activate SO
    SO->>Mem: asignarMemoria(proceso)
    activate Mem
    Mem->>Est: seleccionarBloque(bloques, memoriaRequerida)
    activate Est
    Est-->>Mem: bloqueSeleccionado
    deactivate Est
    
    alt Hay bloque disponible
        Mem->>Mem: Dividir bloque si es mayor (sobrante)
        Mem->>Mem: Marcar bloque como ocupado (pid = proceso.pid)
        Mem-->>SO: true
        SO->>Plan: agregarListo(proceso)
        activate Plan
        Plan->>Proc: cambiarEstado(LISTO)
        Plan->>Plan: Insertar en colaListos
        Plan-->>SO: void
        deactivate Plan
    else No hay memoria suficiente
        Mem-->>SO: false
    end
    deactivate Mem
    deactivate SO