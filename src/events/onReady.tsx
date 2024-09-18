import AppContext from "../app/AppContext";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";

///
export default async function onReady() {
    const appState = AppContext.appState();
    const { state, setState } = appState;

    const elements = AppContext.elements();
    const { refs } = elements;
    const { title } = refs;

    await elements.fadeIn(title.target);
    await delay(Duration.WAIT, Multiplier.x3);

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    setState({ ...state, gameState: GameState.LOADING });
}
