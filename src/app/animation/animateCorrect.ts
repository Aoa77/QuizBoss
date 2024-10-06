import { EASING } from "../../core/anime-x/easings";
import { fadeOut, fadeIn } from "../../core/anime-x/fade";
import { wait } from "../../core/anime-x/wait";
import { Xelement } from "../../core/xelemental/Xelement";
import {
    scaleButton,
    scaleButtonBegin,
    scaleButtonEnd,
    scaleButtonGlitch,
} from "./scaleButton";
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

    await scaleButton(correct);
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
