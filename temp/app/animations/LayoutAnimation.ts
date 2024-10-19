import { xref } from "../../core/animation/dom/xref";
import { XrefAnimation } from "../../core/animation/dom/XrefAnimation";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class LayoutAnimation {
    ///
    public static QuestionImage() {
        return new XrefAnimation(
            xref.divs(ELEMENT.questionImage)[0],
            TIME.QUESTION_IMAGE_FADE,
            TIME.BUTTON_SCALE,
        );
    }

    ///
    public static NavigationArea() {
        return new XrefAnimation(
            xref.divs(ELEMENT.navigationArea)[0],
            TIME.AREA_FADE,
            TIME.BUTTON_SCALE,
        );
    }

}
