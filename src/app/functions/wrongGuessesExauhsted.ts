import { getAppState } from "../hooks/useAppState";

export function wrongGuessesExauhsted(wrongGuesses: number[]): boolean {
    const [state] = getAppState();
    return wrongGuesses.length === state.settings.guessButtonCount - 1;
}
