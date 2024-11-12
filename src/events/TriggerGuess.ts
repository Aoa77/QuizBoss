import { AppContext } from "../app/context";
import { AppState } from "../app/state";
import { ButtonStyle } from "../code/ButtonStyle";
import { EventName } from "../code/EventName";
import { Timer, TimerStatus } from "../libs/anime-context/Timer";

export async function TriggerGuess(bidx: number) {
    const { state, flow, timer } = AppContext.current();
    if (abandonTrigger(state, timer)) {
        return;
    }

    const { buttonAnswerMap } = state;
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
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
