import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { getElementHeadings } from "../../core/xelemental/getElementHeadings";
import { ELEMENT } from "../animation/elements";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { animateCorrect } from "./animateCorrect";
import { animateCorrectTransition } from "./animateCorrectTransition";
import { getAppState } from "../hooks/state-hooks";
import { fadeOut } from "../../core/anime-x/fade";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [state] = getAppState();
    const [question, bonusValue] = getElementHeadings(
        ELEMENT.question,
        ELEMENT.bonusValue,
    );
    
    const [image, loading] = getElementDivs(ELEMENT.image, ELEMENT.loading);
    const { correct, top, wrong } = identifyButtons();

    state.award = calcAward(wrongGuesses);
    await Promise.all([
        animateCorrect(state.award, correct, top, image, loading),
        animateCorrectTransition(wrong, question),
    ]);
    bonusValue.startAnimation(fadeOut());
}
