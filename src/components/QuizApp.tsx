import "../styles";
import { GameState } from "./GameState";
import { QuizConfig } from "./QuizConfig";
import { useGuessButtons } from "./GuessButton";
import { useQuizFlow } from "./QuizFlow";
import { QuizModule, useQuizModule } from "./QuizModule";
import { useRef, useState } from "react";

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

    const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
    const [guessValue, setGuessValue] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [module, setModule] = useState<QuizModule | null>(null);
    const loadingArea = useRef(null);
    const quizArea = useRef(null);

    useQuizModule(imageLoadThrottle, props.quizModuleName, setModule);
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
        module?.quiz.items ?? [],
        resultDisplayTime,
        spinnerPollingDelay,
        spinnerPollingInterval,
        setGameState,
        setIndex,
    );
    return (
        <main>
            <h1>{module?.quiz.title}</h1>
            <section ref={loadingArea} className="loadingArea">
                <div className="spinner"></div>
            </section>
            <section ref={quizArea} className="quizArea hidden">
                <h2>{module?.quiz.question}</h2>
                {module?.quiz.items[index].imageJsx}
                {guessButtons.map((b) => b.element)}
            </section>
        </main>
    );
}
