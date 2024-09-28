import { wait } from "../../core/xobjs/Xanimation";
import { Xelement } from "../../core/xobjs/Xelement";
import { fadeOut, fadeIn } from "../constants/fade";
import { scaleBase, scaleButton } from "../constants/scale";
import { PAUSE } from "../constants/times";
import { translateReset } from "../constants/translateReset";
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

    await correct.runAnimation(scaleButton());
    await wait(PAUSE.NORMAL, 500);
    await correct.runAnimation(scaleBase());
    correct.startAnimation({ translateY });
    await applyScoreAward(award);

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image.runAnimation(fadeOut()),
        loading.runAnimation(fadeIn()),
    ]);

    await correct.runAnimation(translateReset());
}
