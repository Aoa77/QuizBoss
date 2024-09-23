import { createRef, RefObject } from "react";

export abstract class XrefBase {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;
    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }
}

export class Xref<T extends HTMLElement> extends XrefBase {
    public readonly ref: RefObject<T>;
    constructor(type: string, id: string) {
        super(type, id);
        this.ref = createRef<T>();
    }
    public get element(): T | null {
        return this.ref.current;
    }
}

export class XrefCollection<T extends HTMLElement> extends Map<
    string,
    Xref<T>
> {
    constructor() {
        super();
    }
}