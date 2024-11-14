import { AppState } from "./state";
import { Timer, TimerStatus } from "../libs/anime-context";
import { AppContext } from "./context";
import { EventKey } from "../events";

export enum ButtonState {
    correct = "correct",
    dimmed = "dimmed",
    disabled = "disabled",
    normal = "normal",
    reveal = "reveal",
    wrong = "wrong",
}

export async function buttonTrigger(bidx: number) {

    function abandonTrigger(state: AppState, timer: Timer) {
        const { eventName } = state;
        return (
            eventName !== EventKey.AwaitGuess ||
            timer.status !== TimerStatus.Running ||
            timer.secondsRemaining < 1
        );
    }

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
            eventName: EventKey.PrepGuessResult,
        };
    });
}

