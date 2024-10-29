///
import "./App.css";
import { AppSettings } from "./App.settings";
import { EventName } from "../models/EventName";
import { initQuizState, QuizState } from "../models/QuizState";
import { useFlowContext } from "../libs/flow-context/FlowContext.hook";

///
import { GuessButtons } from "../components/GuessButtons";
import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuestionText } from "../components/QuestionText";
import { QuizTitle } from "../components/QuizTitle";

///
import { AskQuestion } from "../events/AskQuestion";
import { ConcludeFinalGuess } from "../events/ConcludeFinalGuess";
import { ConcludeQuestion } from "../events/ConcludeQuestion";
import { ConcludeWrongFinalGuess } from "../events/ConcludeWrongFinalGuess";
import { ConcludeWrongGuess } from "../events/ConcludeWrongGuess";
import { LoadQuizModule } from "../events/LoadQuizModule";
import { PrepGuessResult } from "../events/PrepGuessResult";
import { PrepQuestion } from "../events/PrepQuestion";
import { RevealGuessResult } from "../events/RevealGuessResult";
import { StartApp } from "../events/StartApp";
import { StartQuiz } from "../events/StartQuiz";

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
            [EventName.ConcludeFinalGuess, ConcludeFinalGuess],
            [EventName.ConcludeQuestion, ConcludeQuestion],
            [EventName.ConcludeWrongFinalGuess, ConcludeWrongFinalGuess],
            [EventName.ConcludeWrongGuess, ConcludeWrongGuess],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.PrepGuessResult, PrepGuessResult],
            [EventName.PrepQuestion, PrepQuestion],
            [EventName.RevealGuessResult, RevealGuessResult],
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
            <QuestionText />
            <GuessButtons />
        </main>
    );
}
