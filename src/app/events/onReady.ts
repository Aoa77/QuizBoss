import AppContext from "../AppContext";
import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import { Duration } from "../elements/fade";
import { Multiplier } from "../../core/timing/Multiplier";

///
export default async function onReady() {
    const appState = AppContext.appState();
    const [state, setState] = appState;

    const elements = AppContext.elements();
    const { refs } = elements;
    const { title } = refs;

    await elements.fadeIn(title);
    await wait(Duration.WAIT, Multiplier.x3);

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    setState({ ...state, gameState: GameState.LOADING });
}
