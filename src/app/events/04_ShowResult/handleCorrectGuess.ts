import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { GuessButton } from "../../elements/GuessButton";

export async function handleCorrectGuess(
    wrongGuesses: number[],
): Promise<void> {
    //
    const [state] = flow<QuizState>();
    
    state.award = calcAward(wrongGuesses);

    const { correct, top, wrong } = identifyButtons();
    await GuessButton.correctGuessSequence(correct, top, wrong);
}
