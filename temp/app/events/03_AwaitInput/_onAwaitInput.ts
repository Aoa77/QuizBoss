import { FlowContext } from "../../../../src/libs/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { wait } from "../../../core/animation/wait";
import { doDemoInput } from "./doDemoInput";
import { DemoMode } from "../../../../src/models/DemoMode";
import { TIME } from "../../constants/TIME";
import { EventName } from "../../../../src/models/EventName";

export async function onAwaitInput() {
    const [state, setState] = FlowContext.context<QuizState>();
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
        eventName: EventName.ShowResult,
    });
}
