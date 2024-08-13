import { useMemo, useRef, useState } from "react";
import { useGuessButtons } from "./GuessButton";
import { GameState } from "./GameState";
import { QuizItem, loadQuizData } from "./QuizItem";
import { useQuizFlow } from "./QuizFlow";
import "../styles";

export interface AppProps {
    quizTitle: string;
    itemQuestion: string;
    jsonData: Record<string, string>;
}

export function App(props: AppProps) {
    const quizItems: QuizItem[] = useMemo(
        () => loadQuizData(props.jsonData),
        [props.jsonData],
    );

    const loadingArea = useRef(null);
    const quizArea = useRef(null);

    const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
    const [guessValue, setGuessValue] = useState<string>("");
    const [index, setIndex] = useState<number>(0);

    const guessButtons = useGuessButtons((ref) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        setGuessValue(ref.current!.value);
        setGameState(GameState.RESULT);
    });

    useQuizFlow(
        gameState,
        guessButtons,
        guessValue,
        index,
        loadingArea,
        quizArea,
        quizItems,
        setGameState,
        setIndex,
    );
    return (
        <main>
            <h1>{props.quizTitle}</h1>
            <section ref={loadingArea} className="loadingArea">
                <div className="spinner"></div>
            </section>
            <section ref={quizArea} className="quizArea hidden">
                <h2>{props.itemQuestion}</h2>
                {quizItems[index].imageJsx}
                {guessButtons.map((b) => b.element)}
            </section>
        </main>
    );
}
