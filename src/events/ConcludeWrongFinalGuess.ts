import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ConcludeWrongFinalGuess() {
    const [state, setState] = FlowContext.current<QuizState>();


    setState({ ...state, eventName: EventName.ConcludeWrongFinalGuess });
}

