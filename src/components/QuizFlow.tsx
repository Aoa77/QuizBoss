import { delay, randomInt } from "./Util";
import { GameState } from "./GameState";
import { GuessButton, GuessButtonCount, GuessButtonState } from "./GuessButton";
import { QuizItem } from "./QuizItem";
import { useEffect } from "react";

const LOADING_DELAY = 100;
const RESULT_DELAY = 1500;
const HIDDEN = "hidden";

export function useQuizFlow(
    gameState: GameState,
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    setGameState: (value: GameState) => void,
    setIndex: (value: number) => void
) {
    useEffect(() => {
        switch (gameState) {
            case GameState.INPUT:
            case GameState.END:
                return;
            case GameState.LOADING:
                gsLoading(index, loadingArea, quizArea, quizItems, setGameState);
                return;
            case GameState.NEXT:
                gsNext(guessButtons, index, loadingArea, quizArea, quizItems, setGameState);
                return;
            case GameState.RESULT:
                gsResult(
                    guessButtons,
                    guessValue,
                    index,
                    quizItems,
                    setGameState,
                    setIndex
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
        setGameState,
        setIndex,
    ]);
}

async function gsLoading(
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    setGameState: (value: GameState) => void
) {
    quizArea.current!.classList.add(HIDDEN);
    loadingArea.current!.classList.remove(HIDDEN);
    while (!quizItems[index].isLoaded) {
        await delay(LOADING_DELAY);
    }
    setGameState(GameState.NEXT);
}

async function gsResult(
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    quizItems: QuizItem[],
    setGameState: (value: GameState) => void,
    setIndex: (value: number) => void
) {
    const correctCode = quizItems[index].code;
    for (let guess = 0; guess < GuessButtonCount; guess++) {
        const ref = guessButtons[guess].ref.current!;
        if (guessValue !== ref.value) {
            ref.className = GuessButtonState.DIMMED;
            continue;
        }
        if (guessValue === correctCode) {
            ref.className = GuessButtonState.CORRECT;
            quizItems[index].answeredCorrectly = true;
        } else {
            ref.className = GuessButtonState.WRONG;
        }
    }
    await delay(RESULT_DELAY);
    setIndex(index + 1);
    setGameState(GameState.LOADING);
}

function gsNext(
    guessButtons: GuessButton[],
    index: number,
    loadingArea: React.RefObject<HTMLDivElement>,
    quizArea: React.RefObject<HTMLDivElement>,
    quizItems: QuizItem[],
    setGameState: (value: GameState) => void
) {
    loadingArea.current!.classList.add(HIDDEN);
    quizArea.current!.classList.remove(HIDDEN);
    const items: number[] = [];
    const answerSpot: number = randomInt(0, GuessButtonCount);
    console.info("answerSpot: ", answerSpot);
    for (let guess = 0; guess < GuessButtonCount; guess++) {
        let item = index;
        if (guess !== answerSpot) {
            while (true) {
                item = randomInt(0, quizItems.length);
                if (item !== index &&
                    !items.includes(item) &&
                    !quizItems[item].answeredCorrectly) {
                    break;
                }
            }
        }
        items.push(item);
        const ref = guessButtons[guess].ref.current!;
        ref.innerHTML = quizItems[item].name;
        ref.value = quizItems[item].code;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}
