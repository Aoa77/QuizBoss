import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Task } from "../friendlies/Task";

export function useFlowContext<Tstate>() {
    return FlowContext.current<Tstate>();
}

export function useFlowContextSetup<Tstate, Tflow>(params: {
    errorHandler?: (error: unknown) => void;
    stateLogger?: (state: Tstate) => void;
    initialState: Tstate;
    flowProperty: (state: Tstate) => Tflow;
    flowEvents: Map<Tflow, () => Promise<void>>;
}): void {
    ///
    const errorHandler = params.errorHandler ?? Task.throwError;
    const { initialState, flowProperty, flowEvents, stateLogger } = params;
    const [state, setState] = useState<Tstate>(initialState);

    ///
    useEffect(() => {
        try {
            const flowEvent: Tflow = flowProperty(state);
            if (stateLogger) {
                stateLogger(state);
            }
            const eventHandler = flowEvents.get(flowEvent);
            if (eventHandler) {
                eventHandler().catch(errorHandler);
            } else {
                throw new Error(
                    `Flow ${flowEvent} not found in eventHandlers.`,
                );
            }
        } catch (error) {
            errorHandler(error);
        }
        ///
    }, [
        errorHandler, ////////////
        flowEvents,
        flowProperty,
        setState,
        state,
        stateLogger,
    ]);

    FlowContext.init([state, setState]);
}

class FlowContext<Tstate> {
    private readonly _current: [Tstate, Dispatch<SetStateAction<Tstate>>];

    private constructor(current: [Tstate, Dispatch<SetStateAction<Tstate>>]) {
        this._current = current;
    }

    private static _instance: object | null = null;
    public static current<Tstate>(): [
        Tstate,
        Dispatch<SetStateAction<Tstate>>,
    ] {
        if (!this._instance) {
            throw new Error("FlowContext instance not initialized");
        }
        return (this._instance as FlowContext<Tstate>)._current;
    }

    public static init<Tstate>(
        context: [Tstate, Dispatch<SetStateAction<Tstate>>],
    ): void {
        // if (this._instance) {
        //     throw new Error("FlowContext instance already initialized");
        // }
        this._instance = new FlowContext(context);
    }
}
