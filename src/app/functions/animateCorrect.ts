import { fadeOut, fadeIn } from "../../core/anime-x/fade";
import { Xelement } from "../../core/xelemental/Xelement";
import { scaleButton } from "../animation/scaleButton";
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
    correct.startAnimation({ translateY });
    await applyScoreAward(award);

    await Promise.all([
        correct.runAnimation(fadeOut()),
        image.runAnimation(fadeOut()),
        loading.runAnimation(fadeIn()),
    ]);

    await correct.runAnimation(translateReset());
}
