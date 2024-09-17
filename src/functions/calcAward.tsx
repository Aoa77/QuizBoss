import ButtonElement from "../elements/buttons/ButtonElement";


export default function calcAward(
    guessButtons: ButtonElement[],
    wrongGuesses: number[]
): number {
    return guessButtons.length - wrongGuesses.length - 1;
}
