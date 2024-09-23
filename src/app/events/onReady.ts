import wait from "../../core/animation/wait";
import { getXrefHeadings } from "../../core/elements/headings";
import { getAppStateFlow } from "../appFlow/useFlow";
import { ELEMENT, TIME } from "../elements/constants";
import { fadeIn } from "../elements/fade";
import { GameState } from "../models/GameState";

///
export default async function onReady() {
    const [title] = getXrefHeadings(ELEMENT.title);
    await fadeIn({ xref: title! });
    await wait({ duration: TIME.WAIT, multiplier: 3 });

    // use this to automate testing the settings panel toggle
    // while (true) {
    //     toggleSettingsPanel();
    //     await delay(Duration.ONE_SECOND, Multiplier.x3);
    // }

    const [state, setState] = getAppStateFlow();
    setState({ ...state, gameState: GameState.LOADING });
}
