///
import "./App.css";
import { AppSettings } from "./App.settings";
import { EventName } from "../models/EventName";
import { initQuizState, QuizState } from "../models/QuizState";
import { useFlowContext } from "../libs/flow-context/FlowContext.hook";

///
import { GuessButtons } from "../components/GuessButtons";
import { GuessPoints } from "../components/GuessPoints";
import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { QuestionText } from "../components/QuestionText";
import { QuestionTimer } from "../components/QuestionTimer";
import { QuizProgress } from "../components/QuizProgress";
import { QuizTitle } from "../components/QuizTitle";
import { ScoreInfo } from "../components/ScoreInfo";

///
import { handleAskQuestion } from "../events/AskQuestion";
import { handleAwaitGuess } from "../events/AwaitGuess";
import { handleConcludeQuestion } from "../events/ConcludeQuestion";
import { handleConcludeWrongGuess } from "../events/ConcludeWrongGuess";
import { handleLoadQuizModule } from "../events/LoadQuizModule";
import { handlePrepGuessResult } from "../events/PrepGuessResult";
import { handlePrepQuestion } from "../events/PrepQuestion";
import { handleRevealGuessResult } from "../events/RevealGuessResult";
import { handleStartApp } from "../events/StartApp";
import { handleStartQuiz } from "../events/StartQuiz";

///
export function App(settings: AppSettings) {
    ///
    useFlowContext<QuizState, EventName>({
        initialState: initQuizState(settings),
        flowProperty: (state) => {
            return state.eventName;
        },
        flowEvents: new Map<EventName, () => Promise<void>>([
            [EventName.AskQuestion, handleAskQuestion],
            [EventName.AwaitGuess, handleAwaitGuess],
            [EventName.ConcludeQuestion, handleConcludeQuestion],
            [EventName.ConcludeWrongGuess, handleConcludeWrongGuess],
            [EventName.LoadQuizModule, handleLoadQuizModule],
            [EventName.PrepGuessResult, handlePrepGuessResult],
            [EventName.PrepQuestion, handlePrepQuestion],
            [EventName.RevealGuessResult, handleRevealGuessResult],
            [EventName.StartApp, handleStartApp],
            [EventName.StartQuiz, handleStartQuiz],
        ]),
        errorHandler: settings.errorHandler,
        stateLogger(state) {
            console.group("state");
            console.info("eventName: ", state.eventName);
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
            <QuizProgress />
            <ScoreInfo />
            <GuessButtons />
        </main>
    );
}
