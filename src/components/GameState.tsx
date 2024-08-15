import { GuessButton, GuessButtonCount, GuessButtonState } from "./GuessButton";
import { hideElement, showElement, delay, randomInt } from "./Util";
import { QuizItem } from "./QuizModule";
import { Config } from "./Config";

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
    refTitle: React.RefObject<HTMLHeadingElement>,
    setGameState: (value: GameState) => void,
) {
    showElement(refTitle.current!);
    await delay(config.startupDelay!);
    setGameState(GameState.LOADING);
}

export async function onLoading(
    index: number,
    quizItems: QuizItem[],
    config: Config,
    refImage: React.RefObject<HTMLDivElement>,
    refLoading: React.RefObject<HTMLDivElement>,
    setGameState: (value: GameState) => void,
) {
    hideElement(refImage.current!);
    showElement(refLoading.current!);

    await delay(config.spinnerPollingDelay!);

    while (!quizItems[index] || !quizItems[index].isLoaded) {
        await delay(config.spinnerPollingInterval!);
    }
    setGameState(GameState.NEXT);
}

export function onNext(
    guessButtons: GuessButton[],
    index: number,
    quizItems: QuizItem[],
    refButtons: React.RefObject<HTMLDivElement>,
    refImage: React.RefObject<HTMLDivElement>,
    refLoading: React.RefObject<HTMLDivElement>,
    refQuestion: React.RefObject<HTMLHeadingElement>,
    setGameState: (value: GameState) => void,
) {
    hideElement(refLoading.current!);
    showElement(refButtons.current!);
    showElement(refImage.current!);
    showElement(refQuestion.current!);

    const items: number[] = [];
    const answerSpot: number = randomInt(0, GuessButtonCount);
    console.debug("answerSpot: ", answerSpot);

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
        ref.value = quizItems[item].name;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}

export async function onResult(
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    quizItems: QuizItem[],
    config: Config,
    setGameState: (value: GameState) => void,
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
        } else {
            ref.className = GuessButtonState.WRONG;
        }
    }
    await delay(config.resultDisplayTime!);
    setIndex(index + 1);
    setGameState(GameState.LOADING);
}
