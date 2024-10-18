import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";

export class QuestionAnimation {
    public static async fadeIn() {
        await QuestionAnimation.instance.fadeIn();
    }
    public static async fadeOut() {
        await QuestionAnimation.instance.fadeOut();
    }

    private static _instance: QuestionAnimation | null = null;
    private static get instance(): QuestionAnimation {
        return (QuestionAnimation._instance ??= new QuestionAnimation());
    }

    private readonly _div: Xelement<HTMLDivElement>;

    constructor() {
        this._div = xref.divs(ELEMENT.question)[0];
    }

    public async fadeIn() {
        await this._div.fadeIn({ duration: TIME.AREA_FADE });
    }

    public async fadeOut() {
        await this._div.fadeOut({ duration: TIME.AREA_FADE });
    }
}
