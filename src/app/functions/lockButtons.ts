import { ButtonState } from "../models/ButtonState";
import QuizItem from "../models/QuizItem";
import getCorrectAnswerButton from "./getCorrectAnswerButton";
import handleWrongGuess from "./handleWrongGuess";
import revealCorrectAnswer from "./revealCorrectAnswer";
import unlockButtons from "./unlockButtons";
import { wrongGuessesExauhsted } from "./wrongGuessesExauhsted";
import AppContext from "../AppContext";
import Xref from "../../core/xrefs/Xref";

export default async function lockButtons(
    currentItem: QuizItem,
    
    isCorrectGuess: boolean,
    wrongGuesses: number[],

) {
    const appState = AppContext.appState();
    const { state } = appState;
    const elements = AppContext.elements();
    const { refs } = elements;
    const { buttons } = refs;

    const correct:Xref<HTMLButtonElement> = getCorrectAnswerButton(elemen
    for (let guess = 0; guess < buttons.length; guess++) {
        //
        const button:  Xref<HTMLButtonElement>
         = buttons[guess];
          const el = button.element!;

        if (el.className === ButtonState.DISABLED) {
            continue;
        }
        if (el.className === ButtonState.HIDDEN) {
            continue;
        }
        if (state.guessValue !== el.value) {
            el.className = ButtonState.DIMMED;
            continue;
        }

        if (isCorrectGuess) {
            correctButton = button;
            correctButtonRef = correctButton.ref.current!;
            correctButtonRef.className = ButtonState.CORRECT;
            currentItem.answeredCorrectly = true;
            continue;
        }

        wrongGuesses.push(guess);
        guessButtonRef.className = ButtonState.WRONG;

        if (wrongGuessesExauhsted(guessButtons, wrongGuesses)) {
            await handleWrongGuess(guessButtons, elements);
            await unlockButtons(guessButtons, wrongGuesses);
            revealCorrectAnswer(
                correctButton!,
                correctButtonRef!,
                currentItem,
                elements,
                guessButtons,
                wrongGuesses,
            );
            break;
        }
    }

    correctButton ??= getCorrectAnswerButton(elements, state);
    return correctButton;
}
