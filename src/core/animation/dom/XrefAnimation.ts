import { Xref } from "./xref";


export class XrefAnimation {
    private readonly _xref: Xref;
    private readonly _fadeDuration: number;

    constructor(xref: Xref, fadeDuration: number) {
        this._xref = xref;
        this._fadeDuration = fadeDuration;
    }

    public async fadeIn() {
        await this._xref.fadeIn({ duration: this._fadeDuration });
    }

    public async fadeOut() {
        await this._xref.fadeOut({ duration: this._fadeDuration });
    }
}
