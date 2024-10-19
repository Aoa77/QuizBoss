import { useMemo } from "react";
import { BonusNotification } from "../../temp/app/components/BonusNotification";
import { GuessButtonArea } from "../../temp/app/components/GuessButtonArea";
import { LoadingSpinner } from "../../temp/app/components/LoadingSpinner";
import { ProgressDisplay } from "../../temp/app/components/ProgressDisplay";
import { QuestionHeading } from "../../temp/app/components/QuestionHeading";
import { QuestionImage } from "../../temp/app/components/QuestionImage";
import { ScoreDisplay } from "../../temp/app/components/ScoreDisplay";
import { TitleHeading } from "../../temp/app/components/TitleHeading";
import { onQuizStart } from "../../temp/app/events/01_QuizStart/_onQuizStart";
import { onNextQuestion } from "../../temp/app/events/02_NextQuestion/_onNextQuestion";
import { onAwaitInput } from "../../temp/app/events/03_AwaitInput/_onAwaitInput";
import { onShowResult } from "../../temp/app/events/04_ShowResult/_onShowResult";
import { useFlowContext } from "../libs/flow-context/useFlowContext";
import { AppSettings } from "./AppSettings";
import { EventName } from "../models/EventName";
import { QuizState, createInitialState } from "../models/QuizState";

///


export function App666(settings: AppSettings) {
    ///
    const loadingSpinner = useMemo(() => <LoadingSpinner />, []);
    const bonusNotification = useMemo(() => <BonusNotification />, []);
    const guessButtonArea = useMemo(() => <GuessButtonArea />, []);

    ///
    const [state] = useFlowContext<QuizState, EventName>({
        initialState: createInitialState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.QuizStart, onQuizStart],
            [EventName.NextQuestion, onNextQuestion],
            [EventName.AwaitInput, onAwaitInput],
            [EventName.ShowResult, onShowResult],
        ]),
    });

    const titleText = state.quizModule?.quizData?.title ?? " ";
    const QuizTitle_text = useMemo(
        () => <TitleHeading titleText={titleText} />,
        [titleText]
    );

    const questionText = state.quizModule?.quizData?.questionText ?? " ";
    const questionHeading = useMemo(
        () => <QuestionHeading questionText={questionText} />,
        [questionText]
    );

    // const { theme } = state.settings;
    // const menu = useMemo(() => <Menu {...theme} />, [theme]);
    ///
    return (
        <main>
            {QuizTitle_text}
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
