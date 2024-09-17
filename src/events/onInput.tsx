import AppContext from "../app/AppContext";
import { DemoMode } from "../app/DemoMode";
import doDemoInput from "../functions/doDemoInput";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

export async function onInput(context: AppContext) {
    const { settings } = context;
    const { state, setState } = context.states;

    if (settings.demoMode === DemoMode.OFF) {
        console.info("waiting for player input...");
        return;
    }

    console.info("waiting for DEMO input...");
    await delay(Duration.DEMO);

    const spotButton = doDemoInput(context);
    setState({
        ...state,
        guessValue: spotButton.value,
        gameState: GameState.RESULT,
    });

}
