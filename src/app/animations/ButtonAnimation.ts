import { EASING } from "../../core/animation/constants";
import { Xelement } from "../../core/animation/dom/Xelement";
import { wait } from "../../core/animation/wait";
import { QuestionAnimation } from "../components/QuestionHeading.animation";
import { TIME } from "../constants/TIME";
import { BonusAnimation } from "./BonusAnimation";
import { ButtonGroupAnimation } from "./ButtonGroupAnimation";

export class ButtonAnimation {
    public static async correctGuessSequence(
        award: number,
        correct: Xelement<HTMLButtonElement>,
        top: Xelement<HTMLButtonElement>,
        wrong: Xelement<HTMLButtonElement>[],
    ) {
        const yTop = top.element.getBoundingClientRect().top;
        const y = -1 * (correct.element.getBoundingClientRect().top - yTop);

        await ButtonAnimation.scaleUp(correct);
        await wait(TIME.BUTTON_DISPLAY_CORRECT);

        ButtonGroupAnimation.fadeOut(wrong);
        QuestionAnimation.fadeOut();
        await ButtonAnimation.scaleDown(correct);

        ButtonAnimation.slideTo(correct, y).then(async () => {
            await wait(TIME.BUTTON_DISPLAY_FINAL);
            ButtonAnimation.fadeOut(correct);
        });
        await BonusAnimation.displaySequence(award);
        await ButtonAnimation.slideReset(correct);
    }

    public static async wrongGuessSequence(wrong: Xelement<HTMLButtonElement>) {
        await ButtonAnimation.scaleUp(wrong);
        await wait(TIME.BUTTON_DISPLAY_WRONG);
        await ButtonAnimation.scaleDown(wrong);
    }

    private static async fadeOut(button: Xelement<HTMLButtonElement>) {
        await button.fadeOut({ duration: TIME.BUTTON_FADE });
    }

    private static async slideTo(
        button: Xelement<HTMLButtonElement>,
        y: number,
    ) {
        await button.slideTo({
            duration: TIME.BUTTON_SLIDE,
            easing: EASING.easeOutQuint,
            x: 0,
            y: y,
        });
    }

    private static async slideReset(button: Xelement<HTMLButtonElement>) {
        await button.slideReset();
    }

    private static async scaleUp(button: Xelement<HTMLButtonElement>) {
        await button.scaleTo({
            duration: TIME.BUTTON_SCALE,
            scale: 1.3,
        });
    }

    private static async scaleDown(button: Xelement<HTMLButtonElement>) {
        await button.scaleTo({
            duration: TIME.BUTTON_SCALE,
            scale: 1.0,
        });
    }
}
