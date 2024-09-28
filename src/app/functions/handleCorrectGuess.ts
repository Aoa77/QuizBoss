import { getElementDivs } from "../../core/functions/getElementDivs";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { ELEMENT } from "../constants/elements";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { animateCorrect } from "./animateCorrect";
import { animateCorrectTransition } from "./animateCorrectTransition";
import { getAppState } from "./getAppState";
import { scaleZero } from "../constants/scale";
import { fadeOut } from "../constants/fade";

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
