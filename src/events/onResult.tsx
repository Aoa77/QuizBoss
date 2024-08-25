import { Context } from "../context/Context";
import { GameState } from "../context/GameState";
import { GuessButtonState } from "../context/GuessButtonState";
import { delay, hideElementRef } from "../utilities";

///
var wrongGuesses: number[] = [];

///
export async function onResult(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        guessValue,
        quizModule,
        setCurrentItemIndex,
        setGameState,
    } = context;

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
            if (guessButton.className === GuessButtonState.DISABLED) {
                continue;
            }
            if (guessButton.className === GuessButtonState.HIDDEN) {
                continue;
            }
            if (guessValue !== guessButton.value) {
                guessButton.className = GuessButtonState.DIMMED;
                continue;
            }
            if (isCorrectGuess) {
                guessButton.className = GuessButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }
            wrongGuesses.push(guess);
            guessButton.className = GuessButtonState.WRONG;
        }
    }

    function handleCorrectGuess() {
        context.setScore(
            context.score + guessButtonCount - wrongGuesses.length - 1,
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
                case GuessButtonState.DIMMED:
                    if (!wrongGuesses.includes(guess)) {
                        ref.className = GuessButtonState.NORMAL;
                    }
                    break;
                case GuessButtonState.WRONG:
                    ref.className = GuessButtonState.DIMMED;
                    break;
                default:
                    break;
            }
        }
    }
}
