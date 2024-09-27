import { wait } from "../../core/functions/wait";
import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { ELEMENT } from "../constants/elements";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { PAUSE } from "../constants/times";
import { animateCorrect } from "./animateCorrect";
import { animateCorrectTransition } from "./animateCorrectTransition";
import { applyScoreAward } from "./applyScoreAward";

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
        animateCorrectTransition(wrong, question),
        applyScoreAward(award)
    ]);
    
    await wait(PAUSE.NORMAL);
}
