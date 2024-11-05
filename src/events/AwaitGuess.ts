import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task } from "../libs/friendlies/Task";
import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { ButtonStyle } from "../models/ButtonStyle";
import { DEMO, DemoMode } from "../models/DemoMode";
import { randomInt } from "../libs/randos/randomInt";
import { randomIntInclusive } from "../libs/randos/randomIntInclusive";
import { QuestionTimer } from "../components/QuestionTimer";

export async function AwaitGuess() {
    assertFlowEvent(EventName.AwaitGuess);
    const [state] = FlowContext.current<QuizState>();

    const {
        settings, //////////
        correctAnswerButtonIndex,
    } = state;

    const {
        demoMode,
        oneTickAtSpeed,
        guessButtonCount, ////////
        forfeitQuestionOnTimeout,
    } = settings;

    const timer = QuestionTimer.RefObject;
    if (forfeitQuestionOnTimeout && !timer.isRunning) {
        timer.start();
    }

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    if (demoMode === DemoMode.OFF) {
        return;
    }

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    if (DEMO.guess.length === 0) {
        console.info("demoMode: ", demoMode);
        for (let i = 0; i < guessButtonCount; i++) {
            if (!timer.isRunning || timer.secondsRemaining < 1) {
                return;
            }
            DEMO.guess.push(i);
        }
        const bidx: number = randomInt(0, guessButtonCount);
        const temp = DEMO.guess[0];
        DEMO.guess[0] = DEMO.guess[bidx];
        DEMO.guess[bidx] = temp;
    }

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }

    if (demoMode === DemoMode.RIGHT) {
        while (DEMO.guess[0] !== correctAnswerButtonIndex) {
            if (!timer.isRunning || timer.secondsRemaining < 1) {
                return;
            }
            DEMO.guess.shift();
        }
    } else if (demoMode === DemoMode.WRONG) {
        if (!timer.isRunning || timer.secondsRemaining < 1) {
            return;
        }
        while (DEMO.guess[0] === correctAnswerButtonIndex) {
            DEMO.guess.shift();
        }
    }

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    await Task.delay(randomIntInclusive(2, 5) * oneTickAtSpeed);
    TriggerGuess(DEMO.guess.shift()!);
}

export function TriggerGuess(bidx: number) {
    const timer = QuestionTimer.RefObject;
    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, eventName, itemScore } = state;
    if (eventName !== EventName.AwaitGuess) {
        return;
    }
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }
    if (itemScore < 1) {
        return;
    }

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    state.guessButtonIndex = bidx;

    if (!timer.isRunning || timer.secondsRemaining < 1) {
        return;
    }
    setState({ ...state, eventName: EventName.PrepGuessResult });
}
