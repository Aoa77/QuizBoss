import { getElementDivs } from "../../core/functions/getElementDivs";
import { ELEMENT } from "../elements/ELEMENT";
import { getAppState } from "../functions/getAppState";
import { initQuizModule }    from "../functions/initQuizModule";
import { GameState }         from "../models/GameState";

///
export async function onInit() {
    const [state, setState] = getAppState();
    const [loading] = getElementDivs(ELEMENT.loading);

    await loading.fadeIn();
    await initQuizModule(state);
    setState({ ...state, gameState: GameState.READY });
}
