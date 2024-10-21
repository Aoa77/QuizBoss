import { calcAward } from "./calcAward";
import { identifyButtons } from "./identifyButtons";
import { QuizState } from "../../../../src/models/QuizState";
import { ButtonAnimation } from "../../animations/ButtonAnimation";

export async function handleCorrectGuess(
    state: QuizState,
    wrongGuesses: number[],
): Promise<void> {
    //
    const award = calcAward(wrongGuesses);
    state.score += award;
    if (state.score > state.bestScore) {
        state.bestScore = state.score;
        localStorage.setItem("bestScore", state.bestScore.toString());
    }
    const { correct, top, wrong } = identifyButtons();
    const seq = ButtonAnimation.correctGuessSequence(
        award,
        correct,
        top,
        wrong,
    );
    await seq;
}
