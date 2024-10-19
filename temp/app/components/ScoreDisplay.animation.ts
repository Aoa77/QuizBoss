import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";

export class ScoreAnimation {
    public static async fadeIn() {
        await ScoreAnimation.instance.fadeIn();
    }
    public static async fadeOut() {
        await ScoreAnimation.instance.fadeOut();
    }

    private static _instance: ScoreAnimation | null = null;
    private static get instance(): ScoreAnimation {
        return (ScoreAnimation._instance ??= new ScoreAnimation());
    }

    private readonly _div: Xelement<HTMLDivElement>;

    constructor() {
        this._div = xref.divs(ELEMENT.scoreArea)[0];
    }

    public async fadeIn() {
        await this._div.fadeIn({ duration: TIME.AREA_FADE });
    }

    public async fadeOut() {
        await this._div.fadeOut({ duration: TIME.AREA_FADE });
    }
}
