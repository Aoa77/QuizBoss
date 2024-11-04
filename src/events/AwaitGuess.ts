import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { ButtonStyle } from "../models/ButtonStyle";
import { DEMO, DemoMode } from "../models/DemoMode";
import { randomInt } from "../libs/randos/randomInt";
import { randomIntInclusive } from "../libs/randos/randomIntInclusive";
import { QuestionTimer } from "../components/QuestionTimer";

export async function AwaitGuess() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings, buttonAnswerMap, correctAnswerButtonIndex } = state;
    const {
        demoMode,
        oneTickAtSpeed,
        guessButtonCount, ////////
        forfeitQuestionOnTimeout,
    } = settings;

    QuestionTimer.RefObject.start();
    if (forfeitQuestionOnTimeout && QuestionTimer.RefObject.isExpired()) {
        for (let i = 0; i < guessButtonCount; i++) {
            const buttonStyle = buttonAnswerMap[i]!.buttonStyle;
            if (buttonStyle === ButtonStyle.normal && i !== correctAnswerButtonIndex) {
                buttonAnswerMap[i]!.buttonStyle = ButtonStyle.disabled;
                --state.itemScore;
            }
        }
        setState({ ...state, eventName: EventName.PrepGuessResult });
    }

    if (demoMode === DemoMode.OFF) {
        return;
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

    await Task.delay(randomIntInclusive(2, 5) * oneTickAtSpeed);
    TriggerGuess(DEMO.guess.shift()!);
}

export function TriggerGuess(bidx: number) {
    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, eventName } = state;
    if (forfeitQuestionOnTimeout && QuestionTimer.RefObject.isExpired()) {
        return;
    }
    if (eventName !== EventName.AwaitGuess) {
        return;
    }
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }

    state.guessButtonIndex = bidx;
    setState({ ...state, eventName: EventName.PrepGuessResult });
}
