import "../styles";
import { AppProps, Config, Elements, QuizModule } from "../props";
import { GameState } from "../enums";
import { useButtonBuilder, useEventRouter, useLocalBestScore } from "../hooks";
import { useRef, useState } from "react";
import Delay from "../props/Delay";
import GuessButtons from "./GuessButtons";
import TitleHeading from "./TitleHeading";
import LoadingSpinner from "./LoadingSpinner";
import QuestionImage from "./QuestionImage";
import ScoreDisplay from "./ScoreDisplay";
import QuestionHeading from "./QuestionHeading";

export default function App(config: Config) {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [gameState, setGameState] = useState<GameState>(GameState.INIT);
    const [guessValue, setGuessValue] = useState<string>("");
    const [quizModule, setQuizModule] = useState<QuizModule | null>(null);
    const [score, setScore] = useState<number>(0);
    const [best, setBest] = useState<number>(0);

    const refButtons = useRef<HTMLDivElement | null>(null);
    const refImage = useRef<HTMLDivElement | null>(null);
    const refLoading = useRef<HTMLDivElement | null>(null);
    const refProgress = useRef<HTMLDivElement | null>(null);
    const refQuestion = useRef<HTMLHeadingElement | null>(null);
    const refScore = useRef<HTMLDivElement | null>(null);
    const refScoreMark = useRef<HTMLSpanElement | null>(null);
    const refTitle = useRef<HTMLHeadingElement | null>(null);

    const elements: Elements = {
        buttonsSection: refButtons,
        imageSection: refImage,
        loadingSection: refLoading,
        progressSection: refProgress,
        questionHeading: refQuestion,
        scoreSection: refScore,
        scoreMark: refScoreMark,
        titleHeading: refTitle,
    };

    const guessButtons = useButtonBuilder(
        config,
        gameState,
        setGameState,
        setGuessValue,
    );

    useLocalBestScore(best, setBest);

    const appProps: AppProps = {
        config,
        currentItemIndex,
        delay: new Delay(elements),
        elements,
        gameState,
        guessButtons,
        guessValue,
        quizModule,
        score,
        best,
        setCurrentItemIndex,
        setGameState,
        setGuessValue,
        setQuizModule,
        setScore,
        setBest,
    };

    useEventRouter(appProps);
    const quizData = quizModule?.quizData;

    return (
        <main>
            <TitleHeading {...appProps} />
            <LoadingSpinner {...appProps} />
            <QuestionImage {...appProps} />
            <QuestionHeading {...appProps} />
            <GuessButtons {...appProps} />
            <ScoreDisplay {...appProps} />

            <section ref={refProgress} className="progress hidden">
                <span className="current">{currentItemIndex + 1}</span>
                <span> / </span>
                <span className="total">{quizData?.items.length}</span>
            </section>
        </main>
    );
}
