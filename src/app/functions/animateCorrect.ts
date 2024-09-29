import { wait } from "../../core/xobjs/xanimation/wait";
import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut, fadeIn } from "../animation/fade";
import { scaleButtonBegin, scaleButtonEnd } from "../animation/scale";
import { PAUSE } from "../animation/times";
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

    await correct.runAnimation(scaleButtonBegin());
    await wait(PAUSE.NORMAL, 500);
    await correct.runAnimation(scaleButtonEnd());
    correct.startAnimation({ translateY });
    await applyScoreAward(award);

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image.runAnimation(fadeOut()),
        loading.runAnimation(fadeIn()),
    ]);


    await correct.runAnimation(translateReset());
}
