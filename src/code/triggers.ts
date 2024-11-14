import { AppContext } from "./context";
import { AppState } from "./state";
import { EventName } from "./game";
import { ButtonState } from "./ButtonState";
import { Timer, TimerStatus } from "../libs/anime-context";

export async function triggerGuess(bidx: number) {
    const { state, flow, timer } = AppContext.current();
    if (abandonTrigger(state, timer)) {
        return;
    }

    const { buttonAnswerMap } = state;
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonState.normal) {
        return;
    }

    flow.dispatch((state) => {
        if (abandonTrigger(state, timer)) {
            return state;
        }

        return {
            ...state,
            guessButtonIndex: bidx,
            eventName: EventName.PrepGuessResult,
        };
    });
}

function abandonTrigger(state: AppState, timer: Timer) {
    const { eventName } = state;
    return (
        eventName !== EventName.AwaitGuess ||
        timer.status !== TimerStatus.Running ||
        timer.secondsRemaining < 1
    );
}
