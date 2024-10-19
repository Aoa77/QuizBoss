import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FlowContext } from "./FlowContext";

export function useFlowContext<Tstate, Tflow>(params: {
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

    FlowContext.initHook([state, setState]);
    return FlowContext.current();
}

