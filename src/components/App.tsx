import "../styles";
import { AppProps, AppState, Config, Delay, Elements } from "../props";
import { GameState } from "../enums";
import { useButtonBuilder, useEventRouter, useLocalBestScore } from "../hooks";
import { useRef, useState } from "react";
import GuessButtons from "./GuessButtons";
import LoadingSpinner from "./LoadingSpinner";
import QuestionHeading from "./QuestionHeading";
import QuestionImage from "./QuestionImage";
import ScoreDisplay from "./ScoreDisplay";
import TitleHeading from "./TitleHeading";

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

    const elements: Elements = {
        buttonsSection: useRef<HTMLDivElement | null>(null),
        imageSection: useRef<HTMLDivElement | null>(null),
        loadingSection: useRef<HTMLDivElement | null>(null),
        progressSection: useRef<HTMLDivElement | null>(null),
        questionHeading: useRef<HTMLHeadingElement | null>(null),
        scoreSection: useRef<HTMLDivElement | null>(null),
        scoreMark: useRef<HTMLSpanElement | null>(null),
        titleHeading: useRef<HTMLHeadingElement | null>(null),
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

            <section ref={elements.progressSection} className="progress hidden">
                <span className="current">{state.currentItemIndex + 1}</span>
                <span> / </span>
                <span className="total">{quizData?.items.length}</span>
            </section>
        </main>
    );
}
