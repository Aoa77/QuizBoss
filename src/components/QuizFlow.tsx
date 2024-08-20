import { Config } from "./Config";
import { Context } from "./Context";
import { Elements } from "./Elements";
import { GameState } from "./GameState";
import { GuessButton } from "./GuessButton";
import { onLoading, onNext, onResult, onStartup } from "./Events";
import { QuizModule } from "./QuizModule";
import { useEffect } from "react";

export function useQuizFlow(
    config: Config,
    currentItemIndex: number,
    gameState: GameState,
    guessButtons: GuessButton[],
    guessValue: string,
    quizModule: QuizModule | null,
    refButtons: React.RefObject<HTMLDivElement>,
    refImage: React.RefObject<HTMLDivElement>,
    refLoading: React.RefObject<HTMLDivElement>,
    refQuestion: React.RefObject<HTMLHeadingElement>,
    refTitle: React.RefObject<HTMLHeadingElement>,
    setCurrentItemIndex: (value: number) => void,
    setGameState: (value: GameState) => void,
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

        const context: Context = {
            config,
            currentItemIndex,
            elements,
            gameState,
            guessButtons,
            guessValue,
            quizModule,
            setCurrentItemIndex,
            setGameState,
        };

        switch (gameState) {
            case GameState.INPUT:
                return;

            case GameState.STARTUP:
                onStartup(context);
                return;

            case GameState.LOADING:
                onLoading(context);
                return;

            case GameState.NEXT:
                onNext(context);
                return;

            case GameState.RESULT:
                onResult(context);
                return;

            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...arguments]);
}
