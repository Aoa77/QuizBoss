import { calcAward } from "./calcAward";
import { QuizState } from "../../../../src/models/QuizState";

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
    // const { correct, top, wrong } = identifyButtons();
    // const seq = ButtonAnimation.correctGuessSequence(
    //     award,
    //     correct,
    //     top,
    //     wrong,
    // );
    // await seq;
}
