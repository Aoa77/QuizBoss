import initQuizModule from "../functions/initQuizModule";
import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { ElementNames, TIME } from "../elements/constants";
import { fadeIn } from "../elements/fade";
import { getXrefDivs } from "../../core/xrefs/divs";

///
export default async function onInit() {
    const [state, setState] = getAppStateFlow();
    const [loading] = getXrefDivs(ElementNames.loading);

    await fadeIn({ xref: loading! });
    await initQuizModule(state);
    await wait({ duration: TIME.WAIT });
    setState({ ...state, gameState: GameState.READY });
}
