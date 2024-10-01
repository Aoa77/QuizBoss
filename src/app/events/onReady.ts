import { getAppState } from "../hooks/useAppState";
import { ELEMENT } from "../animation/elements";
import { GameState } from "../models/GameState";
import { getElementHeadings } from "../../core/xelemental/getElementHeadings";
import { DELAY } from "../animation/times";
import { wait } from "../../core/anime-x/wait";
import { fadeIn } from "../../core/anime-x/fade";

///
export async function onReady() {
    const [title] = getElementHeadings(ELEMENT.title);
    await wait(DELAY.PRE_TITLE);
    await title.runAnimation(fadeIn());
    await wait(DELAY.POST_TITLE);

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    const [state, setState] = getAppState();
    setState({ ...state, gameState: GameState.LOADING });
}
