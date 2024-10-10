import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";



export class GuessButtonArea {
    public static xref(): Xelement<HTMLDivElement> {
        return xref.divs(ELEMENT.buttonArea)[0];
    }

    public static async fadeIn() {
        await GuessButtonArea.xref().fadeIn({
            duration: TIME.SCORE_AREA_FADE,
        });
    }

    public static async fadeOut() {
        await GuessButtonArea.xref().fadeOut({
            duration: TIME.SCORE_AREA_FADE,
        });
    }
}
