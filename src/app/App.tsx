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

export function App(settings: AppSettings) {
    ///
    useFlowContext<QuizState, EventName>({
        errorHandler: settings.errorHandler,
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.AppStart, AppStart],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.PrepQuestion, PrepQuestion],
            [EventName.QuizStart, QuizStart],
        ]),
    });

    return (
        <main>
            <QuizTitle />
            <LoadingSpinner />
            <LoadingProgress />
            <QuestionImage />
        </main>
    );
}
