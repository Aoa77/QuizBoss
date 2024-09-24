import { getXrefHeadings } from "../../core/elements/headings";
import { wait }            from "../../core/animation/wait";
import { getAppStateFlow } from "../appFlow/useFlow";
import { ELEMENT, TIME }   from "../elements/constants";
import { GameState }       from "../models/GameState";

///
export async function onReady() {
    const [title] = getXrefHeadings(ELEMENT.title);
    await title.fadeIn();
    await wait(TIME.WAIT * 3);

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    const [state, setState] = getAppStateFlow();
    setState({ ...state, gameState: GameState.LOADING });
}
