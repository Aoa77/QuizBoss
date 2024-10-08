import "../styles";
import { GuessButtonArea } from "./GuessButtonArea";
import { LoadingSpinner } from "./LoadingSpinner";
import { ProgressDisplay } from "./ProgressDisplay";
import { QuestionHeading } from "./QuestionHeading";
import { QuestionImage } from "./QuestionImage";
import { ScoreDisplay } from "./ScoreDisplay";
import { TitleHeading } from "./TitleHeading";
import { AppSettings } from "../models/AppSettings";
import { BonusNotification } from "./BonusNotification";
import { useMemo } from "react";
import { useFlow } from "../../core/context/useFlow";
import { QuizState, createInitialState } from "../models/QuizState";
import { onQuizStart } from "../events/onQuizStart/_onQuizStart";
import { EventState } from "../models/EventState";

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
        ]),
    });

    ///
    return (
        <main>
            <TitleHeading {...state} />
            {loadingSpinner}
            <QuestionImage {...state} />
            <QuestionHeading {...state} />
            {bonusNotification}
            {guessButtonArea}
            <ScoreDisplay {...state} />
            <ProgressDisplay {...state} />
        </main>
    );
}
