import "../styles";
import { Config } from "../context/Config";
import { Context } from "../context/Context";
import { Elements } from "../context/Elements";
import { GameState } from "../context/GameState";
import { QuizModule } from "../context/QuizModule";
import { useButtonBuilder } from "../hooks/useButtonBuilder";
import { useEventRouter } from "../hooks/useEventRouter";
import { useRef, useState } from "react";
import GuessButtons from "./GuessButtons";
import HeadingText from "./HeadingText";
import LoadingSpinner from "./LoadingSpinner";
import QuestionImage from "./QuestionImage";
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

    const guessButtons = useButtonBuilder(
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

    useEventRouter(context);
    const quizData = quizModule?.quizData;

    return (
        <main>
            <HeadingText {...context} />
            <LoadingSpinner {...context} />
            <QuestionImage {...context} />
            <GuessButtons {...context} />
            <ScoreDisplay {...context} />
            <section ref={refProgress} className="progress hidden">
                <span className="current">{currentItemIndex + 1}</span>
                <span> / </span>
                <span className="total">{quizData?.items.length}</span>
            </section>
        </main>
    );
}
