import { getAppState } from "./getAppState";

export function wrongGuessesExhausted(wrongGuesses: number[]): boolean {
    const [state] = getAppState();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}