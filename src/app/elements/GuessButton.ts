import { EASING } from "../../core/animation/constants";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";
import { GuessButtonGroup } from "./GuessButtonGroup";

export class GuessButton {
    public static async fadeIn(button: Xelement<HTMLButtonElement>) {
        await button.fadeIn({ duration: TIME.BUTTON_FADE });
    }

    public static async fadeOut(button: Xelement<HTMLButtonElement>) {
        await button.fadeOut({ duration: TIME.BUTTON_FADE });
    }

    public static async slideTo(
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

    public static async slideReset(button: Xelement<HTMLButtonElement>) {
        await button.slideReset();
    }

    public static async scaleUp(button: Xelement<HTMLButtonElement>) {
        await button.scaleTo({
            duration: TIME.BUTTON_SCALE,
            scale: 1.3,
        });
    }

    public static async scaleDown(button: Xelement<HTMLButtonElement>) {
        await button.scaleTo({
            duration: TIME.BUTTON_SCALE,
            scale: 1.0,
        });
    }

    public static async correctGuessSequence(
        correct: Xelement<HTMLButtonElement>,
        top: Xelement<HTMLButtonElement>,
        wrong: Xelement<HTMLButtonElement>[],
    ) {

        const yTop = top.element.getBoundingClientRect().top;
        const y = -1 * (correct.element.getBoundingClientRect().top - yTop);

        await GuessButton.scaleUp(correct);
        GuessButtonGroup.fadeOut(wrong);
        await GuessButton.slideTo(correct, y);
        await GuessButton.fadeOut(correct);
        GuessButton.slideReset(correct);
    }
}
