import { wait } from "../../core/functions/wait";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { ELEMENT } from "../constants/elements";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { Xelement } from "../../core/xobjs/Xelement";
import { runAnimation } from "../../core/functions/runAnimation";
import { PAUSE } from "../constants/times";
import { fadeOut, fadeIn } from "../constants/fade";
import { scaleUp, scaleDown } from "../constants/scale";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [question] = getElementHeadings(ELEMENT.question);
    const [image, loading] = getElementDivs(ELEMENT.image, ELEMENT.loading);

    const { correct, top, wrong } = identifyButtons();

    const award: number = calcAward(wrongGuesses);
    await Promise.all([
        animateCorrect(award, correct, top, image, loading),
        animateTransition(wrong, question),
    ]);

    await wait(PAUSE.NORMAL);
}

// // revealButtonScore(award, correctButton);
// await applyScoreAward(award);

async function animateCorrect(
    award: number,
    correct: Xelement<HTMLButtonElement>,
    top: Xelement<HTMLButtonElement>,
    image: Xelement<HTMLDivElement>,
    loading: Xelement<HTMLDivElement>,
): Promise<void> {

    console.debug({ award });
    const yTop = top.element.getBoundingClientRect().top;
    const yDistance = -1 * (correct.element.getBoundingClientRect().top - yTop);

    await correct.runAnimation(scaleUp);
    await wait(PAUSE.NORMAL, 5);
    await correct.runAnimation(scaleDown);

    await runAnimation({
        targets: correct.idSelector,
        translateY: yDistance,
    });

    await Promise.all([
        correct.runAnimation(fadeOut),
        image.runAnimation(fadeOut),
        loading.runAnimation(fadeIn),
    ]);

    await runAnimation({
        targets: correct.idSelector,
        duration: 1,
        easing: "linear",
        translateY: "0",
    });
    await correct.runAnimation(scaleDown);
}

async function animateTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    const localSpeed = 1;
    await question.runAnimation(fadeOut, localSpeed);
    for (const button of wrong) {
        await button.runAnimation(fadeOut, localSpeed, console.info);
    }
}
