import { EASING } from "../../../core/animation/easings";
import { fadeOut, fadeIn } from "../../../core/animation/fade";
import { wait } from "../../../core/animation/wait";
import { Xelement } from "../../../core/animation/dom/Xelement";
import { translateReset } from "./translateReset";
import { applyScoreAward } from "./applyScoreAward";

export async function animateCorrect(
    award: number,
    correct: Xelement<HTMLButtonElement>,
    top: Xelement<HTMLButtonElement>,
    image: Xelement<HTMLDivElement>,
    loading: Xelement<HTMLDivElement>,
): Promise<void> {
    const yTop = top.element.getBoundingClientRect().top;
    const translateY =
        -1 * (correct.element.getBoundingClientRect().top - yTop);

    // await scaleButton(correct);
    correct.runAnimation({
        duration: 500,
        easing: EASING.easeOutQuint, ///////////
        translateY,
    });

    await wait(800);
    await Promise.all([
        correct.runAnimation(fadeOut()),
        image
            .runAnimation(fadeOut())
            .then(() => loading.runAnimation(fadeIn())),
    ]);

    applyScoreAward(award);
    await correct.runAnimation(translateReset());
}
