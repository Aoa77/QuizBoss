import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";

export class ProgressAnimation {
    public static async fadeIn() {
        await ProgressAnimation.instance.fadeIn();
    }
    public static async fadeOut() {
        await ProgressAnimation.instance.fadeOut();
    }

    private static _instance: ProgressAnimation | null = null;
    private static get instance(): ProgressAnimation {
        return (ProgressAnimation._instance ??= new ProgressAnimation());
    }

    private readonly _div: Xelement<HTMLDivElement>;

    constructor() {
        this._div = xref.divs(ELEMENT.progressArea)[0];
    }

    public async fadeIn() {
        await this._div.fadeIn({ duration: TIME.AREA_FADE });
    }

    public async fadeOut() {
        await this._div.fadeOut({ duration: TIME.AREA_FADE });
    }
}
