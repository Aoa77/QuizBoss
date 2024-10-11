import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";


export class QuestionImage {
    public static xref(): Xelement<HTMLDivElement> {
        return xref.divs(ELEMENT.questionImage)[0];
    }

    public static element(): HTMLDivElement {
        return QuestionImage.xref().element;
    }

    public static async fadeIn() {
        await QuestionImage.xref().fadeIn({ duration: TIME.QUESTION_IMAGE_FADE });
    }

    public static async fadeOut() {
        await QuestionImage.xref().fadeOut({ duration: TIME.QUESTION_IMAGE_FADE });
    }
}
