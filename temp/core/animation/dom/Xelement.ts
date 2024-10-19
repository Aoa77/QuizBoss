import { createRef, RefObject } from "react";
import { Xref } from "./xref";

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
    public get dataValue(): string {
        if (!this.ref.current) {
            return "";
        }
        const value = this.ref.current.getAttribute("data-value");
        return value ?? "";
    }
    public set dataValue(value: string) {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.setAttribute("data-value", value);
    }
    public addClass(className: string): void {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.classList.add(className);
    }
    public removeClass(className: string): void {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.classList.remove(className);
    }
    public toggleClass(className: string): void {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.classList.toggle(className);
    }
    public get opacity(): number {
        if (!this.ref.current) {
            return 0;
        }
        return parseFloat(this.ref.current.style.opacity);
    }
    public set opacity(value: number) {
        if (!this.ref.current) {
            return;
        }
        this.ref.current.style.opacity = value.toString();
    }
}