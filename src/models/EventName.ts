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

export function assertFlowEvent(eventName: EventName) {
    const [state] = FlowContext.current<QuizState>();
    if (eventName !== state.eventName) {
        throw new Error(`Event map mismatch: ${eventName}`);
    }
}
