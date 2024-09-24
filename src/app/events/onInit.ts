import { getXrefDivs }       from "../../core/elements/divs";
import { ELEMENT } from "../elements/ELEMENT";
import { getAppState }   from "../hooks/useAppState";
import { initQuizModule }    from "../functions/initQuizModule";
import { GameState }         from "../models/GameState";

///
export async function onInit() {
    const [state, setState] = getAppState();
    const [loading] = getXrefDivs(ELEMENT.loading);

    await loading.fadeIn();
    await initQuizModule(state);
    setState({ ...state, gameState: GameState.READY });
}
