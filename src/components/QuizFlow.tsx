import { delay, randomInt, hideElement, showElement } from "./Util";
import { GameState } from "./GameState";
import { GuessButton, GuessButtonCount, GuessButtonState } from "./GuessButton";
import { QuizItem } from "./QuizModule";
import { useEffect } from "react";

export function useQuizFlow(
    gameState: GameState,
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    resultDisplayTime: number,
    spinnerPollingDelay: number,
    spinnerPollingInterval: number,
    setGameState: (value: GameState) => void,
    setIndex: (value: number) => void,
) {
    useEffect(() => {
        console.debug("useQuizFlow", gameState);
        switch (gameState) {
            case GameState.INPUT:
            case GameState.END:
                return;
            case GameState.LOADING:
                processLoading(
                    index,
                    loadingArea,
                    quizArea,
                    quizItems,
                    spinnerPollingDelay,
                    spinnerPollingInterval,
                    setGameState,
                );
                return;
            case GameState.NEXT:
                processNext(
                    guessButtons,
                    index,
                    loadingArea,
                    quizArea,
                    quizItems,
                    setGameState,
                );
                return;
            case GameState.RESULT:
                processResult(
                    guessButtons,
                    guessValue,
                    index,
                    quizItems,
                    resultDisplayTime,
                    setGameState,
                    setIndex,
                );
                return;
            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
    }, [
        gameState,
        guessButtons,
        guessValue,
        index,
        loadingArea,
        quizArea,
        quizItems,
        resultDisplayTime,
        spinnerPollingDelay,
        spinnerPollingInterval,
        setGameState,
        setIndex,
    ]);
}

async function processLoading(
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    spinnerPollingDelay: number,
    spinnerPollingInterval: number,
    setGameState: (value: GameState) => void,
) {
    hideElement(quizArea.current!);
    showElement(loadingArea.current!);
    await delay(spinnerPollingDelay);

    while (!quizItems[index] || !quizItems[index].isLoaded) {
        await delay(spinnerPollingInterval);
    }
    setGameState(GameState.NEXT);
}

async function processResult(
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    quizItems: QuizItem[],
    resultDisplayTime: number,
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
    await delay(resultDisplayTime);
    setIndex(index + 1);
    setGameState(GameState.LOADING);
}

function processNext(
    guessButtons: GuessButton[],
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    setGameState: (value: GameState) => void,
) {
    hideElement(loadingArea.current!);
    showElement(quizArea.current!);

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
