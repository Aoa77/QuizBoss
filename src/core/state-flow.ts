import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useStateFlow<Tstate, Tflow>(params: {
    initialState: Tstate;
    getFlowEvent: (state: Tstate) => Tflow;
    eventHandlers: Map<Tflow, (state: Tstate) => void>;
}): [Tstate, Dispatch<SetStateAction<Tstate>>] {
    ///
    const { initialState, getFlowEvent, eventHandlers } = params;
    const [state, setState] = useState<Tstate>(initialState);

    ///
    useEffect(() => {
        console.debug(state);
        const flowEvent: Tflow = getFlowEvent(state);
        console.info(flowEvent);

        const eventHandler = eventHandlers.get(flowEvent);
        if (eventHandler) {
            eventHandler(state);
        } else {
            throw new Error(`Flow ${flowEvent} not found in eventHandlers.`);
        }
        ///
    }, [eventHandlers, state, getFlowEvent]);

    StateFlow.initHook([state, setState]);
    return getStateFlow();
}

export function getStateFlow<Tstate>(): [
    Tstate,
    Dispatch<SetStateAction<Tstate>>,
] {
    return StateFlow.getHooked<Tstate>();
}

export class StateFlow<Tstate> {
    public readonly context: [Tstate, Dispatch<SetStateAction<Tstate>>];

    constructor(context: [Tstate, Dispatch<SetStateAction<Tstate>>]) {
        this.context = context;
    }

    private static _instance: object | null = null;

    public static getHooked<Tstate>(): [
        Tstate,
        Dispatch<SetStateAction<Tstate>>,
    ] {
        if (!this._instance) {
            throw new Error("StateFlow not initialized.");
        }
        return (this._instance as StateFlow<Tstate>).context;
    }

    public static initHook<Tstate>(
        context: [Tstate, Dispatch<SetStateAction<Tstate>>],
    ): void {
        this._instance = new StateFlow(context);
    }
}
