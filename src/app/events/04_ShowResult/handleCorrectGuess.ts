import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { QuizState } from "../../models/QuizState";
import { GuessButton } from "../../elements/GuessButton";

export async function handleCorrectGuess(
    state: QuizState,
    wrongGuesses: number[],
): Promise<void> {
    //
    const award = calcAward(wrongGuesses);
    state.score += award;
    if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("bestScore", state.best.toString());
    }
    const { correct, top, wrong } = identifyButtons();
    const seq = GuessButton.correctGuessSequence(
        award,
        correct,
        top,
        wrong,
    );
    await seq;
}
