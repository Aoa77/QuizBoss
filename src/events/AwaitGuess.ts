import { FlowContext } from "../libs/flow-context/FlowContext";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { DEMO, DemoMode } from "../models/DemoMode";
import { randomInt } from "../libs/randos/randomInt";
import { randomIntInclusive } from "../libs/randos/randomIntInclusive";
import { QuestionTimer } from "../components/QuestionTimer";
import { TriggerGuess } from "./TriggerGuess";
import { TimerStatus } from "../components/QuestionTimer.RefObject";
import { ButtonStyle } from "../models/ButtonStyle";
import { Task } from "../libs/friendlies/Task";

export async function AwaitGuess() {
    ///
    assertFlowEvent(EventName.AwaitGuess);

    if (countAvailableGuesses().length === 1) {
        runFailTransition();
        return;
    }

    const timer = QuestionTimer.RefObject;
    if (timer.status === TimerStatus.Reset) {
        timer.start();
    }

    const pollingLoop = setInterval(() => {
        switch (timer.status) {
            case TimerStatus.TimedOut:
                clearInterval(pollingLoop);
                runFailTransition();
                return;
            case TimerStatus.Running:
                break;
            default:
                clearInterval(pollingLoop);
                return;
        }
    }, 100);

    if (!createDemoGuess()) {
        return;
    }

    const [state] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { demoDelayMin, demoDelayMax } = settings;
    const delay = randomIntInclusive(demoDelayMin, demoDelayMax);
    setTimeout(() => TriggerGuess(DEMO.guess.shift()!), delay);

    await Task.delay(1);
}

function countAvailableGuesses() {
    const [state] = FlowContext.current<QuizState>();
    const { buttonAnswerMap } = state;
    return buttonAnswerMap.filter((item) => item!.buttonStyle === ButtonStyle.normal);
}

function createDemoGuess(): boolean {
    const [state] = FlowContext.current<QuizState>();
    const { settings, correctAnswerButtonIndex } = state;
    const { demoMode, guessButtonCount } = settings;

    if (demoMode === DemoMode.OFF) {
        return false;
    }

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

    return true;
}

function runFailTransition() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, correctAnswerButtonIndex } = state;

    buttonAnswerMap.forEach((_item) => {
        _item!.buttonStyle = ButtonStyle.disabled;
    });

    const button = buttonAnswerMap[correctAnswerButtonIndex]!;
    button.buttonStyle = ButtonStyle.reveal;

    setState((state) => {
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
