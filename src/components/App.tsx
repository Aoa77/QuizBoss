import "../styles";
import { AppProps, Config, Elements } from "../props";
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
import { AppState } from "../props/AppProps";

export default function App(config: Config) {
    const [state, setState] = useState<AppState>({
        currentItemIndex: 0,
        gameState: GameState.INIT,
        guessValue: "",
        quizModule: null,
        score: 0,
        best: 0,
    });
    const guessButtons = useButtonBuilder(config, state, setState);
    useLocalBestScore(state, setState);

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

    const appProps: AppProps = {
        config,
        delay: new Delay(elements),
        elements,
        guessButtons,
        state,
        setState,
    };

    useEventRouter(appProps);
    const quizData = state.quizModule?.quizData;

    return (
        <main>
            <TitleHeading {...appProps} />
            <LoadingSpinner {...appProps} />
            <QuestionImage {...appProps} />
            <QuestionHeading {...appProps} />
            <GuessButtons {...appProps} />
            <ScoreDisplay {...appProps} />

            <section ref={refProgress} className="progress hidden">
                <span className="current">{state.currentItemIndex + 1}</span>
                <span> / </span>
                <span className="total">{quizData?.items.length}</span>
            </section>
        </main>
    );
}
