import { xref } from "../../../core/animation/dom/xref";

export async function unlockButtons(
    wrongGuesses: number[],
): Promise<void> {
    const buttons = xref.buttons();
    for (let guess = 0; guess < buttons.length; guess++) {
        const button = buttons[guess];
        switch (button.className) {
            case "ButtonStyle.DIMMED":
                if (!wrongGuesses.includes(guess)) {
                    button.className = ButtonStyle.NORMAL;
                }
                break;
            case "ButtonStyle.WRONG":
                button.className = ButtonStyle.DIMMED;
                break;
            default:
                break;
        }
    }
}
