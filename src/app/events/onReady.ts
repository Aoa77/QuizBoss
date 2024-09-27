import { wait } from "../../core/functions/wait";
import { getAppState } from "../functions/getAppState";
import { ELEMENT } from "../constants/elements";
import { GameState } from "../models/GameState";
import { getElementHeadings } from "../../core/functions/getElementHeadings";
import { fadeIn } from "../constants/fade";
import { DELAY } from "../constants/times";

///
export async function onReady() {
    const [title] = getElementHeadings(ELEMENT.title);
    await wait(DELAY.PRE_TITLE);
    await title.runAnimation(fadeIn);
    await wait(DELAY.POST_TITLE);

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    const [state, setState] = getAppState();
    setState({ ...state, gameState: GameState.LOADING });
}
