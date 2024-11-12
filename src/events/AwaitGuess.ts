import { AppContext, AppFlow } from "../app/context";
import { AppSettings } from "../app/settings";
import { AppState } from "../app/state";
import { Anim } from "../code/Animation";
import { ButtonStyle } from "../code/ButtonStyle";
import { DEMO, DemoMode } from "../code/DemoMode";
import { EventName } from "../code/EventName";
import { TimerStatus } from "../libs/anime-context/Timer";
import { Task } from "../libs/friendlies/Task";
import { $ease, $time } from "../libs/anime-context/constants";
import { randomInt } from "../libs/randos/randomInt";
import { randomIntInclusive } from "../libs/randos/randomIntInclusive";
import { TriggerGuess } from "./TriggerGuess";

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
        await Anim.QuestionText.run({
            opacity: [1, 0],
            duration: $time.ticks(0.25),
            easing: $ease.linear,
        });
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
        (item) => item!.buttonStyle === ButtonStyle.normal,
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
    Task.delay(delay).then(() => TriggerGuess(DEMO.guess.shift()!));
}

function runFailTransition(state: AppState, flow: AppFlow): void {
    ///
    const { buttonAnswerMap, correctAnswerButtonIndex } = state;

    buttonAnswerMap.forEach((_item) => {
        _item!.buttonStyle = ButtonStyle.disabled;
    });

    const button = buttonAnswerMap[correctAnswerButtonIndex]!;
    button.buttonStyle = ButtonStyle.reveal;

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
