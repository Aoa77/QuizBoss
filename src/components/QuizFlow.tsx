import { Config } from "./Config";
import { GameState } from "./GameState";
import { GuessButton } from "./GuessButton";
import { Elements } from "./Elements";
import { onLoading, onNext, onResult, onStartup } from "./Events";
import { QuizModule } from "./QuizModule";
import { useEffect } from "react";

export function useQuizFlow(
    config: Config,

    currentItemIndex: number,
    setCurrentItemIndex: (value: number) => void,

    gameState: GameState,
    setGameState: (value: GameState) => void,

    guessButtons: GuessButton[],
    guessValue: string,
    quizModule: QuizModule | null,

    refButtons: React.RefObject<HTMLDivElement>,
    refImage: React.RefObject<HTMLDivElement>,
    refLoading: React.RefObject<HTMLDivElement>,
    refQuestion: React.RefObject<HTMLHeadingElement>,
    refTitle: React.RefObject<HTMLHeadingElement>,
) {
    useEffect(() => {
        console.info("useQuizFlow", gameState);

        const elements: Elements = {
            buttons: refButtons.current!,
            image: refImage.current!,
            loading: refLoading.current!,
            question: refQuestion.current!,
            title: refTitle.current!,
        };
        const quizItems = quizModule?.quizdata.items ?? [];

        switch (gameState) {
            case GameState.INPUT:
                return;

            case GameState.STARTUP:
                onStartup(config, elements, setGameState);
                return;

            case GameState.LOADING:
                onLoading(
                    currentItemIndex,
                    quizItems,
                    config,
                    elements,
                    setGameState,
                );
                return;

            case GameState.NEXT:
                onNext(
                    guessButtons,
                    currentItemIndex,
                    quizItems,
                    elements,
                    setGameState,
                );
                return;

            case GameState.RESULT:
                onResult(
                    guessButtons,
                    guessValue,
                    currentItemIndex,
                    quizItems,
                    elements,
                    setGameState,
                    setCurrentItemIndex,
                );
                return;

            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...arguments]);
}
