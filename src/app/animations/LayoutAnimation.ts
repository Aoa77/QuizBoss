import { xref } from "../../core/animation/dom/xref";
import { XrefAnimation } from "../../core/animation/dom/XrefAnimation";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class LayoutAnimation {

    ///
    public static QuestionHeading() {
        return new XrefAnimation(
            xref.divs(ELEMENT.question)[0],
            TIME.QUESTION_FADE,
        );
    }

    ///
    public static QuestionImage() {
        return new XrefAnimation(
            xref.divs(ELEMENT.questionImage)[0],
            TIME.QUESTION_IMAGE_FADE,
        );
    }

    ///
    public static NavigationArea() {
        return new XrefAnimation(
            xref.divs(ELEMENT.navigationArea)[0],
            TIME.AREA_FADE,
        );
    }

    ///
    public static ProgressArea() {
        return new XrefAnimation(
            xref.divs(ELEMENT.progressArea)[0],
            TIME.AREA_FADE,
        );
    }

    ///
    public static ScoreArea() {
        return new XrefAnimation(
            xref.divs(ELEMENT.scoreArea)[0],
            TIME.AREA_FADE,
        );
    }

    ///
    public static TitleHeading() {
        return new XrefAnimation(xref.divs(ELEMENT.title)[0], TIME.TITLE_FADE);
    }
}
