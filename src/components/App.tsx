import "../styles";
import { Config, ConfigDefaults } from "./Config";
import { GameState } from "./GameState";
import { QuizModule, useQuizModule } from "./QuizModule";
import { useGuessButtons } from "./GuessButton";
import { useQuizFlow } from "./QuizFlow";
import { useRef, useState } from "react";

export default function App(props: Config) {
    const config = ConfigDefaults.setDefaults(props);

    const [gameState, setGameState] = useState<GameState>(GameState.STARTUP);
    const [guessValue, setGuessValue] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [module, setModule] = useState<QuizModule | null>(null);

    const refButtons = useRef<HTMLDivElement>(null);
    const refImage = useRef<HTMLDivElement>(null);
    const refLoading = useRef<HTMLDivElement>(null);
    const refQuestion = useRef<HTMLHeadingElement>(null);
    const refTitle = useRef<HTMLHeadingElement>(null);

    useQuizModule(config.loadThrottle!, props.quizModuleName, setModule);
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
        config,
        refButtons,
        refImage,
        refLoading,
        refQuestion,
        refTitle,
        setGameState,
        setIndex,
    );
    return (
        <main>
            <h1 ref={refTitle} className="hidden">
                {module?.quiz.title}
            </h1>
            <h2 ref={refQuestion} className="hidden">
                {module?.quiz.question}
            </h2>
            <section ref={refLoading} className="loading hidden">
                <div className="spinner"></div>
            </section>
            <section ref={refImage} className="image hidden">
                {module?.quiz.items[index].imageJsx}
            </section>
            <section ref={refButtons} className="buttons hidden">
                {guessButtons.map((b) => b.element)}
            </section>
        </main>
    );
}
