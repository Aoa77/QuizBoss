import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Controller } from "./Controller";

export function useFlow<Tstate, Tflow>(params: {
    initialState: Tstate;
    flowProperty: (state: Tstate) => Tflow;
    flowEvents: Map<Tflow, (state: Tstate) => void>;
}): [Tstate, Dispatch<SetStateAction<Tstate>>] {
    ///
    const { initialState, flowProperty, flowEvents } = params;
    const [state, setState] = useState<Tstate>(initialState);

    ///
    useEffect(() => {
        const flowEvent: Tflow = flowProperty(state);
        console.info(flowEvent);

        const eventHandler = flowEvents.get(flowEvent);
        if (eventHandler) {
            eventHandler(state);
        } else {
            throw new Error(`Flow ${flowEvent} not found in eventHandlers.`);
        }
        ///
    }, [flowEvents, state, flowProperty]);

    Controller.initHook([state, setState]);
    return Controller.getHooked();
}

