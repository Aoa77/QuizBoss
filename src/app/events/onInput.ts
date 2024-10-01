import { getAppState } from "../hooks/useAppState";
import { DemoMode } from "../models/DemoMode";
import { GameState } from "../models/GameState";
import { DELAY } from "../animation/times";
import { wait } from "../../core/animation/wait";
import { doDemoInput } from "../functions/doDemoInput";

export async function onInput() {
    const [state, setState] = getAppState();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait(DELAY.DEMO_INPUT);

    const spotButton = doDemoInput(state.answerSpot, demoMode);
    setState({
        ...state,
        guessValue: spotButton.dataValue,
        gameState: GameState.RESULT,
    });
}
