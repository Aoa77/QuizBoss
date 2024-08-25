import AllProps from "../props/AllProps";
import { GameState, ButtonState } from "../props/Enums";
import { delay, hideElementRef } from "../utilities";

///
var wrongGuesses: number[] = [];

///
export async function onResult(props: AllProps) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        guessValue,
        quizModule,
        setCurrentItemIndex,
        setGameState,
    } = props;

    const { guessButtonCount } = config;
    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === guessValue;

    lockButtons();
    if (isCorrectGuess) {
        handleCorrectGuess();
        return;
    }

    await delay(config.nextDelay);
    unlockButtons();
    setGameState(GameState.INPUT);
    return;

    function lockButtons() {
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            if (guessButton.className === ButtonState.DISABLED) {
                continue;
            }
            if (guessButton.className === ButtonState.HIDDEN) {
                continue;
            }
            if (guessValue !== guessButton.value) {
                guessButton.className = ButtonState.DIMMED;
                continue;
            }
            if (isCorrectGuess) {
                guessButton.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }
            wrongGuesses.push(guess);
            guessButton.className = ButtonState.WRONG;
        }
    }

    function handleCorrectGuess() {
        props.setScore(
            props.score + guessButtonCount - wrongGuesses.length - 1,
        );
        hideElementRef(elements.image);
        if (1 + currentItemIndex === quizItems.length) {
            setGameState(GameState.GAMEOVER);
            return;
        }
        setCurrentItemIndex(currentItemIndex + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
    }

    function unlockButtons() {
        for (let guess = 0; guess < guessButtonCount; guess++) {
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
}
