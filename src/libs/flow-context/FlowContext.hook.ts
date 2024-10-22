import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { FlowContext } from "./FlowContext";

export function useFlowContext<Tstate, Tflow>(params: {
    errorHandler?: (error: unknown) => void;
    initialState: Tstate;
    flowProperty: (state: Tstate) => Tflow;
    flowEvents: Map<Tflow, (state: Tstate) => Promise<void>>;
}): [Tstate, Dispatch<SetStateAction<Tstate>>] {
    ///
    const errorHandler = params.errorHandler ?? _errorHandler;
    const { initialState, flowProperty, flowEvents } = params;
    const [state, setState] = useState<Tstate>(initialState);

    ///
    useEffect(() => {
        try {
            const flowEvent: Tflow = flowProperty(state);
            console.info(flowEvent);

            const eventHandler = flowEvents.get(flowEvent);
            if (eventHandler) {
                eventHandler(state).catch(errorHandler);
            } else {
                throw new Error(
                    `Flow ${flowEvent} not found in eventHandlers.`,
                );
            }
        } catch (error) {
            errorHandler(error);
        }
        ///
    }, [errorHandler, flowEvents, state, flowProperty]);

    FlowContext.initHook([state, setState]);
    return FlowContext.current();
}


function _errorHandler(error: unknown) {
    throw error;
}