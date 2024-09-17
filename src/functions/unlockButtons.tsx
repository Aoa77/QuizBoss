import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../elements/buttons/ButtonState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";


export default async function unlockButtons(
    guessButtons: ButtonElement[],
    wrongGuesses: number[]
): Promise<void> {
    //
    await delay(Duration.TICK);

    for (let guess = 0; guess < guessButtons.length; guess++) {
        const ref = guessButtons[guess].ref.current!;
        switch (ref.className) {
            case ButtonState.DIMMED:
                if (!wrongGuesses.includes(guess)) {
                    ref.className = ButtonState.NORMAL;
                }
                break;
            case ButtonState.WRONG:
                ref.className = ButtonState.DIMMED;
                break;
            default:
                break;
        }
    }
}
