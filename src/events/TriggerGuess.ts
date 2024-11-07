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
    if (QuestionTimer.RefObject.secondsRemaining < 1) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap } = state;
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }


    setState((_state) => {
        if (_state.eventName !== EventName.AwaitGuess) {
            return _state;
        }
        if (QuestionTimer.RefObject.status !== TimerStatus.Running) {
            return _state;
        }
        if (QuestionTimer.RefObject.secondsRemaining < 1) {
            return _state;
        }

        return {
            ..._state,
            guessButtonIndex: bidx,
            eventName: EventName.PrepGuessResult,
        };
    });
}
