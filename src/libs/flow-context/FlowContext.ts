import { Dispatch, SetStateAction } from "react";

export class FlowContext<Tstate> {
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

    public static initHook<Tstate>(
        context: [Tstate, Dispatch<SetStateAction<Tstate>>],
    ): void {
        this._instance = new FlowContext(context);
    }
}


