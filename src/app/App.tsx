import "./App.layout.css";
import { AppSettings } from "./AppSettings";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { useFlowContext } from "../libs/flow-context/useFlowContext";
import { initQuizState, QuizState } from "../models/QuizState";
import { EventName } from "../models/EventName";
import { QuizStart } from "../events/QuizStart";

export function App(settings: AppSettings) {
    
    ///
    const [state] = useFlowContext<QuizState, EventName>({
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.QuizStart, QuizStart],
            // [EventName.NextQuestion, onNextQuestion],
            // [EventName.AwaitInput, onAwaitInput],
            // [EventName.ShowResult, onShowResult],
        ]),
    });
    console.info("App", state);



    return (
        <main>
            <QuizTitle text={settings.quizModuleName} />
            <LoadingSpinner />
        </main>
    );
}
