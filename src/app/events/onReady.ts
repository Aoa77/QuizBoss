import { wait }            from "../../core/functions/wait";
import { getAppState } from "../functions/getAppState";
import { TIME }   from "../elements/waitTimes";
import { ELEMENT } from "../elements/ELEMENT";
import { GameState }       from "../models/GameState";
import { getElementHeadings } from "../../core/functions/getElementHeadings";

///
export async function onReady() {
    const [title] = getElementHeadings(ELEMENT.title);
    await wait(TIME.PRE_TITLE_DELAY);
    await title.fadeIn();
    await wait(TIME.POST_TITLE_DELAY);



    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    const [state, setState] = getAppState();
    setState({ ...state, gameState: GameState.LOADING });
}
