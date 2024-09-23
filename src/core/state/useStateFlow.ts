import { Dispatch, SetStateAction, useState, useEffect } from "react";

///
let _flow: object;

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

    _flow = [state, setState];
    return getStateFlow();
}

export function getStateFlow<Tstate>(): [
    Tstate,
    Dispatch<SetStateAction<Tstate>>,
] {
    return _flow as [Tstate, Dispatch<SetStateAction<Tstate>>];
}
