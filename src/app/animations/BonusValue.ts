import { xref } from "../../core/animation/dom/xref";
import { wait } from "../../core/animation/wait";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";
import { LoadingSpinner } from "./LoadingSpinner";
import { QuestionImage } from "./QuestionImage";

export class BonusValue {
    public static async displaySequence(award: number) {
        const ref = xref.headings(ELEMENT.bonusValue)[0];
        await ref.scaleImmediately(0.0);
        ref.opacity = 1.0;

        if (award > 0) {
            ref.removeClass("noBonus");
            ref.innerHTML = `+${award} point${award > 1 ? "s" : ""}`;
        } else {
            ref.addClass("noBonus");
            ref.innerHTML = "no points";
        }

        await ref.scaleTo({
            duration: TIME.BONUS_SCALE,
            scale: 1.0,
        });

        await wait(TIME.BONUS_DISPLAY);

        const p1 = QuestionImage.fadeOut().then(() => LoadingSpinner.fadeIn());
        const p2 = ref.scaleTo({
            duration: TIME.BONUS_SCALE,
            scale: 0.0,
        });

        await Promise.all([p1, p2]);
    }
}
