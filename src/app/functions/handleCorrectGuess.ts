import { wait } from "../../core/functions/wait";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { TIME } from "../elements/waitTimes";
import { ELEMENT } from "../components/_ELEMENTS";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { Xelement } from "../../core/xobjs/Xelement";
import { runAnimation } from "../../core/functions/runAnimation";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [question] = getElementHeadings(ELEMENT.question);
    const [image, loading] = getElementDivs(ELEMENT.image, ELEMENT.loading);

    const { correct, top, wrong } = identifyButtons();

    const award: number = calcAward(wrongGuesses);
    await Promise.all([
        animateCorrect(correct, top, image, loading),
        animateTransition(wrong, question),
    ]);

    await wait(TIME.PAUSE);
}

// // revealButtonScore(award, correctButton);
// await applyScoreAward(award);

async function animateCorrect(
    correct: Xelement<HTMLButtonElement>,
    top: Xelement<HTMLButtonElement>,
    image: Xelement<HTMLDivElement>,
    loading: Xelement<HTMLDivElement>,
): Promise<void> {
    const yTop = top.element.getBoundingClientRect().top;
    const yDistance = -1 * (correct.element.getBoundingClientRect().top - yTop);

    await correct.scaleUp();
    await wait(TIME.PAUSE, 5);
    await correct.scaleDown();
    
    await runAnimation({
        targets: correct.idSelector,
        translateY: yDistance
    });

    await Promise.all([correct.fadeOut(), image.fadeOut(), loading.fadeIn()]);

    await runAnimation({
        targets: correct.idSelector,
        duration: 1,
        easing: "linear",
        translateY: "0",
    });
    await correct.scaleDown();
}

async function animateTransition(
    wrong: Xelement<HTMLButtonElement>[],
    question: Xelement<HTMLHeadingElement>,
): Promise<void> {
    const localSpeed = 1.5;
    await question.fadeOut(localSpeed);
    for (const button of wrong) {
        await button.fadeOut(localSpeed);
    }
}

// for (let i = 0; i < DURATION.BLINK_RATE; i++) {
//     correctButton.toggleClass(ButtonState.BLINK);
//     await wait(TIME.BLINK_RATE);
// }
