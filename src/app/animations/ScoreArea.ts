import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class ScoreArea {
    public static xref(): Xelement<HTMLDivElement> {
        return xref.divs(ELEMENT.scoreArea)[0];
    }

    public static async fadeIn() {
        await ScoreArea.xref().fadeIn({
            duration: TIME.SCORE_AREA_FADE,
        });
    }

    public static async fadeOut() {
        await ScoreArea.xref().fadeOut({
            duration: TIME.SCORE_AREA_FADE,
        });
    }
}



