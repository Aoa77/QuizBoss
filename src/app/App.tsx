///
import "./App.css";
import { AppSettings }              from "./App.settings";
import { useFlowContext }           from "../libs/flow-context/FlowContext.hook";
import { EventName }                from "../models/EventName";
import { initQuizState, QuizState } from "../models/QuizState";

///
import { GuessButtons }             from "../components/GuessButtons";
import { LoadingProgress }          from "../components/LoadingProgress";
import { LoadingSpinner }           from "../components/LoadingSpinner";
import { QuestionImage }            from "../components/QuestionImage";
import { QuizTitle }                from "../components/QuizTitle";

///
import { AskQuestion }              from "../events/AskQuestion";
import { ConcludeQuestion }         from "../events/ConcludeQuestion";
import { LoadQuizModule }           from "../events/LoadQuizModule";
import { PrepQuestion }             from "../events/PrepQuestion";
import { StartApp }                 from "../events/StartApp";
import { StartQuiz }                from "../events/StartQuiz";
import { ShowGuessResult } from "../events/ShowGuessResult";

///
export function App(settings: AppSettings) {
    ///
    useFlowContext<QuizState, EventName>({
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, (state: QuizState) => Promise<void>>([
            [EventName.AskQuestion, AskQuestion],
            [EventName.AwaitGuess, () => Promise.resolve()],
            [EventName.ConcludeQuestion, ConcludeQuestion],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.PrepQuestion, PrepQuestion],
            [EventName.ShowGuessResult, ShowGuessResult],
            [EventName.StartApp, StartApp],
            [EventName.StartQuiz, StartQuiz],
        ]),
        errorHandler: settings.errorHandler,
        stateLogger(state) {
            console.group("state");
            console.info("eventName: ", state.eventName);
            console.info("currentItemIndex: ", state.currentItemIndex);
            console.info("correctAnswerButtonIndex: ", state.correctAnswerButtonIndex);
            console.info("guessButtonIndex: ", state.guessButtonIndex);
            console.groupEnd();
        },
    });

    return (
        <main>
            <QuizTitle />
            <LoadingSpinner />
            <LoadingProgress />
            <QuestionImage />
            <GuessButtons />
        </main>
    );
}
