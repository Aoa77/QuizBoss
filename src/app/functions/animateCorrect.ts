import { EASING } from "../../core/anime-x/easings";
import { fadeOut, fadeIn } from "../../core/anime-x/fade";
import { wait } from "../../core/anime-x/wait";
import { Xelement } from "../../core/xelemental/Xelement";
import { scaleButton } from "../animation/scaleButton";
import { DELAY } from "../animation/times";
import { translateReset } from "../animation/translateReset";
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

    await applyScoreAward(award);
    await wait(DELAY.REVEAL);

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image
            .runAnimation(fadeOut())
            .then(() => loading.runAnimation(fadeIn())),
    ]);

    await correct.runAnimation(translateReset());
}
