import { getElementButtons } from "../../core/functions/getElementButtons";
import { Xelement } from "../../core/xobjs/Xelement";
import { getAppState } from "./getAppState";
import { ButtonState } from "../models/ButtonState";
import { QuizItem } from "../models/QuizItem";
import { handleWrongGuess } from "./handleWrongGuess";
import { revealCorrectAnswer } from "./revealCorrectAnswer";
import { unlockButtons } from "./unlockButtons";
import { wrongGuessesExauhsted } from "./wrongGuessesExauhsted";

export async function lockButtons(
    currentItem: QuizItem,
    isCorrectGuess: boolean,
    wrongGuesses: number[],
) {
    const [state] = getAppState();
    const buttons = getElementButtons();
    for (let guess = 0; guess < buttons.length; guess++) {
        //
        const button: Xelement<HTMLButtonElement> = buttons[guess];

        if (button.className === ButtonState.DISABLED) {
            continue;
        }
        if (button.className === ButtonState.HIDDEN) {
            continue;
        }
        if (state.guessValue !== button.element.value) {
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

        if (wrongGuessesExauhsted(wrongGuesses)) {
            await handleWrongGuess();
            await unlockButtons(wrongGuesses);
            revealCorrectAnswer(currentItem, wrongGuesses);
            break;
        }
    }
}
