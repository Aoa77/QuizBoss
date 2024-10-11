import { Xelement } from "../../core/animation/dom/Xelement";
import { xref } from "../../core/animation/dom/xref";
import { wait } from "../../core/animation/wait";
import { TIME } from "../constants/TIME";

export class GuessButtonGroup {
    public static xref(): Xelement<HTMLButtonElement>[] {
        return xref.buttons();
    }

    public static async fadeIn(group?: Xelement<HTMLButtonElement>[]) {
        group ??= GuessButtonGroup.xref();
        for (const button of group) {
            button.fadeIn({ duration: TIME.BUTTON_FADE });
            await wait(TIME.BUTTON_FADE_STAGGER);
        }
    }

    public static async fadeOut(group?: Xelement<HTMLButtonElement>[]) {
        group ??= GuessButtonGroup.xref();
        for (const button of group) {
            button.fadeOut({ duration: TIME.BUTTON_FADE });
            await wait(TIME.BUTTON_FADE_STAGGER);
        }
    }
}

