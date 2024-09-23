import { ButtonElement } from "../elements/buttons/ButtonElement";


export function wrongGuessesExauhsted(
    guessButtons: ButtonElement[],
    wrongGuesses: number[]
): boolean {
    return wrongGuesses.length === guessButtons.length - 1;
}
