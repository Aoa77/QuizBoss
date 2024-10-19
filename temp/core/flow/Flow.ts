import { Dispatch, SetStateAction } from "react";

export class Flow<Tstate> {
    private readonly _context: [Tstate, Dispatch<SetStateAction<Tstate>>];

    private constructor(context: [Tstate, Dispatch<SetStateAction<Tstate>>]) {
        this._context = context;
    }

    private static _instance: object | null = null;
    public static context<Tstate>(): [
        Tstate,
        Dispatch<SetStateAction<Tstate>>,
    ] {
        if (!this._instance) {
            throw new Error("Flow instance not initialized");
        }
        return (this._instance as Flow<Tstate>)._context;
    }

    public static initHook<Tstate>(
        context: [Tstate, Dispatch<SetStateAction<Tstate>>],
    ): void {
        this._instance = new Flow(context);
    }
}
