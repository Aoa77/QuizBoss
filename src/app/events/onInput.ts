import { DemoMode } from "../models/DemoMode";
import doDemoInput from "../functions/doDemoInput";
import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import { Duration } from "../elements/fade";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";

export default async function onInput() {
    const [state, setState] = getAppStateFlow();
    const { settings } = state;
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await wait({ duration: Duration.DEMO });

    const spotButton = doDemoInput();
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}
