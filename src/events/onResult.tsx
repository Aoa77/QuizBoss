import { AppProps } from "../props";
import { GameState, ButtonState } from "../enums";
import { hideElementRef } from "../utilities/visibility";

///
var wrongGuesses: number[] = [];

///
export async function onResult(props: AppProps) {
    const {
        config,
        currentItemIndex,
        delay,
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
        await handleCorrectGuess();
        return;
    }

    await delay.questionHeading();
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

    async function handleCorrectGuess() {
        props.setScore(
            props.score + guessButtonCount - wrongGuesses.length - 1,
        );
        
        hideElementRef(elements.questionHeading);
        await delay.questionHeading();

        hideElementRef(elements.imageSection);
        await delay.questionHeading();
        
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            guessButton.className = ButtonState.HIDDEN;
            await delay.questionHeading();
        }
        
        await delay.questionHeading();
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
