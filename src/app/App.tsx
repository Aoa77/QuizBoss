import "./App.css";
import { AppSettings } from "./AppSettings";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { useFlowContext } from "../libs/flow-context/useFlowContext";
import { initQuizState, QuizState } from "../models/QuizState";
import { EventName } from "../models/EventName";
import { AppStart } from "../events/AppStart";
import { NextQuestion } from "../events/NextQuestion";
import { QuestionImage } from "../components/QuestionImage";
import { QuizStart } from "../events/QuizStart";
import { LoadQuizModule } from "../events/LoadQuizModule";

export function App(settings: AppSettings) {
    
    useFlowContext<QuizState, EventName>({
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.AppStart, AppStart],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.NextQuestion, NextQuestion],
            [EventName.QuizStart, QuizStart],
        ]),
    });

    return (
        <main>
            <QuizTitle />
            <LoadingSpinner />
            <QuestionImage />
        </main>
    );
}
