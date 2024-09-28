import { Xelement } from "./Xelement";

class ElementNameMap<T extends HTMLElement> extends Map<string, Xelement<T>> {
    constructor() {
        super();
    }
}


export class ElementFactory {
    public readonly buttonMap: ElementNameMap<HTMLButtonElement>;
    public readonly divMap: ElementNameMap<HTMLDivElement>;
    public readonly headingMap: ElementNameMap<HTMLHeadingElement>;

    constructor() {
        this.buttonMap = new ElementNameMap<HTMLButtonElement>();
        this.divMap = new ElementNameMap<HTMLDivElement>();
        this.headingMap = new ElementNameMap<HTMLHeadingElement>();
    }

    public static readonly instance: ElementFactory = new ElementFactory();

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
