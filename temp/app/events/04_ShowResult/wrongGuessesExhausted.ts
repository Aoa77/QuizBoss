import { FlowContext } from "../../../../src/libs/flow-context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";

export function wrongGuessesExhausted(wrongGuesses: number[]): boolean {
    const [state] = FlowContext.context<QuizState>();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
