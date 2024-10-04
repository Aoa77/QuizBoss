import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { AppState } from "../models/AppState";
import { DemoMode } from "../models/DemoMode";
import { GameState } from "../models/GameState";
import { DELAY } from "../animation/times";
import { wait } from "../../core/anime-x/wait";
import { doDemoInput } from "../functions/doDemoInput";

export async function onInput() {
    const [state, setState] = getStateFlow<AppState>();
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
