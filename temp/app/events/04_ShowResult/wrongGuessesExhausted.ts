import { Flow } from "../../../core/flow/Flow";
import { QuizState } from "../../../../src/models/QuizState";

export function wrongGuessesExhausted(wrongGuesses: number[]): boolean {
    const [state] = Flow.context<QuizState>();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
