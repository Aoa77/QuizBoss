import "./App.css";
import { AppSettings } from "./App.settings";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { useFlowContext } from "../libs/flow-context/FlowContext.hook";
import { initQuizState, QuizState } from "../models/QuizState";
import { EventName } from "../models/EventName";
import { AppStart } from "../events/AppStart";
import { PrepQuestion } from "../events/PrepQuestion";
import { QuestionImage } from "../components/QuestionImage";
import { QuizStart } from "../events/QuizStart";
import { LoadQuizModule } from "../events/LoadQuizModule";
import { LoadingProgress } from "../components/LoadingProgress";
import { GuessButton } from "../components/GuessButton";
import { GuessButtonConfig } from "../components/GuessButton.config";
import { AskQuestion } from "../events/AskQuestion";
import { ConcludeQuestion } from "../events/ConcludeQuestion";

export function App(settings: AppSettings) {
    ///
    useFlowContext<QuizState, EventName>({
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.AppStart, AppStart],
            [EventName.AskQuestion, AskQuestion],
            [EventName.AwaitInput, () => Promise.resolve()],
            [EventName.ConcludeQuestion, ConcludeQuestion],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.PrepQuestion, PrepQuestion],
            [EventName.QuizStart, QuizStart],
        ]),
        errorHandler: settings.errorHandler,
        stateLogger(state) {
            console.group("state");
            console.info("eventName: ", state.eventName);
            console.info("currentItemIndex: ", state.currentItemIndex);
            console.info("answerButtonIndex: ", state.answerButtonIndex);
            console.groupEnd();
        },
    });

    const config: GuessButtonConfig = {};
    return (
        <main>
            <QuizTitle />
            <LoadingSpinner />
            <LoadingProgress />
            <QuestionImage />
            <GuessButton {...config} />
        </main>
    );
}
