import { flow } from "../../core/context/flow";
import { QuizState } from "../models/QuizState";
import { DemoMode } from "../models/DemoMode";
import { EventState } from "../models/EventState";
import { wait } from "../../core/animation/wait";
import { doDemoInput } from "../functions/doDemoInput";
import { INPUT } from "../constants/TIME";

export async function onInput() {
    const [state, setState] = flow<QuizState>();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait(INPUT.DEMO_DELAY);

    const spotButton = doDemoInput(state.answerSpot, demoMode);
    setState({
        ...state,
        guessValue: spotButton.dataValue,
        event: EventState.ShowResult,
    });
}
