import { Dispatch, SetStateAction, useMemo } from "react";
import { Timer } from "../libs/anime-context";
import { useFlowContextSetup } from "../libs/flow-context";
import { AppSettings } from "./settings";
import { AppState, initAppState } from "./state";
import { Anim } from "../animations";
import * as event from "../events";
import { EventKey } from "../events/EventKey";

export interface AppFlow {
    dispatch: Dispatch<SetStateAction<AppState>>;
}

export interface AppFlowContext {
    flow: AppFlow;
    settings: AppSettings;
    state: AppState;
    timer: Timer;
}

///
export function useAppContext(): AppFlowContext {
    return AppContext.current();
}

///
export function useAppContextSetup(settings: AppSettings): AppFlowContext {
    ///
    const flow = useFlowContextSetup<AppState, EventKey>({
        initialState: initAppState(settings),
        flowProperty: (state) => {
            const { eventName } = state;
            return eventName;
        },
        flowEvents: new Map<EventKey, () => Promise<void>>([
            [EventKey.AskQuestion, event.AskQuestion],
            [EventKey.AwaitGuess, event.AwaitGuess],
            [EventKey.ConcludeQuestion, event.ConcludeQuestion],
            [EventKey.ConcludeWrongGuess, event.ConcludeWrongGuess],
            [EventKey.LoadQuizModule, event.LoadQuizModule],
            [EventKey.PrepGuessResult, event.PrepGuessResult],
            [EventKey.PrepQuestion, event.PrepQuestion],
            [EventKey.RevealGuessResult, event.RevealGuessResult],
            [EventKey.StartApp, event.StartApp],
            [EventKey.StartQuiz, event.StartQuiz],
        ]),
        errorHandler: settings.errorHandler,
        stateLogger(state) {
            const { eventName, currentItemIndex, correctAnswerButtonIndex } =
                state;
            console.group("state");
            console.info("eventName: ", eventName);
            console.info("currentItemIndex: ", currentItemIndex);
            console.info(
                "correctAnswerButtonIndex: ",
                correctAnswerButtonIndex,
            );
            console.groupEnd();
        },
    });

    // using memo to use the same instance of Timer across renders
    const { timerSeconds } = settings;
    const timer = useMemo(() => {
        return new Timer({
            animeRef: () => Anim.QuestionTimer,
            timerSeconds: timerSeconds,
        });
    }, [timerSeconds]);

    return AppContext.init({
        flow: { dispatch: flow[1] },
        settings,
        state: flow[0],
        timer,
    });
}

export class AppContext {
    private static _current: AppFlowContext | null = null;
    public static current(flowEvent?: EventKey): AppFlowContext {
        if (!this._current) {
            throw new Error("AppContext instance not initialized");
        }
        if (flowEvent) {
            this.assertFlowEvent(flowEvent);
        }
        return this._current;
    }

    public static init(context: AppFlowContext): AppFlowContext {
        // NOTE: it is ok that this is initialized multiple times
        this._current = context;
        return this._current;
    }

    private static assertFlowEvent(expected: EventKey) {
        const { state } = this._current!;
        const { eventName } = state;
        console.group("assertFlowEvent");
        console.info("expected", expected);
        console.info("actual", eventName);
        console.groupEnd();
        if (expected !== eventName) {
            throw new Error(`Event map mismatch: ${expected}`);
        }
    }
}
