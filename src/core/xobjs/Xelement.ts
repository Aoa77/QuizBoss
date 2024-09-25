import { createRef, RefObject } from "react";
import { Xref } from "./Xref";

export class Xelement<T extends HTMLElement> extends Xref {
    public readonly ref: RefObject<T>;
    constructor(type: string, id: string) {
        super(type, id);
        this.ref = createRef<T>();
    }
    public get element(): T {
        if (!this.ref.current) {
            return {} as T;
        }
        return this.ref.current;
    }
    public get className(): string {
        if (!this.ref.current) {
            return "";
        }
        return this.ref.current.className;
    }
    public set className(value: string) {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.className = value;
    }
    public get innerHTML(): string {
        if (!this.ref.current) {
            return "";
        }
        return this.ref.current.innerHTML;
    }
    public set innerHTML(value: string) {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.innerHTML = value;
    }
}