import { FlowContext } from "../libs/flow-context/FlowContext";
import { AppState } from "../app/App.state";

export enum EventName {
    AskQuestion = "AskQuestion",
    AwaitGuess = "AwaitGuess",
    ConcludeQuestion = "ConcludeQuestion",
    ConcludeWrongGuess = "ConcludeWrongGuess",
    LoadQuizModule = "LoadQuizModule",
    PrepGuessResult = "PrepGuessResult",
    PrepQuestion = "PrepQuestion",
    QuizComplete = "QuizComplete",
    RevealGuessResult = "RevealGuessResult",
    StartApp = "StartApp",
    StartQuiz = "StartQuiz",
}

export function assertFlowEvent(expected: EventName) {
    const [state] = FlowContext.current<AppState>();
    const { eventName } = state;
    console.group("assertFlowEvent");
    console.info("expected", expected);
    console.info("actual", eventName);
    console.groupEnd();
    if (expected !== eventName) {
        throw new Error(`Event map mismatch: ${expected}`);
    }
}
