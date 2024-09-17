import AppContext from "../app/AppContext";
import { DemoMode } from "../app/DemoMode";
import doDemoInput from "../functions/doDemoInput";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

export default async function onInput() {
    const appState = AppContext.appState();
    const { state, setState } = appState;
    
    const settings = AppContext.settings();
    const { demoMode } = settings;

    if (demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await delay(Duration.DEMO);

    const spotButton = doDemoInput();
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });
}
