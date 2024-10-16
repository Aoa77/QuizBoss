import "../styles";
import { AppSettings } from "../models/AppSettings";
import { BonusNotification } from "./BonusNotification";
import { GuessButtonArea } from "./GuessButtonArea";
import { LoadingSpinner } from "./LoadingSpinner.tsx";
import { ProgressDisplay } from "./ProgressDisplay";
import { QuestionHeading } from "./QuestionHeading";
import { QuestionImage } from "./QuestionImage";
import { ScoreDisplay } from "./ScoreDisplay";
import { TitleHeading } from "./TitleHeading";
import { useMemo } from "react";
import { useFlow } from "../../core/context/useFlow";
import { QuizState, createInitialState } from "../models/QuizState";
import { EventState } from "../constants/EventState";
import { onQuizStart } from "../events/01_QuizStart/_onQuizStart";
import { onNextQuestion } from "../events/02_NextQuestion/_onNextQuestion";
import { onAwaitInput } from "../events/03_AwaitInput/_onAwaitInput";
import { onShowResult } from "../events/04_ShowResult/_onShowResult";

///
export function App(settings: AppSettings) {
    ///
    const loadingSpinner = useMemo(() => <LoadingSpinner />, []);
    const bonusNotification = useMemo(() => <BonusNotification />, []);
    const guessButtonArea = useMemo(() => <GuessButtonArea />, []);

    ///
    const [state] = useFlow<QuizState, EventState>({
        initialState: createInitialState(settings),
        flowProperty: (state) => {
            return state.event;
        },
        flowEvents: new Map<EventState, (state: QuizState) => Promise<void>>([
            [EventState.QuizStart, onQuizStart],
            [EventState.NextQuestion, onNextQuestion],
            [EventState.AwaitInput, onAwaitInput],
            [EventState.ShowResult, onShowResult],
        ]),
    });

    const titleText = state.quizModule?.quizData?.title ?? " ";
    const titleHeading = useMemo(
        () => <TitleHeading titleText={titleText} />,
        [titleText],
    );

    const questionText = state.quizModule?.quizData?.questionText ?? " ";
    const questionHeading = useMemo(
        () => <QuestionHeading questionText={questionText} />,
        [questionText],
    );

    // const { theme } = state.settings;
    // const menu = useMemo(() => <Menu {...theme} />, [theme]);

    ///
    return (
        <main>
            {titleHeading}
            {/* {menu} */}
            {loadingSpinner}
            <QuestionImage {...state} />
            {questionHeading}
            {bonusNotification}
            {guessButtonArea}
            <ProgressDisplay {...state} />
            <ScoreDisplay {...state} />
        </main>
    );
}
