import { createRef, RefObject } from "react";
import { getAnimationBuilder } from "../animation/getAnimationBuilder";
import { runAnimation } from "../animation/runAnimation";

export abstract class XrefBase {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;
    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }
    public async animate(name: string): Promise<void> {
        const builder = getAnimationBuilder(name);
        if (!name) {
            throw new Error(`Animation builder not found: ${name}`);
        }
        const params = builder.build(this);
        await runAnimation(params);
    }
}

export class Xref<T extends HTMLElement> extends XrefBase {
    public readonly ref: RefObject<T>;
    constructor(type: string, id: string) {
        super(type, id);
        this.ref = createRef<T>();
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
}

export class XrefCollection<T extends HTMLElement> extends Map<
    string,
    Xref<T>
> {
    constructor() {
        super();
    }
}
