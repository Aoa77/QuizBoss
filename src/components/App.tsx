import "../styles";
import { Config, ConfigDefaults } from "./Config";
import { Context } from "./Context";
import { Elements } from "./Elements";
import { GameState } from "./GameState";
import { GuessButtonState, useGuessButtons } from "./GuessButton";
import { QuizModule, useQuizModule } from "./QuizModule";
import { useQuizFlow } from "./QuizFlow";
import { useRef, useState } from "react";

export default function App(props: Config) {
    //
    const config = ConfigDefaults.setDefaults(props);
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [gameState, setGameState] = useState<GameState>(GameState.INIT);
    const [guessValue, setGuessValue] = useState<string>("");
    const [quizModule, setQuizModule] = useState<QuizModule | null>(null);
    useQuizModule(config, setQuizModule);

    const refButtons = useRef<HTMLDivElement>(null);
    const refImage = useRef<HTMLDivElement>(null);
    const refLoading = useRef<HTMLDivElement>(null);
    const refQuestion = useRef<HTMLHeadingElement>(null);
    const refStats = useRef<HTMLHeadingElement>(null);
    const refTitle = useRef<HTMLHeadingElement>(null);

    const elements: Elements = {
        buttons: refButtons.current!,
        image: refImage.current!,
        loading: refLoading.current!,
        question: refQuestion.current!,
        stats: refStats.current!,
        title: refTitle.current!,
    };

    const guessButtons = useGuessButtons((clickedButtonRef) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        const clickedButton = clickedButtonRef.current!;
        if (clickedButton.className !== GuessButtonState.NORMAL) {
            return;
        }
        setGuessValue(clickedButton.value);
        setGameState(GameState.RESULT);
    });

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

    useQuizFlow(context);
    const quizData = quizModule?.quizData;

    return (
        <main>
            <h1 ref={refTitle} className="hidden">
                {quizData?.title}
            </h1>
            <h2 ref={refQuestion} className="hidden">
                {quizData?.questionText}
            </h2>
            <section ref={refLoading} className="loading hidden">
                <div className="spinner"></div>
            </section>
            <section ref={refImage} className="image hidden">
                {quizData?.items[currentItemIndex].imageJsx}
            </section>
            <section ref={refButtons} className="buttons hidden">
                {guessButtons.map((b) => b.element)}
            </section>
            <section ref={refStats} className="stats hidden">
                <h3>Items:</h3>
            </section>
        </main>
    );
}
