import { xref } from "../../core/animation/dom/xref";
import { ButtonState } from "../models/ButtonState";

export async function unlockButtons(
    wrongGuesses: number[],
): Promise<void> {
    const buttons = xref.buttons();
    for (let guess = 0; guess < buttons.length; guess++) {
        const button = buttons[guess];
        switch (button.className) {
            case ButtonState.DIMMED:
                if (!wrongGuesses.includes(guess)) {
                    button.className = ButtonState.NORMAL;
                }
                break;
            case ButtonState.WRONG:
                button.className = ButtonState.DIMMED;
                break;
            default:
                break;
        }
    }
}
