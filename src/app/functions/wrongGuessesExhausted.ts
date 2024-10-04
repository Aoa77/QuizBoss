import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";

export function wrongGuessesExhausted(wrongGuesses: number[]): boolean {
    const [state] = getStateFlow<AppState>();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
