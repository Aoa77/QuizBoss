import { QuestionTimer } from "../components/QuestionTimer";
import { TimerStatus } from "../components/QuestionTimer.RefObject";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { ButtonStyle } from "../models/ButtonStyle";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export function TriggerGuess(bidx: number) {
    try {
        assertFlowEvent(EventName.AwaitGuess);
    } catch {
        return;
    }
    
    if (QuestionTimer.RefObject.status !== TimerStatus.Running) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap } = state;
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }


    setState((state) => {
        const {eventName} = state;
        if (eventName !== EventName.AwaitGuess) {
            return state;
        }

        if (QuestionTimer.RefObject.status !== TimerStatus.Running) {
            return state;
        }

        return {
            ...state,
            guessButtonIndex: bidx,
            eventName: EventName.PrepGuessResult,
        };
    });
}
