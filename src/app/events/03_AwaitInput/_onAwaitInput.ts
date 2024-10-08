import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { EventState } from "../../constants/EventState";
import { wait } from "../../../core/animation/wait";
import { doDemoInput } from "./doDemoInput";
import { DemoMode } from "../../constants/DemoMode";
import { TIME } from "../../constants/TIME";

export async function onAwaitInput() {
    const [state, setState] = flow<QuizState>();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait(TIME.DEMO_DELAY);

    const spotButton = doDemoInput(state.answerSpot, demoMode);
    setState({
        ...state,
        guessValue: spotButton.dataValue,
        event: EventState.ShowResult,
    });
}
