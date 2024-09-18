import ButtonElement from "../elements/buttons/ButtonElement";
import { ButtonState } from "../elements/buttons/ButtonState";
import ElementController from "../elements/ElementController";
import QuizItem from "../state/QuizItem";
import State from "../state/State";
import getCorrectAnswerButton from "./getCorrectAnswerButton";
import handleWrongGuess from "./handleWrongGuess";
import revealCorrectAnswer from "./revealCorrectAnswer";
import unlockButtons from "./unlockButtons";
import { wrongGuessesExauhsted } from "./wrongGuessesExauhsted";

export default async function lockButtons(
    currentItem: QuizItem,
    elements: ElementController,
    guessButtons: ButtonElement[],
    isCorrectGuess: boolean,
    state: State,
    wrongGuesses: number[],
    // tasks: Promise<void>[],
): Promise<ButtonElement> {
    //
    let correctButton: ButtonElement | null = null;
    let correctButtonRef: HTMLButtonElement | null = null;

    for (let guess = 0; guess < guessButtons.length; guess++) {
        //
        const guessButton = guessButtons[guess];
        const guessButtonRef = guessButton.ref.current!;

        if (guessButtonRef.className === ButtonState.DISABLED) {
            continue;
        }
        if (guessButtonRef.className === ButtonState.HIDDEN) {
            continue;
        }
        if (state.guessValue !== guessButtonRef.value) {
            guessButtonRef.className = ButtonState.DIMMED;
            continue;
        }

        if (isCorrectGuess) {
            correctButton = guessButton;
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
