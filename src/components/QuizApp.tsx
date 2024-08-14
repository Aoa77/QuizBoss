import { useEffect, useMemo, useRef, useState } from "react";
import "../styles";
import { GameState } from "./GameState";
import { QuizConfig } from "./QuizConfig";
import { QuizItem, loadQuizData, loadQuizImages } from "./QuizItem";
import { useGuessButtons } from "./GuessButton";
import { useQuizFlow } from "./QuizFlow";

export function QuizApp(props: QuizConfig) {
    let {
        imageLoadThrottle,
        resultDisplayTime,
        spinnerPollingDelay,
        spinnerPollingInterval,
    } = props;

    imageLoadThrottle ??= 50;
    resultDisplayTime ??= 1500;
    spinnerPollingDelay ??= 500;
    spinnerPollingInterval ??= 100;

    const quizItems: QuizItem[] = useMemo(() => {
        console.debug("useMemo called...");
        const data = loadQuizData(props.jsonData);
        return data;
    }, [props.jsonData]);

    useEffect(() => {
        console.debug("useEffect called...");
        loadQuizImages(imageLoadThrottle!, quizItems);
    }, [imageLoadThrottle, quizItems]);

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
        resultDisplayTime,
        spinnerPollingDelay,
        spinnerPollingInterval,
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
