import "../styles";
import { Config } from "./Config";
import { Context } from "./Context";
import { Elements } from "./Elements";
import { GameState } from "./GameState";
import { QuizModule } from "./QuizModule";
import { useGameFlow } from "./GameFlow";
import { useGuessButtons } from "./GuessButton";
import { useRef, useState } from "react";
import ScoreDisplay from "./ScoreDisplay";

export default function App(config: Config) {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [gameState, setGameState] = useState<GameState>(GameState.INIT);
    const [guessValue, setGuessValue] = useState<string>("");
    const [quizModule, setQuizModule] = useState<QuizModule | null>(null);
    const [score, setScore] = useState<number>(0);

    const refButtons = useRef<HTMLDivElement | null>(null);
    const refImage = useRef<HTMLDivElement | null>(null);
    const refLoading = useRef<HTMLDivElement | null>(null);
    const refProgress = useRef<HTMLDivElement | null>(null);
    const refQuestion = useRef<HTMLHeadingElement | null>(null);
    const refScore = useRef<HTMLDivElement | null>(null);
    const refTitle = useRef<HTMLHeadingElement | null>(null);

    const elements: Elements = {
        buttons: refButtons,
        image: refImage,
        loading: refLoading,
        progress: refProgress,
        question: refQuestion,
        score: refScore,
        title: refTitle,
    };

    const guessButtons = useGuessButtons(
        config,
        gameState,
        setGameState,
        setGuessValue,
    );

    const context: Context = {
        config,
        currentItemIndex,
        elements,
        gameState,
        guessButtons,
        guessValue,
        quizModule,
        score,
        setCurrentItemIndex,
        setGameState,
        setGuessValue,
        setQuizModule,
        setScore,
    };

    useGameFlow(context);
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
                <ScoreDisplay {...context} />
            <section ref={refProgress} className="progress hidden">
                <span className="current">{currentItemIndex + 1}</span>
                <span> / </span>
                <span className="total">{quizData?.items.length}</span>
            </section>
        </main>
    );
}

