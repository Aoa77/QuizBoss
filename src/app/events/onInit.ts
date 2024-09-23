import { initQuizModule } from "../functions/initQuizModule";
import { GameState } from "../models/GameState";
import { wait } from "../../core/animation/wait";
import { getAppStateFlow } from "../appFlow/useFlow";
import { ELEMENT, TIME } from "../elements/constants";
import { getXrefDivs } from "../../core/elements/divs";

///
export async function onInit() {
    const [state, setState] = getAppStateFlow();
    const [loading] = getXrefDivs(ELEMENT.loading);

    await loading.fadeIn();
    await initQuizModule(state);
    await wait(TIME.WAIT);

    setState({ ...state, gameState: GameState.READY });
}
