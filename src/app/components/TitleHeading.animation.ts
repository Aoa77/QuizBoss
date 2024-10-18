import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";

export class TitleAnimation {
    public static async fadeIn() {
        await TitleAnimation.instance.fadeIn();
    }
    public static async fadeOut() {
        await TitleAnimation.instance.fadeOut();
    }

    private static _instance: TitleAnimation | null = null;
    private static get instance(): TitleAnimation {
        return (TitleAnimation._instance ??= new TitleAnimation());
    }

    private readonly _div: Xelement<HTMLDivElement>;

    constructor() {
        this._div = xref.divs(ELEMENT.loadingSpinner)[0];
    }

    public async fadeIn() {
        await this._div.fadeIn({ duration: TIME.TITLE_FADE });
    }

    public async fadeOut() {
        await this._div.fadeOut({ duration: TIME.TITLE_FADE });
    }
}
