import { Dispatch, SetStateAction } from "react";

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
