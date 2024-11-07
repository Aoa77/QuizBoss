import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "./QuizState";

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
    const [state] = FlowContext.current<QuizState>();
    const { eventName } = state;
    if (expected !== eventName) {
        throw new Error(`Event map mismatch: ${expected}`);
    }
}
