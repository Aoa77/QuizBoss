import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class QuestionHeading {
    public static xref(): Xelement<HTMLHeadingElement> {
        return xref.headings(ELEMENT.question)[0];
    }

    public static async fadeIn() {
        await QuestionHeading.xref().fadeIn({ duration: TIME.QUESTION_FADE });
    }

    public static async fadeOut() {
        await QuestionHeading.xref().fadeOut({ duration: TIME.QUESTION_FADE });
    }
}



