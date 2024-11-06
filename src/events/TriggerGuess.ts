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

    state.guessButtonIndex = bidx;

    setState((_state) => {
        if (_state.eventName !== EventName.AwaitGuess) {
            return _state;
        }

        return {
            ..._state,
            guessButtonIndex: state.guessButtonIndex,
            eventName: EventName.PrepGuessResult,
        };
    });
}
