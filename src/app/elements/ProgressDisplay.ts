import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class ProgressDisplay {
    public static xref(): Xelement<HTMLDivElement> {
        return xref.divs(ELEMENT.progressDisplay)[0];
    }

    public static async fadeIn() {
        await ProgressDisplay.xref().fadeIn({
            duration: TIME.PROGRESS_DISPLAY_FADE,
        });
    }

    public static async fadeOut() {
        await ProgressDisplay.xref().fadeOut({
            duration: TIME.PROGRESS_DISPLAY_FADE,
        });
    }
}
