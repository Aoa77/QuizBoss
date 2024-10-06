import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { getElementHeadings } from "../../core/xelemental/getElementHeadings";
import { ELEMENT } from "./elements";
import { calcAward } from "../functions/calcAward";
import { identifyButtons } from "../functions/identifyButtons";
import { animateCorrect } from "./animateCorrect";
import { animateCorrectTransition } from "./animateCorrectTransition";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [state] = getStateFlow<AppState>();
    const [question] = getElementHeadings(
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
}
