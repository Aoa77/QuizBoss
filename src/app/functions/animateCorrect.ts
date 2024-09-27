import { runAnimation } from "../../core/functions/runAnimation";
import { wait } from "../../core/functions/wait";
import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut, fadeIn } from "../constants/fade";
import { scaleUp, scaleDown } from "../constants/scale";
import { PAUSE } from "../constants/times";

// // revealButtonScore(award, correctButton);
// await applyScoreAward(award);
export async function animateCorrect(
    correct: Xelement<HTMLButtonElement>,
    top: Xelement<HTMLButtonElement>,
    image: Xelement<HTMLDivElement>,
    loading: Xelement<HTMLDivElement>): Promise<void> {

    const yTop = top.element.getBoundingClientRect().top;
    const yDistance = -1 * (correct.element.getBoundingClientRect().top - yTop);

    await correct.runAnimation(scaleUp());
    await wait(PAUSE.NORMAL, 5);
    await correct.runAnimation(scaleDown());

    await runAnimation({
        targets: correct.idSelector,
        translateY: yDistance,
    });

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image.runAnimation(fadeOut()),
        loading.runAnimation(fadeIn()),
    ]);

    await runAnimation({
        targets: correct.idSelector,
        duration: 1,
        easing: "linear",
        translateY: "0",
    });
    await correct.runAnimation(scaleDown());
}
