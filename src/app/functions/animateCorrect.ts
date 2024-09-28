import { wait } from "../../core/xobjs/Xanimation";
import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut, fadeIn } from "../constants/fade";
import { scaleBase, scaleButton } from "../constants/scale";
import { PAUSE } from "../constants/times";
import { translateReset } from "../constants/translateReset";

// // revealButtonScore(award, correctButton);
// await applyScoreAward(award);
export async function animateCorrect(
    correct: Xelement<HTMLButtonElement>,
    top: Xelement<HTMLButtonElement>,
    image: Xelement<HTMLDivElement>,
    loading: Xelement<HTMLDivElement>,
): Promise<void> {
    const yTop = top.element.getBoundingClientRect().top;
    const translateY =
        -1 * (correct.element.getBoundingClientRect().top - yTop);

    await correct.runAnimation(scaleButton());
    await wait(PAUSE.NORMAL, 500);
    await correct.runAnimation(scaleBase());
    await correct.runAnimation({ translateY });

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image.runAnimation(fadeOut()),
        loading.runAnimation(fadeIn()),
    ]);

    await correct.runAnimation(translateReset());
}
