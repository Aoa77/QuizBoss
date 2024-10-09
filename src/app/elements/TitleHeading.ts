import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";

export class Title {
    public static xref(): Xelement<HTMLHeadingElement> {
        return xref.headings(ELEMENT.title)[0];
    }

    public static async fadeIn() {
        await Title.xref().fadeIn({ duration: TIME.TITLE_FADE });
    }

    public static async fadeOut() {
        await Title.xref().fadeOut({ duration: TIME.TITLE_FADE });
    }
}




