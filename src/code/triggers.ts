import { AppContext } from "./AppContext";
import { AppState } from "./AppState";
import { AppEvent } from "./AppEvent";
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
            eventName: AppEvent.PrepGuessResult,
        };
    });
}

function abandonTrigger(state: AppState, timer: Timer) {
    const { eventName } = state;
    return (
        eventName !== AppEvent.AwaitGuess ||
        timer.status !== TimerStatus.Running ||
        timer.secondsRemaining < 1
    );
}
