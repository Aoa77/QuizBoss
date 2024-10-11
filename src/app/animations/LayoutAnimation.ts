import { xref } from "../../core/animation/dom/xref";
import { XrefAnimation } from "../../core/animation/dom/XrefAnimation";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class LayoutAnimation {
    ///
    public static readonly TitleHeading: XrefAnimation = new XrefAnimation(
        xref.headings(ELEMENT.title)[0],
        TIME.TITLE_FADE,
    );

    ///
    public static readonly QuestionHeading: XrefAnimation = new XrefAnimation(
        xref.headings(ELEMENT.question)[0],
        TIME.QUESTION_FADE,
    );

    ///
    public static readonly ScoreArea: XrefAnimation = new XrefAnimation(
        xref.divs(ELEMENT.scoreArea)[0],
        TIME.SCORE_AREA_FADE,
    );
}


