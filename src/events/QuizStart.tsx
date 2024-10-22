import { QuizTitle } from "../components/QuizTitle";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function QuizStart() {
    //
    const quizTitle = QuizTitle.animation;
    await quizTitle.transitionIn();
    
    //
    const [state, setState] = FlowContext.current<QuizState>();
    setState({ ...state, eventName: EventName.NextQuestion });
}
