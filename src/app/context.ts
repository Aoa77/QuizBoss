///
import { Dispatch, SetStateAction, useMemo } from "react";

///
import {
    useFlowContext,
    useFlowContextSetup,
} from "../libs/flow-context/FlowContext";

///
import { AppSettings } from "./settings";
import { AppState, initAppState } from "./state";

////
import { Timer } from "../code/Timer";
import { EventName } from "../code/EventName";
import { AskQuestion } from "../events/AskQuestion";
import { AwaitGuess } from "../events/AwaitGuess";
import { ConcludeQuestion } from "../events/ConcludeQuestion";
import { ConcludeWrongGuess } from "../events/ConcludeWrongGuess";
import { LoadQuizModule } from "../events/LoadQuizModule";
import { PrepGuessResult } from "../events/PrepGuessResult";
import { PrepQuestion } from "../events/PrepQuestion";
import { RevealGuessResult } from "../events/RevealGuessResult";
import { StartApp } from "../events/StartApp";
import { StartQuiz } from "../events/StartQuiz";

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
export function useAppContext() {
    return AppContext.current();
}

///
export function useAppContextSetup(settings: AppSettings) {
    ///
    useFlowContextSetup<AppState, EventName>({
        initialState: initAppState(settings),
        flowProperty: (state) => {
            const { eventName } = state;
            return eventName;
        },
        flowEvents: new Map<EventName, () => Promise<void>>([
            [EventName.AskQuestion, AskQuestion],
            [EventName.AwaitGuess, AwaitGuess],
            [EventName.ConcludeQuestion, ConcludeQuestion],
            [EventName.ConcludeWrongGuess, ConcludeWrongGuess],
            [EventName.LoadQuizModule, LoadQuizModule],
            [EventName.PrepGuessResult, PrepGuessResult],
            [EventName.PrepQuestion, PrepQuestion],
            [EventName.RevealGuessResult, RevealGuessResult],
            [EventName.StartApp, StartApp],
            [EventName.StartQuiz, StartQuiz],
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

    ///
    const flow = useFlowContext<AppState>();
    const { timerSeconds } = settings;

    AppContext.init({
        flow: { dispatch: flow[1] },
        settings,
        state: flow[0],

        // using memo to use the same instance of Timer across renders
        timer: useMemo(() => new Timer({ timerSeconds }), [timerSeconds]),
    });
}

export class AppContext {
    private static _current: AppFlowContext | null = null;
    public static current(flowEvent?: EventName): AppFlowContext {
        if (!this._current) {
            throw new Error("AppContext instance not initialized");
        }
        if (flowEvent) {
            this.assertFlowEvent(flowEvent);
        }
        return this._current;
    }

    public static init(context: AppFlowContext): void {
        // NOTE: it is ok that this is initialized multiple times
        this._current = context;
    }

    private static assertFlowEvent(expected: EventName) {
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
