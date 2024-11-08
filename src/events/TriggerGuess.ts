import { Timer } from "../code/Timer";
import { TimerStatus } from "../code/Timer";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task } from "../libs/friendlies/Task";
import { ButtonStyle } from "../code/ButtonStyle";
import { assertFlowEvent, EventName } from "../code/EventName";
import { AppState } from "../app/App.state";

export async function TriggerGuess(bidx: number) {
    try {
        assertFlowEvent(EventName.AwaitGuess);
    } catch {
        await Task.delay(100);
        return;
    }

    if (
        Timer.instance().status !== TimerStatus.Running ||
        Timer.instance().secondsRemaining < 1
    ) {
        return;
    }

    const [state, setState] = FlowContext.current<AppState>();
    const { buttonAnswerMap } = state;
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }

    setState((state) => {
        const { eventName } = state;
        if (eventName !== EventName.AwaitGuess) {
            return state;
        }

        if (
            Timer.instance().status !== TimerStatus.Running ||
            Timer.instance().secondsRemaining < 1
        ) {
            return state;
        }

        return {
            ...state,
            guessButtonIndex: bidx,
            eventName: EventName.PrepGuessResult,
        };
    });
}
