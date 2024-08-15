import "../styles";
import { GameState } from "./GameState";
import { QuizConfig, QuizConfigDefaults } from "./QuizConfig";
import { useGuessButtons } from "./GuessButton";
import { useQuizFlow } from "./QuizFlow";
import { QuizModule, useQuizModule } from "./QuizModule";
import { useRef, useState } from "react";

export function QuizApp(props: QuizConfig) {
    const config = QuizConfigDefaults.setDefaults(props);

    const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
    const [guessValue, setGuessValue] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [module, setModule] = useState<QuizModule | null>(null);

    const refButtons = useRef<HTMLDivElement>(null);
    const refImage = useRef<HTMLDivElement>(null);
    const refLoading = useRef<HTMLDivElement>(null);
    const refQuestion = useRef<HTMLHeadingElement>(null);
    const refTitle = useRef<HTMLHeadingElement>(null);

    useQuizModule(config.imageLoadThrottle!, props.quizModuleName, setModule);
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
        module?.quiz.items ?? [],
        config.resultDisplayTime!,
        config.spinnerPollingDelay!,
        config.spinnerPollingInterval!,
        refButtons,
        refImage,
        refLoading,
        refQuestion,
        setGameState,
        setIndex,
    );
    return (
        <main>
            <h1 ref={refTitle}>{module?.quiz.title}</h1>
            <h2 ref={refQuestion} className="hidden">
                {module?.quiz.question}
            </h2>
            <section ref={refLoading} className="loadingArea hidden">
                <div className="spinner"></div>
            </section>
            <section ref={refImage} className="imageArea hidden">
                {module?.quiz.items[index].imageJsx}
            </section>
            <section ref={refButtons} className="buttonArea hidden">
                {guessButtons.map((b) => b.element)}
            </section>
        </main>
    );
}
