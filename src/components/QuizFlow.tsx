import { Config } from "./Config";
import { GameState, onLoading, onNext, onResult, onStartup } from "./GameState";
import { GuessButton } from "./GuessButton";
import { HtmlElementRefs } from "./HtmlElementRefs";
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

        const refs: HtmlElementRefs = {
            buttons: refButtons.current!,
            image: refImage.current!,
            loading: refLoading.current!,
            question: refQuestion.current!,
            title: refTitle.current!,
        };

        switch (gameState) {
            case GameState.INPUT:
                return;

            case GameState.STARTUP:
                onStartup(config, refs, setGameState);
                return;

            case GameState.LOADING:
                onLoading(index, quizItems, config, refs, setGameState);
                return;

            case GameState.NEXT:
                onNext(guessButtons, index, quizItems, refs, setGameState);
                return;

            case GameState.RESULT:
                onResult(
                    guessButtons,
                    guessValue,
                    index,
                    quizItems,
                    refs,
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
