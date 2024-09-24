import { getAppStateFlow } from "../appFlow/useFlow";

export function wrongGuessesExauhsted(wrongGuesses: number[]): boolean {
    const [state] = getAppStateFlow();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
