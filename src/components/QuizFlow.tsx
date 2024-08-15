import { Config } from "./Config";
import { GameState, onLoading, onNext, onResult, onStartup } from "./GameState";
import { GuessButton } from "./GuessButton";
import { QuizItem } from "./QuizModule";
import { useEffect } from "react";

export function useQuizFlow(
    gameState: GameState,
    guessButtons: GuessButton[],
    guessValue: string,
    index: number,
    quizItems: QuizItem[],
    config: Config,
    refButtons: React.RefObject<HTMLDivElement>,
    refImage: React.RefObject<HTMLDivElement>,
    refLoading: React.RefObject<HTMLDivElement>,
    refQuestion: React.RefObject<HTMLHeadingElement>,
    refTitle: React.RefObject<HTMLHeadingElement>,
    setGameState: (value: GameState) => void,
    setIndex: (value: number) => void,
) {
    useEffect(() => {
        console.debug("useQuizFlow", gameState);
        switch (gameState) {
            case GameState.INPUT:
                return;

            case GameState.STARTUP:
                onStartup(config, refTitle, setGameState);
                return;

            case GameState.LOADING:
                onLoading(
                    index,
                    quizItems,
                    config,
                    refImage,
                    refLoading,
                    setGameState,
                );
                return;

            case GameState.NEXT:
                onNext(
                    guessButtons,
                    index,
                    quizItems,
                    refButtons,
                    refImage,
                    refLoading,
                    refQuestion,
                    setGameState,
                );
                return;

            case GameState.RESULT:
                onResult(
                    guessButtons,
                    guessValue,
                    index,
                    quizItems,
                    config,
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
        quizItems,
        config,
        refButtons,
        refImage,
        refLoading,
        refQuestion,
        refTitle,
        setGameState,
        setIndex,
    ]);
}
