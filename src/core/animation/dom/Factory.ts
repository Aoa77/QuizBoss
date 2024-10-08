import { Xelement } from "./Xelement";

class NameMap<T extends HTMLElement> extends Map<string, Xelement<T>> {
    constructor() {
        super();
    }
}

export class Factory {
    public readonly buttonMap: NameMap<HTMLButtonElement>;
    public readonly divMap: NameMap<HTMLDivElement>;
    public readonly headingMap: NameMap<HTMLHeadingElement>;

    constructor() {
        this.buttonMap = new NameMap<HTMLButtonElement>();
        this.divMap = new NameMap<HTMLDivElement>();
        this.headingMap = new NameMap<HTMLHeadingElement>();
    }

    public static readonly instance: Factory = new Factory();

    private _buttonArray: Xelement<HTMLButtonElement>[] | null = null;
    private _divArray: Xelement<HTMLDivElement>[] | null = null;
    private _headingArray: Xelement<HTMLHeadingElement>[] | null = null;

    public get buttonArray(): Xelement<HTMLButtonElement>[] {
        this._buttonArray ??= Array.from(this.buttonMap.values());
        return this._buttonArray;
    }

    public get divArray(): Xelement<HTMLDivElement>[] {
        this._divArray ??= Array.from(this.divMap.values());
        return this._divArray;
    }

    public get headingArray(): Xelement<HTMLHeadingElement>[] {
        this._headingArray ??= Array.from(this.headingMap.values());
        return this._headingArray;
    }
}
