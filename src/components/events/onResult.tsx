import { Context } from "../Context";
import { GameState } from "../GameState";
import { GuessButtonState } from "../GuessButton";
import { hideElementRef } from "../Elements";
import * as util from "../Util";

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
    const isCorrectGuess = true;//correctAnswer === guessValue;

    for (let guess = 0; guess < guessButtonCount; guess++) {
        //
        const guessButton = guessButtons[guess].ref.current!;
        //
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

    if (isCorrectGuess) {
        context.setScore(
            context.score + guessButtonCount - wrongGuesses.length - 1,
        );
        hideElementRef(elements.image);
        if ((1 + currentItemIndex) === quizItems.length) {
            setGameState(GameState.GAMEOVER);
            return;
        }
        setCurrentItemIndex(currentItemIndex + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
        return;
    }

    await util.delay(config.nextDelay);

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

    setGameState(GameState.INPUT);
}
