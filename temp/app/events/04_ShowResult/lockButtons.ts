import { Xelement } from "../../../core/animation/dom/Xelement";
import { QuizItem } from "../../../../src/models/QuizItem";
import { handleWrongGuess } from "./handleWrongGuess";
import { revealCorrectAnswer } from "./revealCorrectAnswer";
import { unlockButtons } from "./unlockButtons";
import { wrongGuessesExhausted } from "./wrongGuessesExhausted";
import { FlowContext } from "../../../../src/context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { xref } from "../../../core/animation/dom/xref";
import { ButtonState } from "../../../../src/models/ButtonState";

export async function lockButtons(
    currentItem: QuizItem,
    isCorrectGuess: boolean,
    wrongGuesses: number[],
) {
    const [state] = FlowContext.context<QuizState>();
    const buttons = xref.buttons();
    
    for (let guess = 0; guess < buttons.length; guess++) {
        //
        const button: Xelement<HTMLButtonElement> = buttons[guess];

        if (button.className === ButtonState.DISABLED) {
            continue;
        }
        if (button.className === ButtonState.HIDDEN) {
            continue;
        }
        if (state.guessValue !== button.dataValue) {
            button.className = ButtonState.DIMMED;
            continue;
        }

        if (isCorrectGuess) {
            button.className = ButtonState.CORRECT;
            currentItem.answeredCorrectly = true;
            continue;
        }

        wrongGuesses.push(guess);
        button.className = ButtonState.WRONG;

        if (wrongGuessesExhausted(wrongGuesses)) {
            await handleWrongGuess();
            await unlockButtons(wrongGuesses);
            revealCorrectAnswer(currentItem, wrongGuesses);
            break;
        }
    }
}
