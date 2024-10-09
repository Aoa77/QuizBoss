import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class LoadingSpinner {
    public static xref(): Xelement<HTMLDivElement> {
        return xref.divs(ELEMENT.loadingSpinner)[0];
    }

    public static async fadeIn() {
        await LoadingSpinner.xref().fadeIn({ duration: TIME.LOADING_POLL });
    }

    public static async fadeOut() {
        await LoadingSpinner.xref().fadeOut({ duration: TIME.LOADING_POLL });
    }
}





