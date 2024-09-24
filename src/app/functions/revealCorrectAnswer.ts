import { getXrefButtons } from "../../core/elements/buttons";
import { Xref } from "../../core/elements/xref";
import { QuizItem } from "../models/QuizItem";

export function revealCorrectAnswer(
    currentItem: QuizItem,
    wrongGuesses: number[],
): void {
    let correctButton: Xref<HTMLButtonElement> | null = null;
    const buttons = getXrefButtons();
    for (let i = 0; i < buttons.length; i++) {
        if (wrongGuesses.includes(i)) {
            continue;
        }
        correctButton = buttons[i];
        currentItem.answeredCorrectly = true;
        break;
    }
    if (!correctButton) {
        throw new Error("No correct button found.");
    }
    console.info("Revealing correct answer...", correctButton);
    // elements.blinkButton(correctButtonRef!);
}
