import { Xelement } from "../../../core/animation/dom/Xelement";
import { QuizItem } from "../../../../src/models/QuizItem";
import { handleWrongGuess } from "./handleWrongGuess";
import { revealCorrectAnswer } from "./revealCorrectAnswer";
import { unlockButtons } from "./unlockButtons";
import { wrongGuessesExhausted } from "./wrongGuessesExhausted";
import { FlowContext } from "../../../../src/libs/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { xref } from "../../../core/animation/dom/xref";
import { ButtonStyle } from "../../../../src/models/ButtonStyle";

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

        if (button.className === ButtonStyle.DISABLED) {
            continue;
        }
        if (button.className === ButtonStyle.HIDDEN) {
            continue;
        }
        if (state.guessValue !== button.dataValue) {
            button.className = ButtonStyle.DIMMED;
            continue;
        }

        if (isCorrectGuess) {
            button.className = ButtonStyle.CORRECT;
            currentItem.answeredCorrectly = true;
            continue;
        }

        wrongGuesses.push(guess);
        button.className = ButtonStyle.WRONG;

        if (wrongGuessesExhausted(wrongGuesses)) {
            await handleWrongGuess();
            await unlockButtons(wrongGuesses);
            revealCorrectAnswer(currentItem, wrongGuesses);
            break;
        }
    }
}
