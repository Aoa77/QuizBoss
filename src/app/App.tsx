///
import "./App.css";
import { AppSettings } from "./App.settings";
import { EventName } from "../models/EventName";
import { initQuizState, QuizState } from "../models/QuizState";
import { useFlowContext } from "../libs/flow-context/FlowContext.hook";

///
import { GuessButtons } from "../components/GuessButtons";
import { GuessPoints } from "../components/GuessPoints";
import { TimeBonus } from "../components/GuessPoints.TimeBonus";
import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuestionText } from "../components/QuestionText";
import { QuestionTimer } from "../components/QuestionTimer";
import { QuizProgress } from "../components/QuizProgress";
import { QuizTitle } from "../components/QuizTitle";
import { ScoreInfo } from "../components/ScoreInfo";

///
import { AskQuestion } from "../events/AskQuestion";
import { AwaitGuess } from "../events/AwaitGuess";
import { ConcludeQuestion } from "../events/ConcludeQuestion";
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
        flowEvents: new Map<EventName, () => Promise<void>>([
            [EventName.AskQuestion,          AskQuestion],
            [EventName.AwaitGuess,           AwaitGuess],
            [EventName.ConcludeQuestion,     ConcludeQuestion],
            [EventName.ConcludeWrongGuess,   ConcludeWrongGuess],
            [EventName.LoadQuizModule,       LoadQuizModule],
            [EventName.PrepGuessResult,      PrepGuessResult],
            [EventName.PrepQuestion,         PrepQuestion],
            [EventName.RevealGuessResult,    RevealGuessResult],
            [EventName.StartApp,             StartApp],
            [EventName.StartQuiz,            StartQuiz],
        ]),
        errorHandler: settings.errorHandler,
        stateLogger(state) {
            console.group("state");
            console.info("eventName: ", state.eventName);
            console.info("currentItemIndex: ", state.currentItemIndex);
            console.info("correctAnswerButtonIndex: ", state.correctAnswerButtonIndex);
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
            <QuestionTimer />
            <GuessPoints />
            <TimeBonus />
            <QuizProgress />
            <ScoreInfo />
            <GuessButtons />
        </main>
    );
}
