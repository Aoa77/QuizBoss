import { EASING } from "../../core/animation/constants";
import { Xelement } from "../../core/animation/dom/Xelement";
import { TIME } from "../constants/TIME";
import { BonusValue } from "./BonusValue";
import { GuessButtonGroup } from "./GuessButtonGroup";
import { QuestionHeading } from "./QuestionHeading";

export class GuessButton {
    public static async correctGuessSequence(
        award: number,
        correct: Xelement<HTMLButtonElement>,
        top: Xelement<HTMLButtonElement>,
        wrong: Xelement<HTMLButtonElement>[],
    ) {
        const yTop = top.element.getBoundingClientRect().top;
        const y = -1 * (correct.element.getBoundingClientRect().top - yTop);

        await GuessButton.scaleUp(correct);
        GuessButtonGroup.fadeOut(wrong);
        QuestionHeading.fadeOut();
        await GuessButton.scaleDown(correct);

        GuessButton.slideTo(correct, y).then(() =>
            GuessButton.fadeOut(correct),
        );
        await BonusValue.displaySequence(award);
        await GuessButton.slideReset(correct);
    }

    public static async wrongGuessSequence(wrong: Xelement<HTMLButtonElement>) {
        await GuessButton.scaleUp(wrong);
        await GuessButton.scaleDown(wrong);
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
