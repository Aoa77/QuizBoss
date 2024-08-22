import { Context } from "../Context";
import { GameState } from "../GameState";
import { GuessButtonState } from "../GuessButton";
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

    for (let guess = 0; guess < guessButtonCount; guess++) {
        const ref = guessButtons[guess].ref.current!;
        if (guessValue !== ref.value) {
            ref.className = GuessButtonState.DIMMED;
            continue;
        }

        if (guessValue === correctAnswer) {
            ref.className = GuessButtonState.CORRECT;
            currentItem.answeredCorrectly = true;
            continue;
        }

        wrongGuesses.push(guess);
        ref.className = GuessButtonState.WRONG;
    }

    if (guessValue === correctAnswer) {
        context.setScore(
            context.score + guessButtonCount - wrongGuesses.length - 1,
        );
        util.hideElement(elements.image);
        setCurrentItemIndex(currentItemIndex + 1);  // TODO, GameOver condition...
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
