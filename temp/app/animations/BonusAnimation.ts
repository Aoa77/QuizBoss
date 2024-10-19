import { xref } from "../../core/animation/dom/xref";
import { wait } from "../../core/animation/wait";
import { AsyncGroup } from "../../../src/libs/AsyncGroup";
import { ELEMENT } from "../constants/ELEMENT";
import { TIME } from "../constants/TIME";
import { TransitionAnimation } from "./TransitionAnimation";

export class BonusAnimation {
    public static async displaySequence(award: number) {
        const ref = xref.divs(ELEMENT.bonusValue)[0];
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
        const anims = new AsyncGroup();
        anims.add(TransitionAnimation.NextQuestionLoading());
        anims.add(ref.scaleTo({
            duration: TIME.BONUS_SCALE,
            scale: 0.0,
        }));
        await anims.all();
    }
}
