import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";

export function wrongGuessesExhausted(wrongGuesses: number[]): boolean {
    const [state] = flow<QuizState>();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
