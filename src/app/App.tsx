/* stylesheets */
import "./App.theme.css";
import "./App.layout.css";
import "./App.sections.css";

/* modules */
import { AppSettings } from "../models/AppSettings";
import { BonusNotification } from "../../temp/app/components/BonusNotification";
import { GuessButtonArea } from "../../temp/app/components/GuessButtonArea";
import { LoadingSpinner } from "../../temp/app/components/LoadingSpinner";
import { ProgressDisplay } from "../../temp/app/components/ProgressDisplay";
import { QuestionHeading } from "../../temp/app/components/QuestionHeading";
import { QuestionImage } from "../../temp/app/components/QuestionImage";
import { ScoreDisplay } from "../../temp/app/components/ScoreDisplay";
import { TitleHeading } from "../../temp/app/components/TitleHeading";
import { useMemo } from "react";
import { useFlowContext } from "../context/useFlowContext";
import { QuizState, createInitialState } from "../models/QuizState";
import { EventState } from "../../temp/app/constants/EventState";
import { onQuizStart } from "../../temp/app/events/01_QuizStart/_onQuizStart";
import { onNextQuestion } from "../../temp/app/events/02_NextQuestion/_onNextQuestion";
import { onAwaitInput } from "../../temp/app/events/03_AwaitInput/_onAwaitInput";
import { onShowResult } from "../../temp/app/events/04_ShowResult/_onShowResult";

///
export function App(settings: AppSettings) {
    ///
    const loadingSpinner = useMemo(() => <LoadingSpinner />, []);
    const bonusNotification = useMemo(() => <BonusNotification />, []);
    const guessButtonArea = useMemo(() => <GuessButtonArea />, []);

    ///
    const [state] = useFlowContext<QuizState, EventState>({
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
