import { Xelement } from "../../../core/animation/dom/Xelement";
import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../constants/ButtonState";
import { QuizItem } from "../../models/QuizItem";

export  function revealCorrectAnswer(
    currentItem: QuizItem,
    wrongGuesses: number[],
) {
    let correctButton: Xelement<HTMLButtonElement> | null = null;
    const buttons = xref.buttons();
    for (let i = 0; i < buttons.length; i++) {
        if (wrongGuesses.includes(i)) {
            continue;
        }
        correctButton = buttons[i];
        correctButton.className = ButtonState.REVEAL;
        currentItem.answeredCorrectly = true;
        break;
    }
    if (!correctButton) {
        throw new Error("No correct button found.");
    }
}
