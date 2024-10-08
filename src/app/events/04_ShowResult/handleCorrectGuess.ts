import { ELEMENT } from "../../constants/ELEMENT";
import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { animateCorrect } from "./animateCorrect";
import { animateCorrectTransition } from "./animateCorrectTransition";
import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { xref } from "../../../core/animation/dom/xref";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [state] = flow<QuizState>();
    const [question] = xref.headings(
        ELEMENT.question,
        ELEMENT.bonusValue,
    );
    
    const [image, loading] = xref.divs(ELEMENT.image, ELEMENT.loading);
    const { correct, top, wrong } = identifyButtons();

    state.award = calcAward(wrongGuesses);
    await Promise.all([
        animateCorrect(state.award, correct, top, image, loading),
        animateCorrectTransition(wrong, question),
    ]);
}
