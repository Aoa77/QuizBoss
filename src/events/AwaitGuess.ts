import { AppContext, AppFlow } from "../code/context";
import { AppSettings } from "../code/settings";
import { AppState } from "../code/state";
import { EventName } from "../code/game";
import { ButtonState } from "../code/ButtonState";
import { DEMO, DemoMode } from "../code/demo";
import { TimerStatus } from "../libs/anime-context/Timer";
import { Task } from "../libs/friendlies/Task";
import { randomInt } from "../libs/randos/randomInt";
import { randomIntInclusive } from "../libs/randos/randomIntInclusive";
import { triggerGuess } from "../code/triggers";

export async function AwaitGuess() {
    ///
    const { settings, state, flow, timer } = AppContext.current(
        EventName.AwaitGuess,
    );

    if (countAvailableGuesses(state).length === 1) {
        runFailTransition(state, flow);
        return;
    }

    if (timer.status === TimerStatus.Reset) {
        timer.start();
    }

    const pollingLoop = setInterval(() => {
        switch (timer.status) {
            case TimerStatus.TimedOut:
                clearInterval(pollingLoop);
                runFailTransition(state, flow);
                return;
            case TimerStatus.Running:
                break;
            default:
                clearInterval(pollingLoop);
                return;
        }
    }, 100);

    triggerDemoGuess(settings, state);
}

function countAvailableGuesses(state: AppState) {
    const { buttonAnswerMap } = state;
    return buttonAnswerMap.filter(
        (item) => item!.buttonStyle === ButtonState.normal,
    );
}

function triggerDemoGuess(settings: AppSettings, state: AppState): void {
    const { demoMode } = settings;
    if (demoMode === DemoMode.OFF) {
        return;
    }

    const { correctAnswerButtonIndex } = state;
    const { demoDelayMin, demoDelayMax, guessButtonCount } = settings;

    if (DEMO.guess.length === 0) {
        console.info("demoMode: ", demoMode);
        for (let i = 0; i < guessButtonCount; i++) {
            DEMO.guess.push(i);
        }
        const bidx: number = randomInt(0, guessButtonCount);
        const temp = DEMO.guess[0];
        DEMO.guess[0] = DEMO.guess[bidx];
        DEMO.guess[bidx] = temp;
    }

    if (demoMode === DemoMode.RIGHT) {
        while (DEMO.guess[0] !== correctAnswerButtonIndex) {
            DEMO.guess.shift();
        }
    } else if (demoMode === DemoMode.WRONG) {
        while (DEMO.guess[0] === correctAnswerButtonIndex) {
            DEMO.guess.shift();
        }
    }

    const delay = randomIntInclusive(demoDelayMin, demoDelayMax);
    Task.delay(delay).then(() => triggerGuess(DEMO.guess.shift()!));
}

function runFailTransition(state: AppState, flow: AppFlow): void {
    ///
    const { buttonAnswerMap, correctAnswerButtonIndex } = state;

    buttonAnswerMap.forEach((_item) => {
        _item!.buttonStyle = ButtonState.disabled;
    });

    const button = buttonAnswerMap[correctAnswerButtonIndex]!;
    button.buttonStyle = ButtonState.reveal;

    flow.dispatch((state) => {
        const { eventName } = state;
        if (eventName !== EventName.AwaitGuess) {
            return state;
        }
        return {
            ...state,
            itemScore: 0,
            buttonAnswerMap,
            guessButtonIndex: correctAnswerButtonIndex,
            eventName: EventName.RevealGuessResult,
        };
    });
}
