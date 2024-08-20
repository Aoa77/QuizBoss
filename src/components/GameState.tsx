import { GuessButton, GuessButtonCount, GuessButtonState } from "./GuessButton";
import { hideElement, showElement, delay, randomInt } from "./Util";
import { QuizItem } from "./QuizModule";
import { Config } from "./Config";
import { HtmlElementRefs } from "./HtmlElementRefs";

var first = true;
var wrongGuesses: number[] = [];


export enum GameState {
    STARTUP = "STARTUP",
    LOADING = "LOADING",
    NEXT = "NEXT",
    INPUT = "INPUT",
    RESULT = "RESULT",
    GAMEOVER = "GAMEOVER",
}

export async function onStartup(
    config: Config,
    refs: HtmlElementRefs,
    setGameState: (value: GameState) => void,
) { 
    hideElement(refs.image);
    showElement(refs.title);
    await delay(config.spinnerPoll!);
    setGameState(GameState.LOADING);
}


export async function onLoading(
    index: number,
    quizItems: QuizItem[],
    config: Config,
    refs: HtmlElementRefs,
    setGameState: (value: GameState) => void,
) {
    hideElement(refs.image);
    if (first) {
        await delay(config.spinnerPoll! * 4);
    }
    first = false;
    showElement(refs.loading);

    await delay(config.spinnerPoll! * 3);
    while (!quizItems[index] || !quizItems[index].isLoaded) {
        await delay(config.spinnerPoll!);
    }

    await delay(config.nextDelay!);
    setGameState(GameState.NEXT);
}

export function onNext(
    guessButtons: GuessButton[],
    index: number,
    quizItems: QuizItem[],
    refs: HtmlElementRefs,
    setGameState: (value: GameState) => void,
) {
    hideElement(refs.loading);
    showElement(refs.buttons);
    showElement(refs.image);
    showElement(refs.question);

    const items: number[] = [];
    const answerSpot: number = randomInt(0, GuessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let guess = 0; guess < GuessButtonCount; guess++) {
        let item = index;
        if (guess !== answerSpot) {
            while (true) {
                item = randomInt(0, quizItems.length);
                if (
                    item !== index &&
                    !items.includes(item) &&
                    !quizItems[item].answeredCorrectly
                ) {
                    break;
                }
            }
        }
        items.push(item);
        const ref = guessButtons[guess].ref.current!;
        ref.innerHTML = quizItems[item].name;
        //ref.innerHTML = "South Georgia and the South Sandwich Islands"; // longest value for testing
        ref.value = quizItems[item].name;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}

export async function onResult(
    guessButtons: GuessButton[],
    //guessPoints: number,
    guessValue: string,
    index: number,
    quizItems: QuizItem[],
    refs: HtmlElementRefs,
    setGameState: (value: GameState) => void,
    //setGuessPoints: (value: number) => void,
    setIndex: (value: number) => void,
) {
    const correctAnswer = quizItems[index].name;
    for (let guess = 0; guess < GuessButtonCount; guess++) {
        const ref = guessButtons[guess].ref.current!;
        if (guessValue !== ref.value) {
            ref.className = GuessButtonState.DIMMED;
            continue;
        }

        if (guessValue === correctAnswer) {
            ref.className = GuessButtonState.CORRECT;
            quizItems[index].answeredCorrectly = true;
            continue;
        }

        //setGuessPoints(guessPoints - 1);
        wrongGuesses.push(guess);
        ref.className = GuessButtonState.WRONG;
    }

    if (guessValue === correctAnswer) {
        hideElement(refs.image);
        setIndex(index + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
        return;
    }

    await delay(1000);

    for (let guess = 0; guess < GuessButtonCount; guess++) {
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
